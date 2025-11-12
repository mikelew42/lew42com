
import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon, style } from "/app.js";

app.$root.ac("pad");

await app.ready;

app.directory.match();
console.log("hello from fake.page.js");