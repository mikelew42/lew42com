import { el, div, p, Base, View, h1, h2, h3 } from "/framework/core/core.js";

export default class Page extends Base {
    render(){
        return div.c("page " + this.name.toLowerCase().replace(/\s+/g, "-"), this.content.bind(this));
    }
    content(){
        h1(this.name);
        
    }

    link(){
        el("a", this.name).attr("href", this.href());
    }

    href(){
        if (this.meta.url.endsWith(".page.js")){
            // what about the /path/path.page.js pattern?  ugh
            return this.meta.url.replace(".page.js", "");
        }
    }
}