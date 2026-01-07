import app, { App, el, div, View, h1, h2, h3, icon, p, is, test, style } from "/app.js";

style(`
    .holy-grail, .holy-grail * { padding: 1em; }
    .holy-grail * { background: rgba(0,0,0,0.1); color: white; }
    
    .holy-grail { background: var(--bg); min-height: 100%; gap: 1em; display: grid;
        grid-template-columns: 15em 1fr; 
        grid-template-areas: "header header" "left content" "footer footer";
        grid-template-rows: auto 1fr; }

    .holy-grail > .header { grid-area: header; }
    .holy-grail > .footer { grid-area: footer; }
`);

div.c("holy-grail", () => {
    div.c("header", "header");
    div("yo  yo");
    div.c("main", "main");
    div.c("footer", "footer");
});