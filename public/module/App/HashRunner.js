import { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "./App.js";
import FSView from "./FSView.js";

export default class HashRunner extends Base {
	async initialize(){
		const directory = await fetch("/directory.json").then(response => response.json());
		this.files = directory.files;

		// if window.location.path.length > 1 (defaults to "/")
		// either set files = matching path children, or...
		// just set this.pathname?

		// how do you keep the script runner working?
		// it currently, properly, matches /sub/file.js, which is nice

		if (window.location.hash){
			this.match();
		} else {
			this.render();
		}

		window.addEventListener('hashchange', function() {
			// Check if the hash is empty (which means we're back at the base URL)
			if (!window.location.hash) {
				// Reload the page
				window.location.reload();
			}
		});
	}

	match(){
		const full = window.location.hash.substring(2); // removes the # and /
		var match;
		for (const fd of this.files){
			match = this.search_fd(fd, full);
			if (match) break;
		}

		if (!match){
			console.log("no match");
		} else {
			this.load_script("/" + match.full);
		}
	}

	/**
	 * fd is file data object {
	 * 		name: "file.ext" || "dirname",
	 * 		type: "file" || "dir",
	 * 		path: "path/to",
	 * 		full: "path/to/file.ext" || "path/to/dirname",
	 * 		children: [] // if dir
	 * }
	 * 
	 */
	search_fd(fd, full){
		var found;
		if (fd.full === full){
			return fd;
		} else if (fd.children?.length){
			for (const child of fd.children){
				if (found = this.search_fd(child, full)){
					return found;
				}
			}
		}
		return false;
	}

	load_script(src){
		// this.script = el("script").attr("src", src).attr("type", "module")
		// this.script.el
		// this.script.append_to(document.head);
	
		this.script = document.createElement("script");
		this.script.type = "module";
		this.script.src = src;
		document.head.appendChild(this.script);
	}

	render(){
		this.view = new FSView({ 
			data: this.files,
			file(fd){
				if (fd.name.match(/\.js$/)) {
					div.c("file file-js", {
						icon: icon("description"),
						bar: div({
							name: fd.name, 
							icon: icon("play_arrow")
						}).click(() => {
							window.location.hash = "/" + fd.full;
							window.location.reload();
						})
					});
				} else {
					div.c("file", icon("draft"), fd.name);
				}
			}
		});
	}
}