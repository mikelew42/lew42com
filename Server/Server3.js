import Server2 from "./Server2.js";

import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import http from "http";
import https from "https";
import fs from "fs";

import session from "express-session";
import sfs from "session-file-store";
const FileStore = sfs(session);

import gal from "google-auth-library";
const OAuth2Client = gal.OAuth2Client;
const CLIENT_ID = "722949407087-g0kagkteln7gifhndpifetv5j2prn5a9.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prod = process.env.NODE_ENV === 'production';

export default class Server3 extends Server2 {

    initialize(){
		this.initialize_server();
		this.listen();
	}

	initialize_server(){

		this.initialize_express_app();
		this.initialize_http_server();
		this.initialize_sockets();

			this.initialize_directorize_framework();

	}

	initialize_express_app(){
		this.express = express;
		this.express_app = express();

        this.store = new FileStore({
            path: "../sessions",
            encoder(data){
                return JSON.stringify(data, null, 4);
            }
        });
        this.SESSION_SECRET = 'BUNG_HOLE';
        this.SESSION_NAME = "SESSION_NAME";

        this.express_app.use(session({
            // Use session-file-store for session storage
            store: this.store, 
            secret: this.SESSION_SECRET, // Used to sign the session ID cookie
            name: this.SESSION_NAME,
            resave: false, // Don't save session if unmodified
            saveUninitialized: false, // Don't create session until something is stored
            cookie: { 
                maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
                httpOnly: true, // Prevents client-side JS from reading the cookie
                secure: prod, // Use 'true' in production with HTTPS
                sameSite: 'lax', // Protects against some CSRF attacks
            }
        }));

        this.express_app.post('/auth/google-one-tap', express.json(), async (req, res) => {
            const { credential } = req.body;

            try {
                // 1. Verify the ID Token
                const ticket = await client.verifyIdToken({
                    idToken: credential,
                    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                });
                const payload = ticket.getPayload();
                const userId = payload['sub'];
                const userEmail = payload['email']; 
                // console.log(payload); // Contains all user info

                // 2. User Authentication/Registration
                // Check if user exists in your database. 
                // If not, create a new user record.

                // 3. Establish Session
                // Store critical user info in the session
                req.session.userId = userId; 
                req.session.email = userEmail;
                req.session.isLoggedIn = true;
                req.session.picture = payload.picture;

                // Optional: Save the session explicitly if you need to ensure it's saved 
                // before the response is sent (e.g., for async operations)
                req.session.save(err => {
                if (err) return res.status(500).json({ success: false, message: 'Session error' });
                res.json({ success: true, message: 'Login successful' });
                });
                
            } catch (error) {
                console.error('Token verification failed:', error);
                res.status(401).json({ success: false, message: 'Authentication failed' });
            }
        });

		this.express_app.use(express.static("public", { redirect: false }));
        this.express_app.use((req, res, next) => {
            console.log("req.path", req.path);

            // If this ends in ".ext", let it 404
            if (/\.[a-zA-Z0-9]+$/.test(req.path)) {
                return res.status(404).end();
            }

            res.sendFile(path.join(__dirname, '../public', 'index.html'));
            
        });
	}

    initialize_http_server(){
        if (prod){
            // The domain name is used as the directory name
            const domainName = 'lew42.com'; 

            // Correctly constructed absolute paths
            const privateKeyPath = `/etc/letsencrypt/live/${domainName}/privkey.pem`;
            const certificatePath = `/etc/letsencrypt/live/${domainName}/fullchain.pem`;

            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            const certificate = fs.readFileSync(certificatePath, 'utf8');

            const credentials = { key: privateKey, cert: certificate };

            this.http_server = https.createServer(credentials, this.express_app);
        } else {
            this.http_server = http.createServer(this.express_app);
        }
    }

    listen(){
        if (prod){
            this.http_server.listen(443, () => {
                console.log("Listening [port 443, !!!! PROD !!!! ] (" + this.webroot + ")");
            });
        } else {
            this.http_server.listen(80, '0.0.0.0', () => {
                console.log("Listening [port 80, not prod] (" + this.webroot + ")");
            });
        }
	}
}

/**
 * export default {
    directorize: true,
    initialize(){
        this.initialize_server();
 
        // this is bad, won't work unless I set this up similarly...
        this.express_app.use("/three.js", this.express.static(this.dirname + "/../../three.js/"));
        this.listen();
    },
 
    initialize_http_server(){
        const dirname = path.dirname(url.fileURLToPath(import.meta.url))
        const privateKey = fs.readFileSync(path.join(dirname, 'key.pem'), 'utf8');
        const certificate = fs.readFileSync(path.join(dirname, 'cert.pem'), 'utf8');
        const credentials = { key: privateKey, cert: certificate };
        // this.https_server = https.createServer(credentials, this.express_app);
        this.http_server = https.createServer(credentials, this.express_app);
        // this.http_server = http.createServer(this.express_app);
    },
 
    listen(){
        this.http_server.listen(443, () => {
            console.log("HTTPS Secure Server running on port 443");
        });
    }
 };
 */