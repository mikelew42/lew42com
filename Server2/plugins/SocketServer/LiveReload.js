import Events from "../../Events.js";
import chokidar from "chokidar";

export default class LiveReload extends Events {

    static plugin(socket_server) {
        socket_server.live_reload = new LiveReload({ socket_server });
    }

    initialize() {
        this.watcher = chokidar.watch("public", {
            ignored: (path, stats) => {
                if (stats && stats.isDirectory()) return false;
                return path.endsWith(".json") || path.includes(".git") ||
                    path.includes("node_modules");
            },
            ignoreInitial: true
        });

        this.watcher.on("change", this.changed.bind(this));
    }

    changed(path) {
        console.log(`File changed: ${path}. Sending reload to ${this.socket_server.sockets.length} sockets.`);
        for (const socket of this.socket_server.sockets) {
            socket.rpc("reload");
        }
    }
}
