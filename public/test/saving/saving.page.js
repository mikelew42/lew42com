import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";
import Component from "/framework/ext/Component/Component.js";
import File from "/framework/ext/File/File.js";
import Dir from "/framework/ext/Dir/Dir.js";

Component.socket = File.socket = Dir.socket = app.socket;

app.$main.ac("flex pad flex-h-center");

div.c("card", () => {
    h1("Saving");
    window.dir = new Dir({ name: "test2", path: "/test/saving/" });
});