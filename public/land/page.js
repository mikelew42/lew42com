import app, { App, el, div, View, h1, h2, h3, p, is, icon } from "/app.js";

app.$root.ac("pad");

el("style", `
    p:last-child { margin: 0; }

    .columns { display: flex; gap: 1em; }
    .columns > * { flex-grow: 1; }

    .form { background: #eee; }
`);

h1("Landing Page");

div.c("columns", () => {
    div.c("left", () => {
        div.c("yt-iframe").html(`<iframe width="100%" height="500" src="https://www.youtube.com/embed/l-5xLrhMeco?si=pDfXeGL8VbS3m-jU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`)
    });
    div.c("form card right", () => {
        h3("What did you think?");
        el("input", "text");
    });
});