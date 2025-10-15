import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";

app.$root.ac("pad");
app.stylesheet("styles.css");

h1("flex/one");

div.c("ft-html", () => {
    div.c("ft-body", () => {
        div.c("ft-wrap", () => {
            div.c("ft-header", () => {});
            div.c("ft-main", () => {
                div.c("ft-left", () => {});
                div.c("ft-root", () => {
                    // content here :[]
                    div.c("card", () => {
                        p("Content goes here.")
                        p("The first problem, is that if body has min-height: 100%, which is what we want, there are some implications.");
                        h1("body: min-height: 100%");
                        p("When we say, min-height: 100%, we mean 100% of the html element, the body's parent.  ");
                    });                    
                    div.c("card", () => {
                        p("Content goes here.")
                        p("The first problem, is that if body has min-height: 100%, which is what we want, there are some implications.");
                        h1("body: min-height: 100%");
                        p("When we say, min-height: 100%, we mean 100% of the html element, the body's parent.  ");
                    });
                });
            });
        });
    });
});
