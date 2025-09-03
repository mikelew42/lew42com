import { el, div, p, Base, View, h1, h2, h3 } from "/framework/core/core.js";
import Page from "./Page.class.js";

export default new Page({
    meta: import.meta,
    name: "Sub",
    render(){
        return div.c("page " + this.name.toLowerCase().replace(/\s+/g, "-"), this.content.bind(this));
    },
    content(){
        h1(this.name);

    }
});