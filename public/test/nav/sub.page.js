import { el, div, p, Base, View, h1, h2, h3 } from "/app.js";
import Page from "./Page.class.js";

export default new Page({
    meta: import.meta,
    name: "Sub",
    content(){
        this.back();
        h1(this.name);
        p("This is sub.page.js");
    }
});