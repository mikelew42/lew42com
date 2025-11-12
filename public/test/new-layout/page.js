import { el, div, View, h1, h2, h3, p, is, Base, icon, style } from "/framework/core/View/View.js";
import "/framework/ext/Lorem/Lorem.js";

import Socket from "/framework/ext/Socket/Socket.js";
Socket.singleton();

View.body().init();

style(`
    * { margin: 0; }
    p { margin-bottom: 1em; }
    html { background: green; overflow: hidden; scrollbar-color: rgba(0,0,0,0.2) transparent;  }
    body { background: blue; }
    #root { background: red; display: flex; flex-direction: column;  }

    html, body, #root { height: 100%; }
    
    #root-body { flex: 1 1 100%; display: flex; overflow: hidden; }
    #root-header { background: gray; min-height: 50px; }

    .sidenav { min-width: 300px; height: 100%; background: white; }
    .workspace { overflow-y: auto; scrollbar-width: thin; }
`);

div().attr("id", "root").append(() => {
    div().attr("id", "root-header").append(() => {

    });
    div().attr("id", "root-body").append(() => {
        div.c("sidenav", () => {
            p().filler("3s");
        });
        div.c("workspace", () => {
            // div().filler("15p");
        })
    });
});