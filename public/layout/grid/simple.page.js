import app, { App, el, div, View, h1, h2, h3, icon, p, is, test, style } from "/app.js";

style(`
    .simple, .simple * { padding: 1em; }
    .simple * { background: rgba(0,0,0,0.1); color: white; }
    
    .simple { background: var(--bg); min-height: 100%; gap: 1em; display: grid;

    grid-template-columns: 15em 1fr;
        /* grid-template-columns: 15em 1fr; 
        grid-template-areas: "header header" "left content" "footer footer";
        grid-template-rows: auto 1fr; */ }

    /* .simple > .header { grid-area: header; }
    .simple > .footer { grid-area: footer; } */
`);

div.c("simple", () => {
    div.c("header", "header");
    div("yo  yo");
    div("yo  yo");
    div("yo  yo");
    div("yo  yo");
    div.c("main", "main");
    div.c("footer", "footer");
});