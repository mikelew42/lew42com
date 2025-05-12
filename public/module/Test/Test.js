import View, { el, div, Base, is } from "/module/View/View.js";

View.stylesheet("/module/Test/test.css");


export default class Test extends Base {

	render(){
		this.view = div.c("test " + this.name, {
			name: div(this.name).click(this.activate.bind(this)),
			container: div()
		});

		this.should_run() && this.run();

		this.match() && this.view.ac("active");
	}

	activate(){
		window.location.hash = this.name;
		window.location.reload();
	}

	run(){
		console.group(this.name);
		// Test.set_captor(this);
		View.set_captor(this.view.container);
		this.view.ac("ran");

		if (this.value)
			this.value(this.arg);
		else 
			console.warn("no test.fn");

		// Test.restore_captor();
		View.restore_captor();
		console.groupEnd();
	}

	should_run(){
		return !window.location.hash || this.match();
	}

	match(){
		return decodeURI(window.location.hash.substring(1)) === this.name;
	}

	assign(){
		return Object.assign(this, ...arguments);
	}
}

export function test(name, value, arg){
	return new Test({ name, value, arg }).render();
}

Object.assign(Test, {
	previous_captors: [],
	set_captor(test){
		this.previous_captors.push(this.captor);
		this.captor = test;
	},
	restore_captor(){
		this.captor = this.previous_captors.pop();
	},
	controls(){
		var controls = div().ac("test-controls").append({
			reset: el("button", "reset").click(function(){
				Test.reset();
			})
		});
		document.body.appendChild(controls.el);
	},
	reset(){
		window.location.href = window.location.href.split('#')[0];
	},
	init(){
		Test.controls();
		const body = new View({ el: document.body });
		View.set_captor(body);
	}
});

// Test.init();