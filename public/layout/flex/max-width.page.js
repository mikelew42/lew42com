import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test, lorem } from "/app.js";
import Layout from "/framework/ext/Layout/Layout.js";

app.$root.ac("pad");

el("style", `

    .fake-image { min-width: 200px; min-height: 100px; background: rgba(0,0,0,0.1); flex: 1 1 auto;  }
    .card { display: flex; gap: 1em; flex: 1 1 auto; flex-wrap: wrap; max-width: 1000px; }
    .card p { min-width: 300px; flex: 1 1 auto; }
`);


h1("Layout / Flex / Max-Width");

// const layout = new Layout().flex();
// layout.left = layout.add().grow();
// layout.right = layout.add().grow();

div.c("flex gap wrap", () => {
    div.c("card left", () => {
        div.c("fake-image");
        lorem();
        app.checklist("padding", "flex", "grow", "wrap", "min/max", "lorem, content length")
    });
    div.c("card right", () => {
        div.c("fake-image");
        lorem();lorem();
    });
    // div.c("card right", () => {
    //     div(div.c("fake-image"),
    //     p("Right"))
    // });
});