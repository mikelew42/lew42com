import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

app.$main.ac("flex pad flex-h-center");

div.c("card", () => {
    h1("First note:");
    p("This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.");
});