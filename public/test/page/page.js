import { el, div, h1, app, p } from "/app.js";
import sub from "./sub.page.js";

// app.$root.ac("page");


div.c("flex auto", () => {
    div.c("left", () => {
        p("Left");
    });
    div.c("page", () => {
        h1("Test / Page");
        
        p().filler("2-4s");
    });
});

// app.directory.render().ac("white");


sub.link();
// console.log("this is /page/page.js");

// export default {
//     render(){
//         console.log("rendering /page/page.js");
//     }
// }