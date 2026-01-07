import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

app.$root.ac("pad");

el("style", `
    .flex.auto { flex-wrap: wrap; }
    .flex.auto > * { flex: 1 1 25em; }    
`);

h1("Basic Flex");

div.c("flex", () => {
    // div(p().filler("2-4s"));
    p().filler("2-4s");
});

h3("flex auto gap");
div.c("flex auto gap", () => {
    div(p().filler("2-4s"));
    div(p().filler("2-4s"));
});