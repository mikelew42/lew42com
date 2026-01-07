import app, { App, el, div, View, h1, h2, h3, p, is, icon } from "/app.js";

app.$main.ac("flex pad flex-h-center");

div.c("card", () => {
    h1("Router");
    h3("Route Matching for Navigation");
    p("Currently, the path structures are a bit confusing.  In order to style the nav properly, it might make sense to refactor the Directory class.");
});