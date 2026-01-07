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
        width: clamp(400px, 50%, 800px);
        container-type: inline-size; }
    
    .row { gap: 1em; }
    
    .container .card { background: white; margin-bottom: 1em; padding: 1em; }
    .container1 {
    }

    .container1 .card { font-size: 5cqw; }
    
    .container2 {
    }
        
    .container2 .card { font-size: clamp(1em, 3cqw, 1.5em); margin-bottom: 5cqw; }
    .container3 .card { font-size: 10%; }

    input[type="checkbox"] {
        accent-color: rebeccapurple;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
`);
lorem();
div.c("flex row", () => {
    div.c("container container1", container => {
        div.c("card", () => {
            p("What was the point of containers anyway?");
            el("input").attr("type", "checkbox");
            el("input").attr("type", "checkbox").attr("checked", true);
            p("Something about, one size fits all?  Just render anything anywhere, and even resize the container, and it all just works?")
            lorem();
            container.handle = div.c("drag-handle", "handle");
        });
    
        new Draggable({
            view: container,
            handle: container.handle,
            start(e){
                this.startX = e.clientX;
                this.startY = e.clientY;
                // this.container_width = 
            },
            move(e){
                // container.style("width", container.width = )
            }
        });
    }).layout();
    div.c("container container2", () => {
        div.c("card", () => {
            lorem();
        });    
        div.c("card", () => {
            lorem();
        });
        div.c("not-card", () => {
            div.c("card", () => {
                lorem();
            });
            div.c("card", () => {
                lorem();
            });
        });
    
    }).layout();

})
// div.c("container3", () => {
//     div.c("card", () => {
//         lorem();
//         lorem();
//     });

// })