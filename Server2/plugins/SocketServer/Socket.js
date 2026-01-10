import Events from "../../Events.js";

export default class Socket extends Events {

    initialize() {
        this.ws.on("message", this.message.bind(this));
        this.ws.on("close", this.close.bind(this));
    }

    message(data) {
        try {
            const message = JSON.parse(data.toString());
            this.emit("message", message);

            if (message.method) {
                this.emit(`rpc:${message.method}`, message.args, message.id);
            }
        } catch (e) {
            console.error("Failed to parse socket message", e);
        }
    }

    send(obj) {
        this.ws.send(JSON.stringify(obj));
    }

    rpc(method, ...args) {
        this.send({ method, args });
    }

    close() {
        this.socket_server.sockets = this.socket_server.sockets.filter(socket => socket !== this);
        this.emit("closed");
    }
}
