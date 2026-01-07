import app, { App, el, div, View, h1, h2, h3, p, is, icon } from "/app.js";

app.$root.ac("pad");
app.stylesheet("styles.css");

h1("flex");

// await app.ready;
div.c("directory", () => {
    const test = app.directory.files.find(fd => fd.name === "test");
    const flex = test.children.find(fd => fd.name === "flex");
    const $dir = app.directory.render_files(flex.children);
});