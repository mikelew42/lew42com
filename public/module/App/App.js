import Base from "/module/Base/Base.js";
import Events from "/module/Events/Events.js";
import { el, div, View, h1, h2, h3, p, is, icon } from "/module/View/View.js";
import Test, { test } from "/module/Test/Test.js";
import socket from "/module/socket.js";

// View.stylesheet("/module/base.css");




export default class App extends Base {


	initialize(){
		performance.mark("App.initialize");
		document.fonts.ready.then(() => console.log("fonts.ready", performance.now()));
		if (this.is_dev()){
			this.initialize_socket();
			this.initialize_dev_ready();
		} else {
			this.initialize_ready();
		}
		this.initialize_google_icon_font();
		this.initialize_body();
	}

	css(url){
		const link = new View({ tag: "link" }).attr("rel", "stylesheet").attr("href", url).append_to(document.head);

		return new Promise(resolve => {
			link.on("load", () => {
				console.log("link load");
				resolve(link)	
			})
		});
	}

	is_dev(){
		return window.location.hostname == "localhost";
	}

	initialize_dev_ready(){
		this.socket.ready.then(() => console.log("socket.ready", performance.now()));
		this.ready = Promise.all([/*this.socket.ready, */ this.window_loaded()]).then(() => this);
	}

	window_loaded(){
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				console.log("window.loaded");
				resolve(this)
			});
		});
	}

	DOMready(){
		return new Promise((res, rej) => {
			document.addEventListener('DOMContentLoaded', () => res(this));
		});
	}

	initialize_ready(){
		this.ready = this.window_loaded();
	}

	initialize_body(){
		this.body = View.body().init();
	}

	initialize_saver(){
		this.saver = new Saver({ app: this }, this.saver);
	}

	initialize_google_icon_font(){
		View.stylesheet("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0");
		document.fonts.ready.then(() => console.log("fonts.ready2"));
	}

	initialize_socket(){
		this.socket = this.socket || socket; 
			// pass in a new Socket() or use the default
			// you could pass socket: {config} to App this way...
	}
}

export { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test };