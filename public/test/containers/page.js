import app, { App, View as _View, is, icon } from "/app.js";
import Draggable from "/framework/ext/Draggable/Draggable.js";

// const resize_cbs = [];

class View extends _View {
    lorem(){
        this.append("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
        return this;
    }
    layout(){
        this.style("position", "relative");
        this.append({
            $layout: () => {
                div.c("layout-width");
            }
        });
        this.update_layout();
        window.addEventListener("resize", this.update_layout.bind(this)); 
    }
    update_layout(){
        this.$layout.text(this.el.getBoundingClientRect().width)
    }
}

const { el, div, p } = View.elements();

function lorem(){
    p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.")
}

el("style", `
    .container {
        container-type: inline-size;
    }

    .container1 { width: clamp(300px, 25%, 800px); }
    .container2 { width: clamp(400px, 50%, 1600px); }

    .card { font-size: 2em; padding: 4cqw; background: white; }
    
    .row { gap: 1em; }
`);
lorem();

function thing(){
    div.c("card", () => {
        lorem();
    });
}

div.c("flex row", () => {
    div.c("container container1", container => {
        thing();
    });
    div.c("container container2", () => {
        thing();
    });

});
