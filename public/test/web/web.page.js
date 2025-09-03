import { el, div, p, View } from "/framework/core/core.js";
import Page from "/framework/ext/Page/Page.js";
import Socket from "/framework/ext/Socket/Socket.js";


Socket.singleton();

View.body().init();

// const web = new Page({ 
//     name: "Web" 
// });


el("h1", "Web");
div(el("a", "HTML").attr("href", "html"));
div(el("a", "CSS").attr("href", "css"));
div(el("a", "JS").attr("href", "js"));

p("For tabs to work, we need to activate the first tab on the base page.");
p("Should I go back to static compatibility?");
p("Using full page requests vs AJAX?")