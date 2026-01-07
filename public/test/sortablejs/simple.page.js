import Sortable from "./Sortable.js";

import app, { App, el, div, View, h1, h2, h3, p, is, icon, test } from "/app.js";

h1("/test/sortablejs/");

el("style", `
    .sortable-item { user-select: none; }    
`);

function sortable1(){
    const view = div.c("sortable", () => {
        div.c("sortable-item", "One");
        div.c("sortable-item", "Two");
        div.c("sortable-item", "Three");        
        div.c("sortable-item", "Four");
        div.c("sortable-item", "Five");
        div.c("sortable-item", "Six");
    });

    new Sortable(view.el, {
        draggable: ".sortable-item",
        onEnd(el){
            console.log("end", el);
        }
    });
}
test("basic", t => {
    // Usage example:
    sortable1();
});