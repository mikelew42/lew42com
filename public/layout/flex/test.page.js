import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test, lorem } from "/app.js";
import Layout from "/framework/ext/Layout/Layout.js";

app.$root.ac("pad");

el("style", `
    .wrap { }
`);


h1("Layout / Flex / Test");

// const layout = new Layout().flex();
// layout.left = layout.add().grow();
// layout.right = layout.add().grow();

div.c("wrap", () => {
    div.c("left", () => {
        lorem();
    });   
    div.c("right", () => {
        lorem();
    });
})