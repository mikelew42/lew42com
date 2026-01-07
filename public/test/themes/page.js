import { el, div, p, View, h1, h2, h3 } from "/framework/core/core.js";
import Socket from "/framework/ext/Socket/Socket.js";
import { tabs, tab } from "/framework/ext/HashRouter/HashTabs.js";

Socket.singleton();

View.body().init();

el("style", `
    .theme1 {
    }        
    .theme2 {
    }

    .small { font-size: 0.8em; }
    .large { font-size: 1.2em; }

    .flex { display: flex; gap: 1em; background: rgba(0,0,0,0.1); margin-bottom: 1em; }
    .flex > * { flex: 1 1 0; padding: 1em; }

    .notes { max-width: 1000px; }
`);

function content(){

    text();

    div.c("flex", () => {
        div.c("small", text);
        div.c("large", text);
    })
}

function text(){
    el("h1", "This is an H1 Heading");
    p("Really great typography is about the bigger picture.  What fonts, colors, how does it fit with the surroundings.");
    p("One intelligent objective, is to have a single set of content, where we can switch themes.");
    el("h2", "This is an H2 heading that is not going to be title cased, and will be a bit longer to ensure wrapping.")
    el("h3", "This is an H3 heading that is not going to be title cased, and will be a bit longer to ensure wrapping.")
}

el("h1", "Themes");

tabs.c("white horizontal squeeze", () => {

    tab.c("theme1", "Theme 1", () => {
        content();

        div.c("flex", () => {
            div.c("small", content);
            div.c("large", content);
        })
    });   
    
    tab.c("notes", "Notes", () => {
        h3("Font Loading");
        p("await `whatever`");

        h3("Themes are just... modules?");
        p("Everything, for any page, should be visualized:");
        p("All loaded modules.  All loaded plugins.  All loaded styles, etc.");
    });

});