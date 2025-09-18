import { app, el, div, h1, h2, h3, p } from "/app.js";

app.stylesheet(import.meta, "styles.css");

div.c("drawer", "hello world");

h1("Hello World");
p("This is the main content.  Does the drawer go over the top, or push it aside?");
p("A drawer, by definition, should overlay the content.  It slides out like a drawer.");
p("A sidebar, on the other hand, would push the content.");
p("However, I suppose there is room for a collapsing sidebar.  In other words, a drawer that pushes?  I think the problem there, is that the content has to reflow as it slides.");

h3("Centered Content");
p("If the main content is somewhat centered, then there's buffer for the slide out drawer?");
p("The problem is, this isn't always the case.  The amount of room might vary.  And generally, you don't want to just waste a bunch of space with buffer room.  Also, it begs the question: why not just leave the drawer expanded, if you have the room?")