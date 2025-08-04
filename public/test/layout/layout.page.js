import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";
import Component from "/framework/ext/Component/Component.js";

Component.socket = app.socket;

el("style", `
    .layout {
        background: #fff;
        padding: 1em;
    }
    .layout > .toolbar {
        display: flex;
        align-items: center;
    }
        
    .layout .material-icons {
        font-size: 1.5em;
        display: block;
    }
    
    .button {
        display: flex;
        background: #f0f0f0;
        cursor: pointer;
    }

    .button > * {
        padding: 0.25rem 0.5rem;
    }

    .button .icon {
        display: block;
        padding-right: 0;
    }

    .button .label {
        display: flex;
        align-items: center;
        padding-right: 1rem;
    }
`);

app.$main.ac("flex pad flex-h-center").style("flex-direction", "column");

class Layout extends Component {
    initialize(){
        if (!this.get("children")){
            this.set("children", []);
        }
    }
    render(){
        this.view = div.c("layout", {
            toolbar: div(() => {
                icon("home");
                icon("settings");
                icon("lightbulb");
                icon("verified");
                icon("shopping_cart");
                icon("delete");
                icon("account_circle");
                icon("add");
                div.c("button", icon("add"), div.c("label", "Add")).click(() => {
                    
                })
            }),
            content: div(() => {
                for (const child of this.get("children")){
                    console.log("child", child);
                }
            })

        });
    }
}

const layout = await new Layout().ready;
layout.render();