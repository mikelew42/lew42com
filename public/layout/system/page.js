import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

// app.$root.ac("pad");

el("style", `
    #root .directory { flex-direction: row; max-width: 100%; flex-wrap: wrap; background: transparent; }
    #root .directory .file, #root .directory .dir { background: white; flex: 0 1 auto; margin-right: 1em; margin-bottom: 1em;  }
    
    .flex.auto {
        flex-wrap: wrap;
    }

    .flex.auto > * { flex-grow: 1; flex-basis: 300px; }

    .test:not(:last-child) { margin-bottom: 1em; }

    .test > * { padding: 1em; }

    .test.bg { background: var(--bg); color: white; }

    .test .left { padding: 3%; }

    .test .button.prim { background: var(--prim); color: white; }

    .bg-white { background: white; }

    .test .pad { padding: 3%; }
`);


// div.c("left", () => {
//     app.directory.render();
// });
// h1("Layout / System");
// await app.directory.ready;
// div.c("directory", () => {
//     const layout_dir = app.directory.files.find(fd => fd.name === "layout");
//     // debugger;
//     const dir = layout_dir.children.find(fd => fd.name === "system");
//     const $dir = app.directory.render_files(dir.children);
// });


div.c("flex auto test ux bg", () => {
    div.c("pad", () => {
        h2("H2 Heading");
        p().filler("2-4s");
        el.c("button", "prim", "Click");
    });
    div.c("pad", () => {
        h2("Max-Width?");
        p("I think the best way to limit text width is via max-width.  That could either be a global squeeze, or...?");
        el.c("button", "prim", "Click");
    });
});
div.c("flex auto test ux", () => {
            div.c("left", "Left");
            div.c("right", "Right");
        });
div.c("flex test auto ux", () => {
    div.c("pad", () => {
        h2("H2 Heading");
        p().filler("2-4s");
        el.c("button", "prim", "Click");
    });
    
    div.c("pad", () => {
        h2("H2 Heading");
        p().filler("2-4s");
        el.c("button", "prim", "Click");
    });
    
    div.c("pad", () => {
        h2("H2 Heading");
        p().filler("2-4s");
        el.c("button", "prim", "Click");
    })
});

div.c("flex test ux", () => {
    div("Left");
    div("Center");
    div("Right");
}).style("height", "300px").style("display", "flex");

div.c("flex auto bg-white test", () => {
    div.c("sidebar", () => {
        div("One");
        div("Two");
        div("Three");
    });
    div.c("content", () => {
        p().filler("3-5s")
        p().filler("3-5s")
    });
});

div.c("flex auto test ux", () => {
    div.c("left", "Left");
    div.c("right", () => {
        div("One");
        div("Two");
        div("Three");
    });
});
