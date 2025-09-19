import { el, div, Base, View } from "/app.js";


el("style", `
    * { margin:0; padding: 0; box-sizing: border-box; }
    body { background: #eee; }

    .type1 { 
        h1, h2, h3 {
            margin-bottom: 0.5em;
        }
        p { margin-bottom: 1em; }
    }
    
    .tabs {

        .buttons {
            .button { padding: 1em; }
            .button:not(.active) { cursor: pointer; }
            .button.active { font-weight: bold; }
        }

        .contents {
            padding: 2em;
        }

        &.horizontal {
            > .buttons { display: flex; }
            > .buttons > .button { padding: 1em 2em; }
            > .buttons > .button:last-child { }
            > .contents { }
        }

        &.vertical {
            display: flex;
            > .buttons { min-width: 10em; }
            > .contents { flex-grow: 1; }
        }

        &.white {
            > .buttons > .button.active { background: white; }
            > .buttons > .button:not(.active):hover { background: #ddd; }
            > .contents { background: white; }
        }
        
        &.light {
            > .buttons > .button.active { background: #eee; }
            > .buttons > .button:not(.active):hover { background: #ddd; }
            > .contents { background: #eee; }
        }
    }
    .tabs.vertical { display: flex; }
    .tabs.vertical > .tabs-tabs { min-width: 10em; }

    .tabs-tabs > .tab { padding: 1em; }
    .tabs-tabs > .tab:not(.active) { cursor: pointer; }
    .tabs-tabs > .tab.active { font-weight: bold; }

    .white.tabs > .tabs-tabs > .tab.active { background: white; }
    .white.tabs > .tabs-tabs > .tab:not(.active):hover { background: #ddd; }    
    
    .light.tabs > .tabs-tabs > .tab.active { background: #eee; }
    .light.tabs > .tabs-tabs > .tab:not(.active):hover { background: #ddd; }

    .tabs-content { padding: 2em;  }
    .tabs.vertical > .tabs-content { flex-grow: 1; }
    .white.tabs > .tabs-content { background: white; }
    .light.tabs > .tabs-content { background: #eee; }
`);

class Tab extends Base {
    instantiate(...args){
		this.assign(...args);
		this.initialize_tab();
		this.initialize();
	}

    initialize_tab(){
        this.button = div.c("button", this.label).click(() => {
            this.activate();
        }).append_to(this.tabs.view.buttons);
        this.content = div.c("content", this.content).hide().append_to(this.tabs.view.contents);
    }

    activate(){
        this.tabs.current && this.tabs.current.deactivate();
        this.tabs.current = this;
        this.button.ac("active");
        this.content.show();
    }

    deactivate(){
        this.button.rc("active");
        this.content.hide();
    }
}

class Tabs extends Base {
	instantiate(...args){
		this.assign(...args);
		this.initialize_tabs();
		this.initialize();
	}

    initialize_tabs(){
        this.tabs = [];
        this.current = null;
        this.view = div.c("tabs", {
            buttons: div(),
            contents: div()
        });
    }

    add(label, content){
        const t = new Tab({ label, content, tabs: this });
        this.tabs.push(t);
        if (this.tabs.length === 1){
            t.activate();
        }
        return this;
    }
};

const tabs = new Tabs();
tabs.view.ac("white vertical");
tabs.add("Tab 1", () => {
    el("h1", "This is Tab 1");
    el("p", "Welcome to Tab 1");
    const subs = new Tabs();
    subs.view.ac("light vertical");
    subs.add("Subtab 1", () => {
        el("h2", "This is Subtab 1");
        el("p", "Welcome to Subtab 1");
        const subsubs = new Tabs();
        subsubs.view.ac("white horizontal");
        subsubs.add("Subsubtab 1", "This is Subsubtab 1");
        subsubs.add("Subsubtab 2", "This is Subsubtab 2");
        subsubs.add("Subsubtab 3", "This is Subsubtab 3");
    });
    subs.add("Subtab 2", "This is Subtab 2");
    subs.add("Subtab 3", "This is Subtab 3");
});
tabs.add("Layout", () => {
    el("h1", "Layout");
    const layouts = new Tabs();
    layouts.view.ac("light horizontal");
    layouts.add("Flexbox", () => {
        const flex = new Tabs();
        flex.view.ac("white vertical");
        flex.add("Flex 1", "This is Flex 1");
        flex.add("Flex 2", "This is Flex 2");
    });
});
tabs.add("Tab 3", "This is the content of Tab 3");
tabs.view.buttons.append(el("a", "/test/").attr("href", "/test/"));