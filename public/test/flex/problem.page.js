import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";

app.$root.ac("pad");
app.stylesheet("styles.css");

h1("flex/problem");

el("style", `
    #root { background: white; }
    h3 { margin-bottom: 0.5em; }
    .flex, .non-flex { margin-bottom: 1em; background: rgba(0,0,0,0.1); padding: 1em; }
    .flex-row { flex-direction: row;  gap: 1em;  }
    .flex-column { flex-direction: column; }
    .flex-grow-1 { flex-grow: 1; }
`);

div.c("flex flex-row", () => {
    h3("flex-row");
    div.c("flex flex-column flex-grow-1", () => {
        div.c("non-flex", () => {
            h3("non-flex")
            p("Does nested flex break?")
            p("Does nested flex break?")
        });       
        div.c("non-flex", () => {
            h3("non-flex")
            p("Does nested flex break?")
            p("Does nested flex break?")
        });
    });
});

div.c("flex flex-row", () => {
    h3("flex-row");
    div.c("flex flex-row", () => {
        h3("flex-row");
        div.c("flex flex-row", () => {
            h3("flex-row")
            p("Does nested flex break?")
        });
        div.c("flex flex-column", () => {
            h3("flex-column")
            p("Does nested flex break?")
        });
        div.c("non-flex", () => {
            h3("non-flex")
            p("Does nested flex break?")
        });
    });
    div.c("flex flex-column", () => {
        h3("flex-column")
        p("Does nested flex break?")
        div.c("flex flex-row", () => {
            h3("flex-row")
            p("Does nested flex break?")
        });
        div.c("flex flex-column", () => {
            h3("flex-column")
            p("Does nested flex break?")
        });
        div.c("non-flex", () => {
            h3("non-flex")
            p("Does nested flex break?")
        });
    });  
    div.c("non-flex", () => {
        h3("non-flex")
        p("Does nested flex break?")
        div.c("flex flex-row", () => {
            h3("flex-row")
            p("Does nested flex break?")
        });
        div.c("flex flex-column", () => {
            h3("flex-column")
            p("Does nested flex break?")
        });
        div.c("non-flex", () => {
            h3("non-flex")
            p("Does nested flex break?")
        });
    });
});

div.c("flex flex-column", () => {
    h3("flex-column");
    div.c("flex", () => {
        p("Does nested flex break?")
        p("Does nested flex break?")
    });
    div.c("flex", () => {
        p("Does nested flex break?")
        p("Does nested flex break?")
    });
    div.c("non-flex", () => {
        p("Does nested flex break?")
        p("Does nested flex break?")
    });
});