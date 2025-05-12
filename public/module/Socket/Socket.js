import Events from "/module/Events/Events.js";
import { el, div, View, h1, h2, h3, p, is, Base, icon } from "/module/View/View.js";

import FSView from "/module/App/FSView.js";

export default class Socket extends Events {
	initialize(){
		const protocol = window.location.protocol === "https:" ? "wss" : "ws";
		this.ws = new WebSocket(protocol + "://" + window.location.host);
		this.ws.addEventListener("open", () => this.open());
		this.ws.addEventListener("message", res => this.message(res));

		this.ready = new Promise((res, rej) => {
			this._ready = res;
		});

		this.requests = [];
	}
	open(){
		console.log("%cSocket connected.", "color: green; font-weight: bold;", performance.now());
		this.rpc("log", "connected!");
		this._ready();
	}
	// message recieved handler
	message(res){
		// debugger;
		// console.log(res);
		const data = JSON.parse(res.data);

		// does the index exist
		if (data?.index in this.requests){
			this.requests[data.index](data);
		} else {
			data.args = data.args || [];
			// console.log(data.method + "(", ...data.args, ")");
			if (this[data.method])
				this[data.method](...data.args);
		}
	}
	reload(){
		if (!window.$BLOCKRELOAD)
			window.location.reload();
		// debugger;
	}

	async send(obj){
		// console.log("sending", obj);
		return this.ready.then(() => {
			this.ws.send(JSON.stringify(obj));
		});
	}

	async request(obj){
		this.response = new Promise(resolve => {
			obj.index = this.requests.push(resolve) - 1;
		});

		await this.ready;
		this.ws.send(JSON.stringify(obj));


		return this.response;
	}

	rpc(method, ...args){
		this.send({ method, args })
	}

	ls(dir){
		return this.request({ method: "ls", args: [ dir ] });
	}

	// ls_response(data){
	// 	new FSView({ data })
	// }

	cmd(res){
		console.log("cmd response:", res);
	}

	write(filename, data){
		this.rpc("write", filename, data);
	}
}

/*

await socket.request() -> fulfills with response

request(){
	this.send({ request, id })

	this.response = new Promise()
}

*/