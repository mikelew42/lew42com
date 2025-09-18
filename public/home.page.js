import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";

console.log("begin home.page.js");
// debugger;

// app.sidenav();

app.$main = el("main", main => {
    
    app.$main = main; // otherwise it's not available in the loaded script
    main.attr("id", "main");

    if (window.location.hash){
    
        app.directory.load();
        
    } else {
        
        // default content here
        main.ac("flex pad flex-h-center");
        div.c("left", () => {
            div.c("icon-item", () => {
                icon("format_paint");
                p("Work Hard");
            });      
            div.c("icon-item", () => {
                icon("games");
                p("Play Harder");
            });
            // debugger;
            div.c("icon-item", () => {
                icon("bubble_chart");
                p("Find Meeming");
            });
    
            app.directory.render();
        });
        div.c("card", () =>{
            app.directory.render();
            el("section", () => {
                h2.c("icon-item", icon("format_paint"), "Work Hard");
                p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
            });
            el("section", () => {
                h2.c("icon-item", icon("games"), "Play Harder");
                p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
                p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
            });
            el("section", () => {
                h2.c("icon-item", icon("bubble_chart"), "Find Meeming");
                p("Made a mistake while editing.  Real content obviously beats filler content, and helps give everything purpose.");
                p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
            });
            
            app.checklist("Burned out.", "Going crazy.", "Massive potential.", "About to give up.", "I need your help.");
        
        });
    
    }

});