import app, { App, el, div, View, h1, h2, h3, p, is, icon } from "/app.js";
import Component from "/framework/ext/Component/Component.js";
import File from "/framework/ext/File/File.js";
import Dir from "/framework/ext/Dir/Dir.js";
import Note from "/framework/ext/Note/Note.js";

import util from "/framework/lib/util.js";


// Component.socket = File.socket = Dir.socket = app.socket;

// app.$main.ac("flex pad flex-h-center").style("flex-direction", "column");

el("style", `
    .comp {
        background: #fff;
        margin-bottom: 3em;
        padding: 1em;
    }
    .comp-row {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.5em;
    }
    .comp-key {
        font-weight: bold;
        color: #333;
        margin-right: 1em;
    }
    .comp-value {
        color: #666;
    }

    .comp .editor {
        border: 1px solid #ccc;
    }


    .note { padding: 1em; background: #f9f9f9; margin-bottom: 1em; }
    .note > .notes { background: #eee; padding: 1em; }
`);


console.log("before Note.instantiate");
const notes = new Note({
    id: "notes",
    // path: "/test/saving/"
});
console.log("before notes.ready");
await notes.ready;
console.log("after notes.ready");

notes.render();

/*
class Note extends Component {
	load_file(){
		// this.file = this.constructor.dir.instances.file(this.name + ".json");
		this.dir = this.constructor.dir.instances.dir(this.name);
		this.file = this.dir.file(this.name + ".json");
	}

	static meta(){
		return import.meta;
	}

	static config(){
		this.instances = [];

		// this.dir = new Dir({

		// });
		console.log(import.meta)

		this.dir = new Dir({
			name: "",
			meta: import.meta
		});

		this.dir.dir(this.name.toLowerCase() + "s");

		this.file = {
			name: this.name + ".json",
			meta: import.meta
		};
	}

	static new(instance){
		instance.name = instance.name + (this.instances.push(instance) - 1);
		// this.emit("new", instance);
	}
}

await Note.instantiate();
*/

class Thing extends Component {}

console.log("before Component.instantiate");
window.comp = await new Component({

    /* This runs after rendering...  Not sure exactly why.  Not sure if there's a way to get this to run first?
    Maybe we need 2 steps:
        this.preready -> this.initialize -> this.ready
    maybe await new Comp().initialized? */
    initialize(){
        if (!this.data.thing){
            this.set("thing", {});
        }
        console.log("thing data", this.data.thing);
        this.thing = new Thing({ data: this.data.thing, parent: this });
        // this.sub("thing", Thing);
        window.thing = this.thing;
    },
    render(){
        this.views = this.views || [];

        const view = div.c("comp", {
            bar: () => {
                el("button", "OK").on("click", () => {
                    alert("ok");
                });
            },
            props: div(),
            editor: div().attr("contenteditable", true).style("min-height", "3em").on("input", e => {
                // debugger;
                console.log("editor", e.target.innerHTML);
                this.set("editor", e.target.innerHTML);
            })
        });

        view.update = () => {
            view.props.empty();
            view.props.append(() => {
                for (const [key, value] of Object.entries(this.data)) {
                    if (key == "editor") continue;
                    div.c("comp-row", () => {
                        div.c("comp-key", key);
                        div.c("comp-value", value);
                        console.log(key, value);
                    });
                }
            });
            view.editor.html(this.get("editor"));
        };

        view.update();

        this.views.push(view);
    },
    update(){
        for (const view of this.views){
            view.update();
        }
    }
}).ready;

console.log("after Component.instantiate");

comp.render();
comp.render();

div.c("card", () => {
    h1("Saving");
    p("The timing of loading, waiting, and saving?")
    // window.dir = new Dir({ name: "test2", path: "/test/saving/" });
    // dir.file("test.ext");

});

console.log("end of saving.page.js");