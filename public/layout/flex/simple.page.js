import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";
import Layout from "/framework/ext/Layout/Layout.js";

// app.$root.ac("pad");

el("style", `
    .column {flex: 1 1 400px; max-width: 1000px; display: flex; }
    .fake-image { min-height: 100px; background: rgba(0,0,0,0.1); flex: 1; margin-bottom: 1em; }
    .card {  padding: 5%; margin-bottom: 0; }
    .card p {  }
    .section { background: rgba(0,0,0,0.1);  padding: 2%; margin-bottom: 2em;  }
    .flex.center { justify-content: center;}
    h1, h3, h2 { text-align: center;  }
    h2 { font-size: 2em; }
    h1 { margin-top: 1em; }

    .naked .column { background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.2); min-height: 50px; padding: 5px; }

    .naked .flex.gap { gap: 0; }

    .flex.gap { gap: 2em; }

    .squeeze { max-width: 1200px; margin: 0 auto; }
    .post { font-size: 1.2em; background: white; border-radius: 5px; overflow: hidden; }
    .post p { margin-bottom: 1.5em; }
    .post > .image-wrap { }
    .post .fake-image { margin-bottom: 0; padding-bottom: 20%; background: url('/assets/img/space.jpg') 50% 50% / cover; }
    .post > .content-wrap { padding: 4% 5% 5%; }

    .post h3 { text-align: left; font-size: 1.6em; }

    .checklist { padding: 0.5em 0 0; }
`);


h1("Layout / Flex / Simple");

// const layout = new Layout().flex();
// layout.left = layout.add().grow();
// layout.right = layout.add().grow();

div.c("section", () => {
    h2("Section Title");
        div.c("squeeze", () => {
            div.c("post", () => {
                div.c("image-wrap", div.c("fake-image"));
                div.c("content-wrap", () => {
                    h3("Really Important Note");
                    p().filler("2-4s");
                    app.checklist("padding", "flex", "grow", "wrap", "min/max", "lorem, content length")
                });
            });
        });
    
});
div.c("section", () => {
    h2("Section Title");
    div.c("flex gap wrap center", () => {
        div.c("column", () => {
            div.c("card left", () => {
                div.c("fake-image");
                p().filler("2-4s");
                app.checklist("padding", "flex", "grow", "wrap", "min/max", "lorem, content length")
            });
        });
        div.c("column", () => {    
            div.c("card right", () => {
                div.c("fake-image");
                p().filler("2-4s");
                p().filler("2-4s");
            });
        });
    });
    
});
div.c("section", () => {
    h2("Section Title");
    div.c("flex gap wrap center", () => {
        div.c("column", () => {
            div.c("card left", () => {
                div.c("fake-image");
                p().filler("2-4s");
                app.checklist("padding", "flex", "grow", "wrap", "min/max", "lorem, content length")
            });
        });
        div.c("column", () => {    
            div.c("card right", () => {
                div.c("fake-image");
                p().filler("2-4s");
                p().filler("2-4s");
            });
        });        
        div.c("column", () => {    
            div.c("card right", () => {
                div.c("fake-image");
                p().filler("2-4s");
                p().filler("2-4s");
            });
        });
    });
    
});
div.c("section naked", () => {
    h3("Naked Columns");
    div.c("flex gap wrap center", () => {
        div.c("column", () => {
            // p("Left");
        });
        div.c("column", () => {    
            // div.c("flex gap wrap center", () => {
                div.c("column", () => {
                    // p("Left");
                });
                div.c("column", () => {    
                    // p("Right");
                });
            // });
        });
        
        // div.c("card right", () => {
        //     div.c("fake-image");
        //     lorem();lorem();
        // });
        // div.c("card right", () => {
        //     div(div.c("fake-image"),
        //     p("Right"))
        // });
    });
    
});