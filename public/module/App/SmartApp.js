import Base from "./Base.js";
import Events from "./Events.js";
import { el, div, View, h1, h2, h3, p, is, icon } from "./View.js";
import Test, { test } from "./Test.js";
import Smart from "./Smart.js";
import Socket from "./Socket/Socket.js";

/*
Data class should have a .file property.  If a file: "string" is provided, it creates a new file object with that path.  Or, you could provide a reference to another file?

Can we have 2 data objects writing to the same file?  No, actually not...
*/
class Saver extends Events {
	initialize(){
		this.filename = this.filename || window.location.pathname + "data.json";
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
		// fetch is relative to the html file.  if we add /, we can use this code in /sub/paths/
			// if you want to get the root data...
		// if you want /path/data.json, you have to configure it?
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
		this.app.props = data;
		this._ready();
		this.emit("loaded"); // events{prop: [fn]}
	}

	save(){
		if (!this.saving)
			this.saving = setTimeout(this.send.bind(this), 0);
	}

	send(){
		this.app.socket.rpc("write", this.filename, JSON.stringify(this.app.props, null, 4));
		this.saving = false;
	}
}

class App extends Smart {

	// Smart objects normally don't need to auto init, but this does
	instantiate(...args){
		this.Smart = Smart; // why?
		this.props = {};
		this.assign(...args);
		this.initialize();
	}

	initialize(){
		if (this.is_dev()){
			this.initialize_socket();
			this.initialize_saver();
			this.initialize_dev_ready();
		} else {
			this.initialize_ready();
		}
		this.initialize_google_icon_font();
		this.initialize_body();
	}

	is_dev(){
		return window.location.hostname.includes("localhost");
	}

	initialize_dev_ready(){
		this.ready = Promise.all([
			this.socket.ready, 
			this.saver.ready, 
			this.DOMready()
		]).then(() => this);
	}

	DOMready(){
		return new Promise((res, rej) => {
			document.addEventListener('DOMContentLoaded', () => res(this));
		});
	}

	initialize_ready(){
		this.ready = this.DOMready();
	}

	initialize_body(){
		this.body = View.body().init();
	}

	initialize_saver(){
		this.saver = new Saver({ app: this }, this.saver);
	}

	initialize_google_icon_font(){
		View.stylesheet("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0");
	}

	initialize_socket(){
		this.socket = new Socket(this.socket); // you could pass socket: {config} to App this way...
	}
}

export { View, Base, Events, Smart, App, el, div, h1, h2, h3, p, is, Test, test, icon };