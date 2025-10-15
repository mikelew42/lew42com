import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";

// app.$root.ac("pad");

const wrap = div.c("notion-iframe-wrapper").html(`<iframe src="https://vpexel.notion.site/ebd/2879268de9aa808c90c9d80f28c05cf1" width="100%" frameborder="0" allowfullscreen />`);

const iframe = wrap.el.firstElementChild;

function update(){
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

iframe.onload = update;

window.addEventListener("resize", e => {
    update();
});

window.resize();