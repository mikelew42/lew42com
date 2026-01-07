import app, { App, el, div, View, h1, h2, h3, p, is } from "/app.js";

app.header();

const main = el("main", {
    left: el("sidebar", () => {
        h1("this is a test this is a test");
        h2("this is a test");
        h3("this is a test");
        p("this is a test");
        div("this is a test");
    }),
    center(){
        div.c("card", () =>{
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h2("this is a test");
            h3("this is a test");
            p("this is a test");
            div("this is a test"); 
        });        div.c("card", () =>{
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h2("this is a test");
            h3("this is a test");
            p("this is a test");
            div("this is a test"); 
        });        div.c("card", () =>{
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h2("this is a test");
            h3("this is a test");
            p("this is a test");
            div("this is a test"); 
        });        div.c("card", () =>{
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h1("this is a test this is a test");
            h2("this is a test");
            h3("this is a test");
            p("this is a test");
            div("this is a test"); 
        });
    },
    right: el("sidebar", () => {
        h1("this is a test this is a test");
        h2("this is a test");
        h3("this is a test");
        p("this is a test");
        div("this is a test");
    })
});

app.footer();