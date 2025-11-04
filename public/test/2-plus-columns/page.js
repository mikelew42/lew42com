import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";

app.$root.ac("pad");

el("style", `
    .pages { container-type: inline-size; display: flex; gap: 1em; }    
    .pages > * { flex: 1; }

    .card { max-width: 40em; }

    .first { padding: 2em 3em; }

    .focus { outline: 1px solid blue; }

    .card:not(.active) { display: none; }

    .pages.split.break > .left { display: none; }

    @container (max-width: 700px) {
        .left {
            display: none;
        }
    }
`);

h1("2+ Columns");

const pages = div.c("pages", pages => {
    pages.first = div.c("card first active focus", () => {
        h1("Master of Layouts");
        el("section", () => {
            h2.c("icon-item", icon("format_paint"), "Work Hard");
            p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
        });
        el("section", () => {
            h2.c("icon-item", icon("games"), "Play Harder");
            p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
            p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
        });
        el("section", () => {
            h2.c("icon-item", icon("bubble_chart"), "Find Meeming");
            p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
            p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
        });

        app.checklist("Burned out.", "Going crazy.", "Massive potential.", "About to give up.", "I need your help.");
    }).click(() => {
        pages.tc("split two");
        pages.first.tc("left focus");
        pages.second.tc("active right focus");
    });

    pages.second = div.c("card second", () => {
        p("Second.");
    }).click(() => {
        pages.first.tc("active");
        pages.second.tc("focus right left");
        pages.third.tc("active right focus");
    });

    pages.third = div.c("card third", () => {
        p("Third.");
    });
});

// window.addEventListener("resize", (e) => {
//     console.log(pages.el.offsetWidth);

//     if (pages.el.offsetWidth < 700){
//         pages.ac("break");
//     } else {
//         pages.rc("break");
//     }
// });