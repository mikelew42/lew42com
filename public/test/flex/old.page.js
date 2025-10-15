import { View as _View } from "/framework/core/core.js";
import Socket from "/framework/ext/Socket/Socket.js";


Socket.singleton();

class View extends _View {
    lorem(){
        this.append("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
        return this;
    }
    layout(){
        // this.style("position", "relative");
        this.append({
            $layout: div()
        });
        this.update_layout();
        window.addEventListener("resize", this.update_layout.bind(this)); 
    }
    update_layout(){
        this.$layout.text(this.el.getBoundingClientRect().width + "px - font-size: " + getComputedStyle(this.el).fontSize )
    }
}

View.stylesheet("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap").on("load", () => {
    console.log("Montserrat loaded");
});

function lorem(){
    p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.")
}

View.body().init();

const { el, div, p, h3 } = View.elements();

el("style", `
    * { padding: 0; margin: 0; box-sizing: border-box; }

    body { font-size: clamp(1em, 1vw, 1.25em); font-family: Montserrat; }

    /* @media (min-width: 1333px) {
        body {
            font-size: 1.2vw;
        }
    }

    @media (min-width: 1666px) {
        body {
            font-size: 20px;
        }
    } */


    .container {
        container-type: inline-size;
        max-width: 30em;
        background: #ddd;
        padding: 1em; 
    }
    
    .container2 {
        max-width: none;
    }

    .card { background: white; padding: 6cqw 8cqw; font-size: clamp(1em, 4cqw, 2em); line-height: 1.75; }

    .card h3 { font-size: 1.5em; margin-bottom: 0.5em;  }
    .card > p { margin-bottom: 5cqw; }

    .flex { display: flex; flex-wrap: wrap; gap: 1em; }
    .flex > * { flex: 1 1 50cqw; }
`);

el("h1", "Hello");

div.c("font-size", d => {
    d.update = () => {
        d.empty(getComputedStyle(document.body).fontSize)
    };

    window.addEventListener("resize", d.update);

    d.update();
});

div.c("flex", () => {
    div.c("container", c => {
        div.c("card", card => {
            h3("Heading");
            lorem();
            lorem();
            card.layout();
        });
        lorem();
        c.layout();
    })
    div.c("container container2", c => {
        div.c("card", card => {
            h3("Heading");
            lorem();
            lorem();
            card.layout();
        });
        lorem();
        c.layout();
    })

});


/**
 * What are containers good for?
 * - relative % units
 * - automatic adapting to width (same content -> any container)
 * 
 * What are the limitations?
 * - can't zoom?
 * 
 * Why not?  Fluid containers (%) stay the same relative size on zoom.
 * If font-size is cqw, then the font size also stays the same, relative to the container?
 * 
 * 
 * 
 * One problem with cqw: you either have to clamp every property, or it gets a little wonky at big and small...
 * 
 */