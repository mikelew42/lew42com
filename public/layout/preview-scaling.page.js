import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

// View.stylesheet("test2.css");

el("style", `

    .test2 { padding: 1em; }
    .layout-preview { transform: scale(0.25); transform-origin: left top;}
    .layout-preview-inner { width: 400%; }

    .cols { display: flex; gap:1em; }
    .col { flex: 1; }
    
`);

div.c("test2", () => {
    h1("Layout Preview Scaling");
    
    div.c("cols", () => {
        div.c("col", () => {
            div.c("layout-preview", () => {
                div.c("layout-preview-inner", () => {
                    div.c("test2-layout", () => {
                        app.header();
                        p("This is some text.");
                        app.footer();
                    });
                });
            });
        });
        div.c("col", () => {
            div.c("layout-preview", () => {
                div.c("layout-preview-inner", () => {
                    div.c("test2-layout", () => {
                        app.header();
                        p("This is some text.");
                        app.footer();
                    });
                });
            });
        });
    });

    div.c("layout-preview", () => {
        div.c("layout-preview-inner", () => {
            div.c("test2-layout", () => {
                app.header();
                p("This is some text.");
                app.footer();
            });
        });
    });

    div.c("test2-layout", () => {
        app.header();
        p("This is some text.");
        app.footer();
    });
});