import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

app.$root.ac("pad");

el("style", `
    #root .directory { flex-direction: row; max-width: 100%; flex-wrap: wrap; background: transparent; }
    #root .directory .file, #root .directory .dir { background: white; flex: 0 1 auto; margin-right: 1em; margin-bottom: 1em;  } 
`);


// div.c("left", () => {
//     app.directory.render();
// });
h1("Layout / Grid");
await app.directory.ready;
div.c("directory", () => {
    const layout_dir = app.directory.files.find(fd => fd.name === "layout");
    // debugger;
    const dir = layout_dir.children.find(fd => fd.name === "grid");
    const $dir = app.directory.render_files(dir.children);
});