import { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test } from "/framework/core/App/App.js";
import Socket from "/framework/ext/Socket/Socket.js";
import Directory from "/framework/ext/Directory/Directory.js";

import "/framework/ext/Lorem/Lorem.js";

const app = window.app = new App({

    load(){
        this.load_framework();
        this.font("Montserrat");
        this.font("Material Icons");
        this.stylesheet(import.meta, "lew42.css");
    },

    config(){
        // directory needs to exist before rendering...
        this.instantiate_directory();
        this.instantiate_socket();
    },
    
    instantiate_socket(){
        // what if the socket fails to ready? the page won't inject...
        if (window.location.hostname == "localhost"){
            this.socket = Socket.singleton();
            this.loaders.push(this.socket.ready);
        }
    },
    
    instantiate_directory() {
        this.directory = new Directory({ app: this });
        this.loaders.push(this.directory.ready);
    },

    initialize_navstate(){
        this.navstate = JSON.parse(localStorage.getItem("navstate"));

        if (this.navstate === null){
            this.navstate = true;
            localStorage.setItem("navstate", "true");
            console.log("navstate was null, now = true");
        }

        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '\\') {
                e.preventDefault();
                e.stopPropagation();
                this.navstate = !this.navstate;
                localStorage.setItem("navstate", JSON.stringify(this.navstate));
                this.$header.toggle();
                this.$sidenav.toggle();
                this.$footer.toggle();
            }
        });

        if (this.navstate === false){
            this.$header.hide();
            this.$sidenav.hide();
            this.$footer.toggle();
            console.log("navstate === false");
        }
    },

    render(){
		this.$body = View.body();
		this.$app = div.c("app", $app => {
			$app.header = this.header();
			$app.main = div.c("main", (main) => {
				main.left = div.c("left", this.sidenav());
				main.bg = div.c("background", () => {
					this.$root = div.c("root");
					$app.footer = this.footer();
				});
				// main.right = div.c("right");
			});
			// $app.footer = div.c("footer");
		});

        this.initialize_navstate();
		View.set_captor(this.$root);
    },

    header(){
        return this.$header = div.c("header", {
            logo: div(el.c("img", "logo-img").attr("src", "/assets/img/mlogo.png").click(() => {
                window.location = "/";
            })),
            breadcrumbs: this.breadcrumbs(),
            btns: div(() => {
                icon("menu").ac("menu");
                icon("close").ac("close");
            }).click(() => {
                View.body().tc("menu-open");
            })
        });
    },

    footer(){
        return this.$footer = div.c("footer bg", {
            logo: div(el.c("img", "logo-img").attr("src", "/assets/img/mlogo.png").click(() => {
                window.location = "/";
            })),
        });
    },

    checkbox(){
        return div.c("checkbox").html(`<svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.07812 13.4771L10.0525 21.4514L29.2032 2.30078" stroke="white" stroke-width="3.9293"/>
            </svg>`);
    },

    checklist(...args){
        return div.c("checklist", checklist => {
            for (const arg of args){
                // if (arg instanceof Array){
                //     app.checklist(...arg);
                // }
                div.c("checklist-item", {
                    checkbox: app.checkbox(),
                    bar: div(arg)
                });
            }
        });
    },

    breadcrumbs(){
        const parts = window.location.pathname.split('/').filter(Boolean);
        let path = "";

        return div.c("breadcrumbs", () => {
            // div.c("crumb", el("a", "Home").attr("href", "/"));

            parts.forEach((part, i) => {
                path += "/" + part;
                div.c("crumb" + (i === (parts.length - 1) ? " active-node" : ""), el("a", part).attr("href", path + "/") );
                // console.log(i, parts.length);
            });
        });

    },

    sidenav(){
        return this.$sidenav = div.c("sidenav", () => {
            this.directory.render();
        });
    },

    lorem(n = 1){
        switch(n){
            case 1:
                return p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");
        }
        
    }
});

const lorem = app.lorem;

export default app;

export { app, View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test, lorem };
export * from "/framework/core/App/App.js";