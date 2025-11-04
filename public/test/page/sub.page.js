import { el, div, app } from "/app.js";

// console.log("this is /page/page.js");

export default {
    render(){
        el("h1", "Sub Page");
        app.lorem();
    },
    link(){
        el("a", "Sub Page").attr("href", "/test/page/sub");
    }
}