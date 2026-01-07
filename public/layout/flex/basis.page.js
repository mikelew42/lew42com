import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

app.$root.ac("pad");

el("style", `
    h3 { margin-top: 3em;}
    .flex-1 { flex: 1; }
    
    .ux { background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.2); }
`);

h1("Flex Basis");

h3("default = flex: 0 1 auto");
p("With basis = auto, you don't get equal column widths.");


div.c("flex gap ux", () => {
    div.c("card left", () => {
        p().filler("1-2s");
        p().filler("1-2s");
    });
    div.c("card right", () => {
        p().filler("2-5s");
        p().filler("2-5s");
    });
});

p("Also, these won't grow to full width, without enough content:");
div.c("flex gap ux", () => {
    div.c("card left", () => {
        p("Left");
    });
    div.c("card right", () => {
        p("Right")
    });
});

h3("flex: 1 -> 1 1 0%");

p("With this, we get equal widths.  When does the 0% backfire?  This I don't remember.")

div.c("flex gap ux", () => {
    div.c("card left flex-1", () => {
        p().filler("1-2s");
        p().filler("1-2s");
    });
    div.c("card right flex-1", () => {
        p().filler("2-5s");
        p().filler("2-5s");
    });
});