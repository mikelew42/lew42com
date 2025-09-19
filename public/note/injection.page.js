import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

app.$root.ac("pad");

app.inject();

//debugger;
// step throug

div.c("card", () => {
    h1("Injection");
    p("Step through this code, and notice that, because we called `app.inject()`, the app is rendered synchronously.");
    el.c("button", "prim", "JOIN")
});

console.log("end of styles/page.js");