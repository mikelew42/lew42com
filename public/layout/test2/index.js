import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

View.stylesheet("test2.css");

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