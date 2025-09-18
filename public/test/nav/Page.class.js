import { el, div, p, Base, View, h1, h2, h3 } from "/app.js";

export default class Page extends Base {
    render(){
        this.view = div.c("page " + this.name.toLowerCase().replace(/\s+/g, "-"), () => {
            this.header();
            this.content();
            // this.footer();
        });
    }

    header(){
        h1(this.name);
    }

    content(){}

    link(){
        el("a", this.name).attr("href", this.href());
    }

    href(){
        if (this.meta.url.endsWith(".page.js")){
            // what about the /path/path.page.js pattern?  ugh
            return this.meta.url.replace(".page.js", "");
        }
    }

    preview(){
        el("a", div.c("page-preview", this.name)).attr("href", this.href());
    }

    back(){
        let url;

        // if /path/page/, go up to /path/
        if (window.location.pathname.endsWith("/"))
            url = "../";

        // if /path/page , go to /path/
        else 
            url = "./";

        el("a", "Back").attr("href", url);
    }
}