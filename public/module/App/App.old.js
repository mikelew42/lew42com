import Base from "./Base.js";
import { el, div, View, h1, h2, h3, p, is } from "./View.js";

import FileSystem from "./FileSystem.js";

export default class App extends Base {

	initialize(){
		this.initialize_socket();
		this.initialize_google_icon_font();
		this.fetch();
		this.initialize_thing();
		// this.render();
	}

	initialize_thing(){
		this.settings = {};
		this.loadables = {}; // wtf...
		this.loadables.thing = Thing;
		Thing.app = this;
		this.Thing = Thing;
	}

	add_thing(){
		new Thing();
	}

	initialize_google_icon_font(){
		View.stylesheet("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0");
	}

	initialize_socket(){
		this.ws = new WebSocket("ws://" + window.location.host);
		this.ws.addEventListener("open", () => this.open());
		this.ws.addEventListener("message", res => this.message(res));

		this.ready = new Promise((res, rej) => {
			this._ready = res;
		});
	}
	open(){
		console.log("%csocket connected", "color: green; font-weight: bold;");
		this.rpc("log", "connected!");
		this._ready();
	}

	// message recieved handler
	message(res){
		// console.log(res);
		const data = JSON.parse(res.data);
		data.args = data.args || [];
		console.log(data.method + "(", ...data.args, ")");

		this[data.method](...data.args);
	}

	reload(){
		window.location.reload();
	}

	async send(obj){
		return this.ready.then(() => {
			this.ws.send(JSON.stringify(obj));
		});
	}

	rpc(method, ...args){
		this.send({ method, args })
	}

	ls(data){
		console.log(data);

		this.file_system = new FileSystem();
		this.file_system.load(data);
		this.file_system.render();
	}

	fetch(){
		fetch('data.json')
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
		this.settings = data.settings;

		delete data.settings;
		
		for (const name in data){
			if (this.loadables[name] && this.loadables[name].load){
				this.loadables[name].load(data[name]);

			}
		}
	}

	save(){
		// const data = {};
		// for (const name in this.children){
		// 	data[name] = this.children[name].data();
		// }
		this.rpc("write", "data.json", JSON.stringify(this.data(), null, 4));
	}

	update(){
		this.contents.html("").append(() => {

			for (const num of this.children.numbers){
				div(num);
			}
		});
	}

	data(){
		const data = {
			settings: this.settings 
		};

		for (const name in this.loadables){
			data[name] = this.loadables[name].data();
		}

		return data;
	}

	render(){
		div.c("app", app_view => {
			
			this.contents = div.c("contents");

			this.update();

			el("button", "add").click(() => {
				this.children.numbers.push(Math.random());
				this.save();
				this.update();
			});
		})
	}
}

class Thing extends Base {
	prop = 123;
	settings = {};

	initialize(){
		this.constructor.add(this);
	}
	data(){
		return {
			settings: this.settings,
			prop: this.prop
		}
	}
	set(name, value){
		this.settings[name] = value;
		this.constructor.app.save(); // hmm no app yet
	}

	get(name){
		return this.settings[name];
	}

	static settings = {};
	static set(name, value){
		this.settings[name] = value;
		this.app.save(); // hmm no app yet
	}

	static get(name){
		return this.settings[name];
	}
	static things = [];
	static add(thing){
		this.things.push(thing);
	}
	static data(){
		const data = {
			settings: this.settings,
			things: []
		};
		// this is the Class
		for (const thing of this.things){
			data.things.push(thing.data());
		}

		return data;
	}
	static load(data){
		this.settings = data.settings;
		delete data.settings;

		for (const thing_data of data.things){
			new Thing(thing_data);
		}
	}

	static log(){
		console.log(this.things);
	}
}

