import app, { App, el, div, View, h1, h2, h3, icon, p, is, Base, test } from "/app.js";

app.$root.ac("flex pad flex-v");

el("style", `
    .directory { max-width: none; }
    
    .area { background: rgba(0,0,0,0.1); padding: 1em; }
    #root .directory { flex-direction: row; max-width: 100%; flex-wrap: wrap; background: transparent; }
    #root .directory .file, #root .directory .dir { background: white; flex: 0 1 auto; margin-right: 1em; margin-bottom: 1em;  } 
`);


// div.c("left", () => {
//     app.directory.render();
// });
h1("Layout");
await app.directory.ready;
div.c("directory", () => {
    const dir = app.directory.files.find(fd => fd.name === "layout");
    const $dir = app.directory.render_files(dir.children);
});
h2("Global Layouts");


div.c("flex flex-wrap columns mb-1 flex-gap-1", () => {
    div.c("card min-w-400 flex-1", () => {
        h3("Basic Layouts");
        p("This is a paragraph.");
    });
    div.c("card min-w-400 flex-1", () => {
        h3("Global Layouts");
        p("This is a paragraph.");
    });
    div.c("card min-w-400 flex-1", () => {
        h3("Flexbox");
        p("This is a paragraph.");
    });
});

div.c("flex", () => {
    div.c("area", () => {
        div("one");
    });
    div.c("area", () => {
        div("two");
    });
})

// el("iframe").attr("src", "https://www.chess.com/member/hodensack8");

div.c("layout card", layout => {
    div.c("bar", () => {
        el.c("button", "prim", "test").click(function(){
            this.tc("prim");
        });
        el("button", "test").click(function(){
            this.tc("prim");
        });
        el.c("span", "button", "Display: ", el.c("select", "button", () => {
            el("option", "Block").attr("value", "item-value");
            el("option", "Inline").attr("value", "item-value");
            el("option", "Inline-Block").attr("value", "item-value");
            el("option", "Flex").attr("value", "item-value");
            el("option", "Grid").attr("value", "item-value");
            el("option", "None").attr("value", "item-value");
        }));
        el.c("span", "button", "Position: ", el.c("select", "button", () => {
            el("option", "Static").attr("value", "item-value");
            el("option", "Relative").attr("value", "item-value");
            el("option", "Absolute").attr("value", "item-value");
            el("option", "Fixed").attr("value", "item-value");
            el("option", "Sticky").attr("value", "item-value");
            el("option", "None").attr("value", "item-value");
        }));
    })

    div.c("row flex flex-v-center mb-1", () => {
        div.c("left flex-1 fw-500", "Display");
        div.c("right", el.c("select", "button", () => {
            el("option", "Block").attr("value", "item-value");
            el("option", "Inline").attr("value", "item-value");
            el("option", "Inline-Block").attr("value", "item-value");
            el("option", "Flex").attr("value", "item-value");
            el("option", "Grid").attr("value", "item-value");
            el("option", "None").attr("value", "item-value");
        }));
    });

    div.c("row flex flex-v-center mb-1", () => {
        div.c("left flex-1 fw-500", "Position");
        div.c("right", el.c("select", "button", () => {
            el("option", "Static").attr("value", "item-value");
            el("option", "Relative").attr("value", "item-value");
            el("option", "Absolute").attr("value", "item-value");
            el("option", "Fixed").attr("value", "item-value");
            el("option", "Sticky").attr("value", "item-value");
            el("option", "None").attr("value", "item-value");
        }));
    })

    h2("Work Hard");
    p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
})

div.c("card", () =>{
    el("section", () => {
        h2("Work Hard");
        p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
    });
});

div.c("card", () =>{
    el("section", () => {
        h2("Work Hard");
        p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
    });
});



// div.c("card", () =>{
//     h1("Test");

// });