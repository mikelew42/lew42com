import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

app.$root.ac("pad");


div.c("card", () => {
    h1("warning");
    p("This is your official warning:"); 
    p("Don't be gay.");
    p("Don't cut your dick off.");
    p("Don't fuck the wrong person.");
    p("Don't do it on camera.");
    el.c("button", "prim", "JOIN")
});