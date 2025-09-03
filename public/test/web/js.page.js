import { el, div, View } from "/framework/core/core.js";
import Page from "/framework/ext/Page/Page.js";
import Socket from "/framework/ext/Socket/Socket.js";


Socket.singleton();

View.body().init();

// const web = new Page({ 
//     name: "Web" 
// });


div(el("a", "Web").attr("href", "./"));
// el("a", "HTML").attr("href", "html");
el("h1", "JavaScript");