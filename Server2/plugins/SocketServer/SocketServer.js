import Events from "../../Events.js";
import { WebSocketServer } from "ws";
import Socket from "./Socket.js";

export default class SocketServer extends Events {

    static plugin(server) {
        server.on("http", () => {
            server.socket_server = new SocketServer({ server });
        });
    }

    initialize() {
        this.sockets = [];

        this.wss = new WebSocketServer({
            server: this.server.http,
            perMessageDeflate: false
        });

        this.wss.on("connection", (ws, req) => {
            this.sockets.push(new Socket({ ws, req, server: this.server, socket_server: this }));
        });
    }
}
