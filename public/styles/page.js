import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";
import HashRouter from "../framework/ext/HashRouter/HashRouter.js";
import { tab, tabs } from "../framework/ext/HashRouter/HashTabs.js";

app.$root.ac("pad");

h1("styles");

tabs.c("white horizontal", () => {
    tab("Text", t => {
        // t.style("padding", "2em 3em");
        h1("This is an H1 Heading");
        p("This is a paragraph.");
        h2("This is an H2 Heading");
        tabs.c("light horizontal", () => {
            tab("Font Weight", () => {
                p("fw-1) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-1");   
                p("fw-2) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-2");   
                p("fw-3) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-3");   
                p("fw-4) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-4");   
                p("fw-5) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-5");
                p("fw-6) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-6");
                p("fw-7) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-7");
                p("fw-8) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-8");
                p("fw-9) This is a lot of setup to create a note.  I'm afraid this isn't the right UX for me.  However, one day, this will be my note maker.").ac("fw-9");
            });
            tab("Sub 2", "This is Sub Tab 2");
            tab("Sub 3", "This is Sub Tab 3");
        });
    });
    tab("UI", () => {
        tabs.c("light horizontal", () => {
            tab("button", () => {
                el.c("button", "prim fw-6", "JOIN");
                el.c("button", "prim", "test").click(function(){
                    this.tc("prim");
                });
                el("button", "test").click(function(){
                    this.tc("prim");
                });
            });            
            tab("select", () => {
                el.c("span", "button", "Display: ", el.c("select", "button", () => {
                    el("option", "Block").attr("value", "item-value");
                    el("option", "Inline").attr("value", "item-value");
                    el("option", "Inline-Block").attr("value", "item-value");
                    el("option", "Flex").attr("value", "item-value");
                    el("option", "Grid").attr("value", "item-value");
                    el("option", "None").attr("value", "item-value");
                }));
                el.c("span", "button", "Position: ", el.c("select", "button", () => {
                    el("option", "Static").attr("value", "item-value");
                    el("option", "Relative").attr("value", "item-value");
                    el("option", "Absolute").attr("value", "item-value");
                    el("option", "Fixed").attr("value", "item-value");
                    el("option", "Sticky").attr("value", "item-value");
                    el("option", "None").attr("value", "item-value");
                }));
                div.c("row flex flex-v-center mb-1", () => {
                    div.c("left flex-1 fw-500", "Display");
                    div.c("right", el.c("select", "button", () => {
                        el("option", "Block").attr("value", "item-value");
                        el("option", "Inline").attr("value", "item-value");
                        el("option", "Inline-Block").attr("value", "item-value");
                        el("option", "Flex").attr("value", "item-value");
                        el("option", "Grid").attr("value", "item-value");
                        el("option", "None").attr("value", "item-value");
                    }));
                });

                div.c("row flex flex-v-center mb-1", () => {
                    div.c("left flex-1 fw-500", "Position");
                    div.c("right", el.c("select", "button", () => {
                        el("option", "Static").attr("value", "item-value");
                        el("option", "Relative").attr("value", "item-value");
                        el("option", "Absolute").attr("value", "item-value");
                        el("option", "Fixed").attr("value", "item-value");
                        el("option", "Sticky").attr("value", "item-value");
                        el("option", "None").attr("value", "item-value");
                    }));
                })
            });
        });
        

    });
    tab("Tab 3", "This is Tab 3");
});