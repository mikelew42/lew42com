import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";
// import HashRunner from "/framework/App/HashRunner.js";



// app.header();

app.$main = el("main", {
    left: app.sidenav(),
    center(){

        if (window.location.hash){
    
            app.directory.container();
            
        } else {
            
            div.c("left", () => {
                div.c("icon-item", () => {
                    icon("format_paint");
                    p("Work Hard");
                });      
                div.c("icon-item", () => {
                    icon("games");
                    p("Play Harder");
                });
                div.c("icon-item", () => {
                    icon("bubble_chart");
                    p("Find Meeming");
                });
    
                app.directory.render();
            });
            div.c("card", () =>{
                h1("Master of Layouts");
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
            
                el("sidebar", "yo");
            });

        }

        // new HashRunner();
        // test("what does this look like", t => {
        //     p("Don't worry, this is just a test");
        // });
    },
    // right: el("sidebar", () => {
    //     h1("this is a test");
    //     h2("this is a test");
    //     h3("this is a test");
    //     p("this is a test");
    //     div("this is a test");
    // })
});

app.footer();
// el("iframe").attr("src", "https://www.youtube.com/embed/l-5xLrhMeco/");