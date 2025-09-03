import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

// app.$main.ac("flex pad flex-h-center");


div.c("left", () => {
    app.directory.render();
});
div.c("card", () =>{
    h1("Layout");
    el("section", () => {
        h2("Work Hard");
        p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
    });
});

console.log(import.meta);
window.meta = import.meta;