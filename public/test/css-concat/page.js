el("style", `
    :root {
        --base: "/framework-site/";
    }

    .test-url {
        height: 200px;
        background: url(var(--base) "assets/img/mlogo.png");
        background: url(var(--base) + "assets/img/mlogo.png");
    }
`); // you CANT concat in CSS? sheeesh

div.c("test-url");