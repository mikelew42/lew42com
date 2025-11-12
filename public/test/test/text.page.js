import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon, style } from "/app.js";

app.stylesheet("test.css");
// not using import.meta would cause this to fail, if you imported this page somewhere else...

app.$root.ac("pad squeeze light");

h1("Text...");

p.c("intro", "This is an intro paragraph, that would give an overview of the page.");

h2("After the H1 and intro, we have an H2");

p().filler("2-4s");
p().filler("2-4s");
p().filler("2-4s");

h3("And here's an H3");

p("Here's some text, and I'm going to put a little `code` block in here.  So that I can see if that affects the look of the paragraph spacing.  Here's `another code block`.")
p().filler("2-4s");

app.checklist("One", "Two", "Three")