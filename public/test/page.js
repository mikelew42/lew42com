import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";
// import HashRunner from "/framework/App/HashRunner.js";

// await app.ready; !!! can't await in page... 

el("style", `
    #root .directory { flex-direction: row; max-width: 100%; flex-wrap: wrap; background: transparent; }
    #root .directory .file, #root .directory .dir { background: white; flex: 0 1 auto; margin-right: 1em; margin-bottom: 1em;  }  
`);

app.$root.ac("pad");
h1("Test");

await app.directory.ready;
div.c("directory", () => {
    const dir = app.directory.files.find(fd => fd.name === "test");
    const $dir = app.directory.render_files(dir.children);
});

// app.footer();

// await app.ready; can't do it
//    if we await import of page before resolving ready, app will never be ready, page module will never resolve...

app.ready.then(() => {
    console.log("app is ready!"); // this should work fine.
});