import { el, View, p } from "/framework/core/View/View.js";

// el("link").attr("href", "https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2")
//     .attr("rel", "preload").attr("as", "font").attr("crossorigin", true).on("load", () => {
//     console.log("Montserrat preloaded");
// }).append_to(document.head);

// // el("link").attr("href", "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap")
// //     .attr("rel", "stylesheet").attr("crossorigin", "anonymous").on("load", () => {
// //         console.log("Montserrat loaded?");
// //     }).append_to(document.head);
// View.stylesheet("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap").on("load", () => {
//     console.log("Montserrat loaded");
// });

View.stylesheet("/test/css-loading/styles.css").on("load", () => {
    p("let's go?");
});
View.body().init();
el("style", "body { font-family: Montserrat}")

el.c("h1", "blue", "this is blue?")

p("Use the dev tools to break at each point in this script.");
p("The heading renders black through the end of the scripts, and only turns blue later");