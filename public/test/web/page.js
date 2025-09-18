import { el, div, p, View } from "/app.js";
import Page from "/framework/ext/Page/Page.js";



// const web = new Page({ 
//     name: "Web" 
// });


el("h1", "Web");
div(el("a", "HTML").attr("href", "html"));
div(el("a", "CSS").attr("href", "css"));
div(el("a", "JS").attr("href", "js"));

p("For tabs to work, we need to activate the first tab on the base page.");
p("Should I go back to static compatibility?");
p("Using full page requests vs AJAX?");


/**
 * How would I expedite these "tabs"?
 * 
 * An interesting option:
 * /path/fake could fallback to /path/index.js, for example.
 * 
 * Then, we could use this pattern?  But we couldn't have deep fakes (/path/fake/deep), because that wouldn't fallback to /path/index.js
 * 
 * 
 * In order to AJAX: we need to export and import.
 * 
 * And in order to do that, we can't really render rooted content in these page.js files.
 * 
 * An alternative, is to use index.js files for rendering each directory.
 * And then the index.js imports the page.js.  And then we can import other page.js files.
 * 
 * Maybe we use an index.json file?
 * Can store server data and client data?
 * Can dynamically indicate which pages to load and render?
 * 
 * /web/index.json:
 * {
 *      page: "web.page.js",
 * }
 */