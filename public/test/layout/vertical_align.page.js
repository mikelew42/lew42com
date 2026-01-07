import app, { App, el, div, View, h1, h2, h3, p, is, icon } from "/app.js";
// import Component from "/framework/ext/Component/Component.js";

// Component.socket = app.socket;

el("style", `
    .layout {
        background: #fff;
        padding: 3em;
    }
    .layout > .toolbar {
        font-size: 2em;
    }
        
    .layout .material-icons {
        font-size: 1.5em;
    }

    .icon-vertical-align .material-icons {
        vertical-align: middle;
    }
`);

app.$main.ac("flex pad flex-h-center").style("flex-direction", "column");

div.c("layout", layout => {
    h1("CSS: vertical-align: middle");
    p(() => {

        div.c("toolbar", () => {
            icon("home");
            icon("settings");
            icon("lightbulb");
            icon("verified");
            icon("shopping_cart");
            icon("delete");
            icon("account_circle");
            el("span", "something")
        });
        el("button", "Toggle vertical-align").click(() => {
            layout.tc("icon-vertical-align");
        });
    });
    p("Apparently, it has something to do with aligning `inline block` elements.")
    p("I think I'll try to just use block and flex.")
});