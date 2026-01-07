import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

app.$root.ac("pad");


div.c("card", () => {
    h1("team");
    p("This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.");   
    p("This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.");
    el.c("button", "prim", "JOIN")
});