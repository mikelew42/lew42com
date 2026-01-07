import app, { App, el, div, View, h1, h2, h3, p, is } from "/app.js";

// div.c("well", () => {
//     app.directory.render();

//     // render default content after the directory.render()?
// });

await app.directory.ready;

if (!app.directory.matched){
	h1("DEFAULT CONTENT!!!!!");
}