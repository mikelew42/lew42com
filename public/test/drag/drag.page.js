import { app, el, div, View, h1, h2, h3, p, is, Base, test, Test, Events } from "/app.js";;
import List from "./List.js";
import List0 from "./List0.js";
import List1 from "./List1.js";
import List2 from "./List2.js";
import List3 from "./List3.js";

View.stylesheet("styles.css");

// app.$body.ac("body1");

div.c("pointer-debug", () => {

	const x = div.c("x", {
		label: "clientX: ",
		value: div()
	});

	const y = div.c("y", {
		label: "clientY: ",
		value: div()
	});

	document.addEventListener("pointermove", (e) => {
		x.value.text(e.clientX);
		y.value.text(e.clientY);
	})
});

Test.controls();








test("List3", function(){
	this.view.ac("gray");

	const list = new List3({ name: "List3" });
	list.make(10); 
	list.render();
})

// abandoned
test("List2", function(){
	this.view.ac("gray");

	const list = new List2({ name: "List2" });
	list.make(10); 
	list.render();
})

test("List1", function(){
	this.view.ac("gray");

	const list = new List1({ name: "List1" });
	list.make(10); 
	list.render();
})

test("List0", function(){
	this.view.ac("gray");

	const list = new List0({ name: "List0" });
	list.make(10); 
	list.render();
})