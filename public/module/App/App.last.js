import Base from "./Base.js";
import Events from "./Events.js";
import { el, div, View, h1, h2, h3, p, is } from "./View.js";

class Socket extends Events {
	initialize(){
		this.ws = new WebSocket("ws://" + window.location.host);
		this.ws.addEventListener("open", () => this.open());
		this.ws.addEventListener("message", res => this.message(res));

		this.ready = new Promise((res, rej) => {
			this._ready = res;
		});
	}
	open(){
		console.log("%cSocket connected.", "color: green; font-weight: bold;");
		this.rpc("log", "connected!");
		this._ready();
	}
	// message recieved handler
	message(res){
		console.log(res);
		const data = JSON.parse(res.data);
		data.args = data.args || [];
		console.log(data.method + "(", ...data.args, ")");

		this[data.method](...data.args);
	}
	reload(){
		window.location.reload();
	}

	async send(obj){
		// console.log("sending", obj);
		return this.ready.then(() => {
			this.ws.send(JSON.stringify(obj));
		});
	}

	rpc(method, ...args){
		this.send({ method, args })
	}
	ls(data){
		console.log(data);
	}
}

/*
Data class should have a .file property.  If a file: "string" is provided, it creates a new file object with that path.  Or, you could provide a reference to another file?

Can we have 2 data objects writing to the same file?  No, actually not...
*/
class Data extends Events {
	initialize(){
		this.filename = this.filename || "data.json";
		this.data = {};
		this.ready = new Promise((res, rej) => {
			this._ready = res;
		});
		this.fetch();
	}
	set(name, value){
		this.data[name] = value;
		this.save();
	}
	get(name){
		return this.data[name];
	}
	fetch(){
		fetch(this.filename)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok ' + response.statusText);
				}
				return response.json();
			}).then(data => {
				this.load(data);
			}).catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	}

	load(data){
		Object.assign(this.data, data)
		this._ready();
		this.emit("loaded"); // events{prop: [fn]}
	}

	save(){
		if (!this.saving)
			this.saving = setTimeout(this.send.bind(this), 0);
	}

	send(){
		this.app.socket.rpc("write", this.filename, JSON.stringify(this.data, null, 4));
		this.saving = false;
	}
}

export default class App extends Base {

	initialize(){
		this.initialize_socket();
		this.initialize_data();
			this.initialize_ready();
		this.initialize_google_icon_font();
		this.initialize_body();
	}

	initialize_ready(){
		this.ready = Promise.all([this.socket.ready, this.data.ready]).then(() => this);
	}

	initialize_body(){
		this.body = View.body().init();
	}

	initialize_data(){
		this.data = new Data({ app: this }, this.data);
	}

	initialize_google_icon_font(){
		View.stylesheet("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0");
	}

	initialize_socket(){
		this.socket = new Socket(this.socket); // you could pass socket: {config} to App this way...
	}
}