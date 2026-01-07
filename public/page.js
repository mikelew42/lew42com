import app, { App, el, div, View, h1, h2, h3, p, is, icon, test } from "/app.js";

import Sortable from "/framework/ext/Draggable/Sortable.js";

app.$root.ac("page");

h1("Home Page");

// console.log("begin home.page.js");
// debugger;

// app.sidenav();

// app.$main = el("main", main => {
    
//     app.$main = main; // otherwise it's not available in the loaded script
//     main.attr("id", "main");

//     if (window.location.hash){
    
//         app.directory.load();
        
//     } else {
        
//         // default content here
//         main.ac("flex pad flex-h-center");
//         div.c("left", () => {
//             div.c("icon-item", () => {
//                 icon("format_paint");
//                 p("Work Hard");
//             });      
//             div.c("icon-item", () => {
//                 icon("games");
//                 p("Play Harder");
//             });
//             // debugger;
//             div.c("icon-item", () => {
//                 icon("bubble_chart");
//                 p("Find Meeming");
//             });
    
//             app.directory.render();
//         });
//         div.c("card", () =>{      
//             div.c("codepen-embed").html(`<iframe height="300" style="width: 100%;" scrolling="no" title="Framework" src="https://codepen.io/technolojesus/embed/PwZgKQE?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true">
//       See the Pen <a href="https://codepen.io/technolojesus/pen/PwZgKQE">
//   Framework</a> by Michael Lewis (<a href="https://codepen.io/technolojesus">@technolojesus</a>)
//   on <a href="https://codepen.io">CodePen</a>.
//       </iframe>`);    
//             div.c("yt-iframe").html(`<iframe width="100%" height="500" src="https://www.youtube.com/embed/l-5xLrhMeco?si=pDfXeGL8VbS3m-jU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`)
//             test("Sortable.List spaced", t => {
//                 el("button", "Debug").click(() => {
//                     t.view.tc("debug");
//                 });
//                 const list = new Sortable.List({ name: "Root" });
//                 list.append(new Sortable.List({ name: "Step 1" }).append(Sortable.List.make_deep(2)));
//                 list.append(new Sortable.List({ name: "Step 2" }));
//                 list.append(new Sortable.List({ name: "Step 3" }));
//                 list.append(new Sortable.List({ name: "Step 4" }));
//                 list.append(new Sortable.List({ name: "Step 5" }));
//                 list.append(Sortable.List.make_deep(2));
//                 list.render();
//             });

//             app.directory.render();

//             el("section", () => {
//                 h2.c("icon-item", icon("format_paint"), "Work Hard");
//                 p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
//             });
//             el("section", () => {
//                 h2.c("icon-item", icon("games"), "Play Harder");
//                 p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
//                 p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
//             });
//             el("section", () => {
//                 h2.c("icon-item", icon("bubble_chart"), "Find Meeming");
//                 p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
//                 p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
//             });
            
//             app.checklist("Burned out.", "Going crazy.", "Massive potential.", "About to give up.", "I need your help.");
        
//         });
    
//     }

// });