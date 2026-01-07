import app, { App, el, div, View, h1, h2, h3, p, is, icon } from "/app.js";

el("style", `
    .flex-v { min-height: 100%; }
    
    iframe { flex-grow: 1; }
`);

app.$root.ac("pad");

div.c("flex flex-v", () => {
    const input = el("input").on("input", () => {
        console.log(input.el.value);
        iframe.attr("src", input.el.value);
    });
    const iframe = el("iframe").attr("src", "https://google.com");
});