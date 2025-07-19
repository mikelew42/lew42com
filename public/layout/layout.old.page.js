import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

app.header();

window.addEventListener("resize", () => {
    console.log("Window resized:", window.innerWidth, window.innerHeight);
});

const main = el("main", {
    left: el("sidebar", () => {
        h1("Life is a test.");
        h2("Find meeming.");
        h3("this is a test");
        p("this is a test");
    }),
    center(){
        div.c("left", () => {
            div.c("icon-item", () => {
                icon("format_paint");
                p("Work Hard");
            });      
            div.c("icon-item", () => {
                icon("games");
                p("Play Harder");
            });
            div.c("icon-item", () => {
                icon("bubble_chart");
                p("Find Meeming");
            });
        });
        div.c("card", () =>{
            h1("Master of Layouts");
            el("section", () => {
                h2.c("icon-item", icon("format_paint"), "Work Hard");
                p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
            });
            el("section", () => {
                h2.c("icon-item", icon("games"), "Play Harder");
                p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
            });
            el("section", () => {
                h2.c("icon-item", icon("bubble_chart"), "Find Meeming");
                p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
            });

            app.checklist("Burned out.", "Going crazy.", "Massive potential.", "About to give up.", "I need your help.");
        });

        // app.checklist("Burned out.", "Going crazy.", "Massive potential.", "About to give up.", "I need your help.");
        // test("what does this look like", t => {
        //     p("Don't worry, this is just a test");
        // });
    },
    right: el("sidebar", () => {
        h3("PROPERTIES");
        h2("FIND MEEMING");
        h3("this is a test");
        p("this is a test");
        div("this is a test");
        app.checklist("Burned out.", "Going crazy.", "Massive potential.", "About to give up.", "I need your help.");
    })
});



app.footer();