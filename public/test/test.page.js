import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";
// import HashRunner from "/framework/App/HashRunner.js";



div.c("card", () =>{
    h1("Test");
    div.c("directory", () => {
        const dir = app.directory.render_dir(app.directory.files.find(fd => fd.name === "test"));
        dir.children.show();
    });
});

// app.footer();