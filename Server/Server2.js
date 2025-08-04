import Base from "../public/framework/core/Base/Base.js";

import express from "express";
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";
import chokidar from "chokidar";

import SocketServer from "./SocketServer.js";



export default class Server extends Base {

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
		this.express_app.use(express.static("public", { redirect: false }));
        this.express_app.use((req, res, next) => {
            console.log("req.path", req.path);

            // If this ends in ".ext", let it 404
            if (/\.[a-zA-Z0-9]+$/.test(req.path)) {
                return res.status(404).end();
            }

            var url;
            // /one/two/  ->  /one/two/two.page.js
            if (req.path.endsWith("/")){
                const parts = req.path.split("/").filter(Boolean); // ["one", "two"]
                const name = parts[parts.length - 1]; // "two"
                url = req.path + name + ".page.js"; // "/one/two/two.page.js"

            // /one/two  ->  /one/two.page.js
            } else {
                url = req.path + ".page.js";
            }

            return res.send(
`<!DOCTYPE html>
    <html>
        <head>
            <script type="module">
                import { el, div } from "/framework/app.dev.js";
                div("test");
            </script>
            <script type="module" src="${url}"></script>
        </head>
        <body></body>
</html>`);
            
        });
	}


	initialize_http_server(){
		this.http_server = http.createServer(this.express_app);
	}

	initialize_sockets(){
		this.socket_server = new this.constructor.SocketServer({ 
			http_server: this.http_server,
			server: this
		});
	}

	listen(){
		this.http_server.listen(80, '0.0.0.0', () => {
			console.log("Listening (" + this.webroot + ")");
		});
	}

	initialize_directorize_framework(){
		// this.watcher = chokidar.watch([ 
		// 	"./public/",
		// 	"!**/*.json",
		// 	"!**/.git/**", 
		// 	"!**/node_modules/**" ], { ignoreInitial: true });
		
		this.watcher = chokidar.watch("public", {
			ignored: (path, stats) => {
				if (stats && stats.isDirectory()) return false; // ignore directories
				return path.endsWith(".json") || path.includes(".git") || path.includes("node_modules");
			},
			ignoreInitial: true
		});

		// this.watcher.on("ready", () => {
		// 	console.log(this.watcher.getWatched());
		// });

		this.watcher.on("add", this.update_framework_directories.bind(this));
		// this.watcher.on("addDir", this.update_framework_directories.bind(this));
		this.watcher.on("unlink", this.update_framework_directories.bind(this));
		// this.watcher.on("unlinkDir", this.update_framework_directories.bind(this));
		// this.watcher.on("all", (event, path) => {
		// 	console.log("all", event, path);
		// });

		this.update_framework_directories("initial");
	}

	save(){
		if (!this.saving)
			this.saving = setTimeout(this.send, 0);
	}

	send(){
		console.log("writing file", this.full);
		this.constructor.socket.rpc("write", this.full, JSON.stringify(this.data, null, 4));
		this.saving = false;
	}

	/**
	 * Multiple file/folder changes can happen with one "rmdir" command => triggers 3 events, 3 rewrites.  We need to debounce.
	 */
	update_framework_directories(e, t, th){
		
		if (!this.rebuilding){
			this.rebuilding = setTimeout(() => {
				console.log("Rebuilding Framework Directories");
				fs.writeFileSync("./public/directory.json", JSON.stringify({ files: this.build_dir("./public/") }, null, "\t"));
				fs.writeFileSync("./public/framework/directory.json", JSON.stringify({ files: this.build_dir("./public/framework/") }, null, "\t"));
				// if (!e.includes("notes")){
					this.socket_server.changed(e);
				// }
				this.rebuilding = false;
			}, 0);
		}
	}

	build_dir(dir, parent){
		const data = fs.readdirSync(dir, { withFileTypes: true });

		// console.log(dir, data);

		const result = data.map(file => {
			const new_file = {};
			// new_file
			// console.log(file);

			new_file.name = file.name;
			new_file.path = file.path.replace(/\\/g, '/').replace("public/", '');
			new_file.full = path.join(new_file.path, new_file.name).replace(/\\/g, '/');
			if (file.isFile()){
				// console.log("it's a file...");
				new_file.type = "file";
			} else {
				new_file.type = "dir";
				// console.log("it's a dir...");
				if (new_file.name !== ".git" && new_file.name !== "node_modules"){
					new_file.children = this.build_dir(path.join(dir, file.name));
				} else {
					new_file.children = [];
				}
			}

			return new_file;
		});

		// console.log(result);

		return result;
	}

	build_dir2(dir, parent) {
		const base = path.resolve('./public/'); // base path to strip

		console.log("BASE", base);
		const data = fs.readdirSync(dir, { withFileTypes: true });

		const result = data.map(file => {
			const new_file = {};
			new_file.old = file;
			new_file.name = file.name;
			new_file.path = file.path.replace(/\\/g, '/');
			let full = path.join(new_file.path, new_file.name).replace(/\\/g, '/');

			// Normalize and strip base path
			full = path.resolve(full).replace(base, '').replace(/\\/g, '/');
			// if (!full.startsWith('/')) full = '/' + full;

			new_file.full = full;

			if (file.isFile()) {
				new_file.type = 'file';
			} else {
				new_file.type = 'dir';
				if (new_file.name !== '.git' && new_file.name !== 'node_modules') {
					new_file.children = this.build_dir(path.join(dir, file.name));
				} else {
					new_file.children = [];
				}
			}

			return new_file;
		});

		return result;
	}


}

Server.SocketServer = SocketServer;