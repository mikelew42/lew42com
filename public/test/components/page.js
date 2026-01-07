import app, { App, el, div, View, h1, h2, h3, p, is, icon, style } from "/app.js";
import Component from "/framework/ext/Component/Component.js";
import Sortable from "/framework/ext/Draggable/Sortable.js";

app.$root.ac("pad");

h1("Components");

const comp = await new Component({
    path: "test/components"
});


const list = window.list = new Sortable.List({ name: "Root" });
list.append(new Sortable.List({ name: "Step 1" }));
list.append(new Sortable.List({ name: "Step 2" }));
list.append(new Sortable.List({ name: "Step 3" }));
list.append(new Sortable.List({ name: "Step 4" }));
list.append(new Sortable.List({ name: "Step 5" }));
list.append(Sortable.List.make_deep(2));
list.render();