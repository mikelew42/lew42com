import app, { App, el, div, View, h1, h2, h3, icon, p, is, test, style } from "/app.js";

style(`
    .auto, .auto * { padding: 1em; }
    .auto * { background: rgba(0,0,0,0.1); color: white; }
    
    .auto { background: var(--bg); min-height: 100%; gap: 1em; display: grid;

        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        /* grid-template-columns: 15em 1fr; 
        grid-template-areas: "header header" "left content" "footer footer";
        grid-template-rows: auto 1fr; */ 
    }

    /* .simple > .header { grid-area: header; }
    .simple > .footer { grid-area: footer; } */
`);

div.c("auto", () => {
    div.c("header", "header");
    p("It seems you can't have columns specify their own widths...?")
    div.c("main", "main");
    div("yo  yo");
    div.c("footer", "footer");
});