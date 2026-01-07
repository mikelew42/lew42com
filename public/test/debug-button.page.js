import app, { App, el, div, View, h1, h2, h3, p, is, icon, style } from "/app.js";

app.$root.ac("pad");

el("button", "debug me").click(function(){
    debugger;
});