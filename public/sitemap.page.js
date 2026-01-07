import app, { App, el, div, View, h1, h2, h3, p, is,  icon } from "/app.js";
import Directory2 from "/framework/ext/Directory/Directory2.js"

// app.$main.ac("flex pad flex-h-center");
app.$root.ac("pad squeeze center")

div.c("card", () => {
    h1("SITEMAP");

    const directory = new Directory2({ app });
    directory.render2();
});