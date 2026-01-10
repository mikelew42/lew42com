import session from "express-session";
import sfs from "session-file-store";
import gal from "google-auth-library";
import cookie from "cookie";
import cookie_parser from "cookie-parser";

const FileStore = sfs(session);
const OAuth2Client = gal.OAuth2Client;
const CLIENT_ID = "722949407087-g0kagkteln7gifhndpifetv5j2prn5a9.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

export default class AuthPlugin {

    static plugin(server) {
        server.on("init", () => {
            new AuthPlugin(server);
        });
    }

    constructor(server) {
        this.server = server;
        this.initialize();
    }

    initialize() {
        const prod = process.env.NODE_ENV === 'production';
        this.server.SESSION_SECRET = 'BUNG_HOLE';
        this.server.SESSION_NAME = "SESSION_NAME";

        this.server.store = new FileStore({
            path: "../sessions",
            encoder: (data) => JSON.stringify(data, null, 4)
        });

        this.server.app.use(session({
            store: this.server.store,
            secret: this.server.SESSION_SECRET,
            name: this.server.SESSION_NAME,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: prod,
                sameSite: 'lax',
            }
        }));

        this.setup_routes();
        this.setup_socket_auth();
    }

    setup_routes() {
        this.server.app.post('/auth/google-one-tap', (this.server.express.json()), async (req, res) => {
            const { credential } = req.body;
            try {
                const ticket = await client.verifyIdToken({
                    idToken: credential,
                    audience: CLIENT_ID,
                });
                const payload = ticket.getPayload();
                req.session.userId = payload['sub'];
                req.session.email = payload['email'];
                req.session.isLoggedIn = true;
                req.session.picture = payload.picture;

                req.session.save(err => {
                    if (err) return res.status(500).json({ success: false, message: 'Session error' });
                    res.json({ success: true, message: 'Login successful' });
                });
            } catch (error) {
                res.status(401).json({ success: false, message: 'Authentication failed' });
            }
        });
    }

    setup_socket_auth() {
        // Hook into new sockets to verify session
        this.server.on("new", (instance) => {
            if (instance.constructor.name === "Socket") {
                this.verify_socket(instance);
            }
        });
    }

    verify_socket(socket) {
        const req = socket.req;
        const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
        const signedCookie = cookies[this.server.SESSION_NAME];

        if (signedCookie) {
            const sessionID = cookie_parser.signedCookie(signedCookie, this.server.SESSION_SECRET);
            if (sessionID) {
                this.server.store.get(sessionID, (err, session) => {
                    if (!err && session && session.userId) {
                        socket.session = session;
                        socket.emit("authenticated");
                    } else {
                        socket.ws.close(1008, 'Unauthorized');
                    }
                });
                return;
            }
        }
        // If no auth, we might still allow it but track state
        socket.emit("unauthenticated");
    }
}
