import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

View.stylesheet("iframe-layouts.css");

div.c("iframe-layouts", () => {
    h1("iFrame Layout Previews");
    
    div.c("cols", () => {
        div.c("col", () => {
            el("iframe").ac("iframe-preview").attr("src", "/layout/");
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