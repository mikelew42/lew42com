import { el, div, h1, app } from "/app.js";
import sub from "./sub.page.js";

app.$root.ac("pad");
h1("Test / Page");

app.lorem();

sub.link();
// console.log("this is /page/page.js");

// export default {
//     render(){
//         console.log("rendering /page/page.js");
//     }
// }