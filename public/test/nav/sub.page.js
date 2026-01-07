import { el, div, p, View, h1, h2, h3 } from "/app.js";
import Page from "./Page.class.js";

export default new Page({
    meta: import.meta,
    name: "Sub",
    content(){
        p("This is sub.page.js");
    }
});