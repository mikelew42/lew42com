import Base from "/module/Base/Base.js";
import Socket from "/module/socket.js";

export default class File extends Base {

	initialize(){
		if (!this.name)
			throw "Must provide file.name";

		if (this.path)
			this.path = this.path + "/";

		// pass `meta: import.meta` for script-relative file
		if (this.meta){
			this.url = this.meta.resolve("./" + (this.path ?? "") + this.name);
			this.full = new URL(this.url).pathname;
		} else {
			this.full = window.location.pathname + (this.path ?? "") + this.name;
			this.url = window.location.origin + this.full;
		}

		// if (this.path)
		// 	console.log("path", this.path);
		// console.log("full", this.full);
		// console.log("url", this.url);


		if (!this.constructor.socket)
			this.constructor.socket = socket;

		this.send = this.send.bind(this);
		this.load = this.load.bind(this);

		this.ready = Promise.all([
				this.constructor.socket.ready,
				new Promise(res => this._res = res) // resolved when load()
			]).then(() => this); // for file = await new File().ready()

		this.fetch();
	}

	fetch(){
		console.log("fetching file", this.url);
		fetch(this.url).then(response => {
			// console.log("response", response);

			if (response.ok){
				response.json().then(data => this.load(data));

			} else if (response.statusText == "Not Found"){
				// create an empty json file
				this.data = {};
				this.save();
				// TODO: we need to this._res() to allow saving, even when the file doesn't exist
				// for now, we just refresh, and the saving will happen on the next pass...

			} else {
				throw "Fetch response not ok: " + response.statusText;
			}
		});
	}

	load(data){
		this.data = data;
		console.log("file loaded", this.full);
		this._res?.(); // very strange syntax, resolves the ready promise, if it has been created.  might not want to call this multiple times?  but the file is only loaded once...?
			// now that _res is always defined, this ? can go, but i'll leave it here as a reference for this strange syntax
	}

	// stringify(data){
	// 	this.data = JSON.stringify(data, null, 4);
	// 	this.save();
	// }

	save(){
		if (!this.saving)
			this.saving = setTimeout(this.send, 0);
	}

	send(){
		console.log("writing file", this.full);
		this.constructor.socket.rpc("write", this.full, JSON.stringify(this.data, null, 4));
		this.saving = false;
	}
}

/*
Might we need module-relative files AND path-relative files?

module/
	Thing/
		Thing.js
		data.json

path/
	index.js
	thing.json

Maybe Thing.js, even when imported from any arbitrary path, might want to save something to it's own data.json.

But it also might want to create a thing.json at the current path, in order to save path-relative data.

*/