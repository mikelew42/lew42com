import Base from "/module/Base/Base.js";
import Socket from "/module/socket.js";
import is from "/module/lib/is.js";
import File from "/module/File/file.js";


export default class Dir extends Base {

	initialize(){
		// if (!this.name)
		// 	throw "Must provide dir.name";

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

		// console.log("path", this.path);
		// console.log("full", this.full);
		// console.log("url", this.url);


		if (!this.constructor.socket)
			this.constructor.socket = socket;

		// this.send = this.send.bind(this);
		this.load = this.load.bind(this);

		this.ready = Promise.all([
				this.constructor.socket.ready,
				new Promise(res => this._res = res) // resolved when load()
			]).then(() => this); // for file = await new File().ready()

		this.load();
	}

	async load(){
		console.log("loading dir", this.full);
		const data = await this.constructor.socket.ls(this.full);
		this._res()
		// console.log("dir data", this.full, data);
	}

	file(name){
		// if filename.ext, we use this.filename
		// might be a problem if you have filename.ext1 and filename.ext2
		return this[remove_ext(name)] = new File({ name,
			meta: this.meta, // might be undefined
			path: this.path ? this.path + this.name : this.name
		});
	}

	dir(name){
		return this[name] = new Dir({ name, meta: this.meta, 
			path: this.path ? this.path + this.name : this.name
		});
	}
}




function remove_ext(name){
	const parts = name.split(".");
	parts.pop();
	return parts;
}