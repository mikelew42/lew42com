// import Events from "../module/Events/Events.js";
import Base from "../public/framework/core/Base/Base.js";

import fs from "fs";
import path from "path";

// for the cmd() method
import { exec } from "child_process";

import { WebSocketServer } from "ws";

import chokidar from "chokidar";

// could separate Reload/Watcher from Socket..

import ServerThing from "../public/framework/ext/Thing/ServerThing.js";
import { Server } from "http";

import cookie from "cookie";
import cookie_parser from "cookie-parser";

/*
I don't believe this properly closes the sockets...
Also, if we have a handle on the server, how do we emit messages?
Do we have to loop through server.socket_server.sockets?
*/
export default class SocketServer extends Base {
	count = 0;

	initialize(){
		this.wss = new WebSocketServer({
			perMessageDeflate: false,
			server: this.http_server
		});

		this.wss.on("connection", this.connection.bind(this));

		// this.ready = new Promise((res, rej) => {
		// 	this._ready = res;
		// });

		this.watcher = chokidar.watch([ 
			"./",
			"!**/*.json",
			"!**/.git" 
		]);
		
		this.watcher = chokidar.watch("public", {
			ignored: (path, stats) => {
				if (stats && stats.isDirectory()) return false; // don't ignore directories
				return path.endsWith(".json") || path.includes(".git") || 
					path.includes("node_modules") || path.includes("notes");
			},
			ignoreInitial: true
		});

		this.watcher.on("change", this.changed.bind(this));

		this.sockets = [];
	}


	connection(ws, req){
		const socket = new this.constructor.Socket({
			socket_server: this,
			ws: ws,
			server: this.server,
			req
		});
		this.sockets.push(socket);
		// this.ws = ws;
		// this._ready();
		// console.log("connected", ++this.count);
		
		console.log("new Socket, connected", this.sockets.length);
	}
	changed(e){
		console.log(e, "changed, sending " + this.sockets.length + " reload messages");
		for (const socket of this.sockets){
			socket.send({ method: "reload" });
		}
		// this.send({ module:"reload" });
	}
}

class Socket extends Base {
	initialize(){
		this.ws.on("message", this.message.bind(this));
		this.ws.on("close", () => {
			this.socket_server.sockets = this.socket_server.sockets.filter(socket => socket !== this);
		});

		// this.rpc("log", "Server is connected");

		// const thing = new ServerThing();
		// thing.thing();

		// console.log("SOCKET szzzzzdfyy");

		const req = this.req;
		const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
		console.log("headers", req.headers);
		console.log("headers.cookie", req.headers.cookie);
		console.log("parsed cookies", cookies);
  		const signedCookie = cookies[this.server.SESSION_NAME];
		// 2. Unsign Cookie (using express's cookie-parser logic)
		let sessionID;
		if (signedCookie) {
			sessionID = cookie_parser.signedCookie(signedCookie, this.server.SESSION_SECRET);
			if (!sessionID) {
				// If unsigning fails (e.g., tampered cookie)
				ws.close(1008, 'Unauthorized - Invalid Signature');
				console.log("invalid cookie signature?")
				return;
			}
			console.log("valid cookie signature!");
		} else {
			console.log("no signed cookie?");
		}

		// 3. Load Session
		if (sessionID) {
			this.server.store.get(sessionID, (err, session) => {
				if (err) {
					console.error('Error loading session:', err);
					this.ws.close(1008, 'Unauthorized - Session Error');
					return;
				}

				if (!session || !session.userId) { // **<-- Your Authentication Check**
					// Session exists but user is not authenticated (e.g., no userId)
					console.log("wtf?");
					this.ws.close(1008, 'Unauthorized - Not Logged In');
					return;
				}

				// 4. Attach Session
				req.session = session;
				req.sessionID = sessionID;
				// You may want to attach the session to the 'ws' object for convenience
				// this.session = session;

				console.log(`WebSocket connected for user: ${session.userId}`);
				// Connection is authorized and session is loaded
				this.rpc("log", "cookie shit worked?");

				// 5. Handle messages and save session manually
				// ws.on('message', (message) => {
				// 	// Access session: ws.session or req.session
				// 	// e.g., Update a counter in the session
				// 	if (req.session) {
				// 	req.session.wsMessages = (req.session.wsMessages || 0) + 1;
					
				// 	// **MANUALLY SAVE THE SESSION**
				// 	// After modifying the session, you must save it explicitly
				// 	sessionStore.set(req.sessionID, req.session, (err) => {
				// 		if (err) console.error('Error saving session:', err);
				// 	});
				// 	}
				// 	// ... handle message logic
				// });

			});
		} else {
			// No session cookie found
			console.log("end of cookie parsing, no cookie?");
			this.ws.close(1008, 'Unauthorized - No Session ID');
		}

	}

	send(obj){
		this.ws.send(JSON.stringify(obj)); // error handling?
	}

	async message(data){
		data = JSON.parse(data.toString());
		data.args = data.args || [];
		console.log(data.method + "(", ...data.args, ")", data.id, data.index);

		this.last_request_index = data.index;

		this[data.method](...data.args);
	}

	log(){
		console.log(...arguments);
	}

	rpc(method, ...args){
		this.send({ method, args })
	}

	write(file, data){
		fs.writeFile(path.resolve("./public/", toRelativePath(file)), data, err => {
			if (err) console.error(err);
			else console.log("File: ", file, " written successfully.");
		});
	}

	response(obj){
		obj.index = this.last_request_index;
		this.ws.send(JSON.stringify(obj));
	}

	ls(dir = "./") {
		dir = path.resolve("./public/", toRelativePath(dir));
		try {
			this.response({ files: this.server.build_dir(dir) });
		} catch (e){
			if(e.code === "ENOENT"){
				fs.mkdirSync(dir);
				this.response({ files: this.server.build_dir(dir) });
			}
		}
	}

	cmd(cmd){

	    exec(cmd, (error, stdout, stderr) => {
	        if (error) {
	            console.error(`Error executing command: ${error.message}`);
	            return;
	        }

	        if (stderr) {
	            console.error(`stderr: ${stderr}`);
	            return;
	        }

	        console.log(`stdout: ${stdout}`);

	        this.rpc("cmd", stdout);
	    });

	}

	editor(contents){
		fs.writeFileSync("./testeditor", contents);
	}

	rm(dir){
		dir = path.resolve("./public/", toRelativePath(dir));
		try {
			fs.rmSync(dir, { recursive: true });
			this.response({ success: true });
		} catch (e) {
			console.error("Error removing directory:", e);
			this.response({ success: false, error: e.message });
		}
	}

}

SocketServer.Socket = Socket;

//  /path/file.json  -> ./path/file.json
//  file.json -> ./file.json
//  ./file.json -> ./file.json
//  ../file.json -> ../file.json
// @author ChatGPT
function toRelativePath(filePath) {
  if (path.isAbsolute(filePath)) {
    return `.${filePath}`;
  } else if (!filePath.startsWith('./') && !filePath.startsWith('../')) {
    return `./${filePath}`;
  } else {
    return filePath;
  }
}