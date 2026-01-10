import fs from "fs";
import path from "path";
import { exec } from "child_process";

export default class Runtime {

    static plugin(server) {
        server.on("new", (instance) => {
            if (instance.constructor.name === "Socket") {
                new Runtime(instance);
            }
        });
    }

    constructor(socket) {
        this.socket = socket;
        this.initialize();
    }

    initialize() {
        this.socket.on("rpc:write", (args) => this.write(...args));
        this.socket.on("rpc:ls", (args) => this.ls(...args));
        this.socket.on("rpc:rm", (args) => this.rm(...args));
        this.socket.on("rpc:cmd", (args) => this.cmd(...args));
    }

    write(file, data) {
        const full_path = path.resolve("./public/", this.to_relative(file));
        fs.writeFile(full_path, data, err => {
            if (err) console.error(err);
        });
    }

    ls(dir = "./") {
        const full_path = path.resolve("./public/", this.to_relative(dir));
        try {
            const files = this.socket.server.sockets.server.build_dir(full_path); // This is a bit messy, build_dir should maybe be in a util
            this.socket.send({ method: "ls", args: [files], index: this.socket.last_index });
        } catch (e) {
            if (e.code === "ENOENT") {
                fs.mkdirSync(full_path);
                this.ls(dir);
            }
        }
    }

    rm(dir) {
        const full_path = path.resolve("./public/", this.to_relative(dir));
        try {
            fs.rmSync(full_path, { recursive: true });
        } catch (e) {
            console.error("Error removing directory:", e);
        }
    }

    cmd(command) {
        exec(command, (error, stdout, stderr) => {
            this.socket.rpc("cmd", stdout || stderr);
        });
    }

    to_relative(filePath) {
        if (path.isAbsolute(filePath)) return `.${filePath}`;
        if (!filePath.startsWith('./') && !filePath.startsWith('../')) return `./${filePath}`;
        return filePath;
    }
}
