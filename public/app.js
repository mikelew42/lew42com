import { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test } from "/framework/core/App/App.js";
import Socket from "/framework/ext/Socket/Socket.js";
import Directory from "/framework/ext/Directory/Directory.js";
import Directory2 from "/framework/ext/Directory2/Directory2.js";


const app = window.app = new App({

    // initialize_root(){ // 2
    //     this.$body = View.body();
    //     this.$root = div().attr("id", "root"); //.append_to(this.$body);
    //     View.set_captor(this.$root);
    // },


    initialize(){ // 4
        this.initialize_socket();
        this.initialize_directory();
        this.initialize_dx();
        this.font("Montserrat");
        this.font("Material Icons");
        this.stylesheet("/lew42.css");
        // this.breadcrumbs();
    },

    
    inject(){ // 6
        // inject root into body
        this.$dx.$main.append(this.$root);       
        this.$dx.append_to(document.body);
    },
    
    initialize_socket(){
        if (window.location.hostname == "localhost"){
            this.socket = Socket.singleton();
            this.loaders.push(this.socket.ready);
        }
    },
    
    initialize_directory() {
        this.directory = new Directory({ 
            app: this,
            ignore: ["home.page.js"]
        });
    },
    
    async initialize_dx(){
        // debugger;

        var navstate = JSON.parse(localStorage.getItem("navstate"));

        if (navstate === null){
            navstate = true;
            localStorage.setItem("navstate", "true");
        }

        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '\\') {
                e.preventDefault();
                e.stopPropagation();
                localStorage.setItem("navstate", JSON.stringify(!navstate));
                this.$header.toggle();
                this.$dx.$main.$sidenav.toggle();
            }
        });

        View.set_captor(null); // $dx was getting captured by the $root, which caused a little problemo
        this.$dx = div((dx) => {
            this.header();
            // this.breadcrumbs();
            dx.$main = div.c("main", $main => {
                $main.$sidenav = this.sidenav();
            });
        }).attr("id", "dx");
        View.restore_captor();

        if (navstate === false){
            this.$header.hide();
            this.$dx.$main.$sidenav.hide();
        }
    },

    header(){
        this.$header = div.c("header", {
            logo: div(el.c("img", "logo-img").attr("src", "/assets/img/mlogo.png").click(() => {
                window.location = "/";
            })),
            breadcrumbs: this.breadcrumbs()
        });
    },

    logobar(){
        div({
            logo: el.c("img", "logo").attr("src", "/assets/img/mlogo.png"),
            title: div("Lew42.com"),
            // close: icon("close").click(() => {
            //     this.$sidenav.remove();
            //     this.$sidenav = null;
            // })
        }).click(() => {
            window.location = "/";
        })
    },
    footer(){
        this.$footer = el("footer", {
            logo: el.c("img", "logo").attr("src", "/assets/img/mlogo.png").click(() => {
                window.location = "/";
            })
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
                div.c("crumb", el("a", part).attr("href", path + "/") );
            });
        });

    },

    sidenav(){
        return div.c("sidenav", () => {
            this.directory.render();
        });
    }
});


/**
 * I keep going back and forth on this.
 * If we put the wrong things into the loaders, for example, this could cause problems.
 * But, I think for convenience, it's not a bad idea to wait for all stylesheets and fonts before exporting.
 * 
 * You can't import app, then app.font("Name"), in a page, if we await export.
 * 
 * So yea, I think we don't await export.
 * 
 * Pages don't have to await app.ready: the injection is delayed until app.ready.
 * 
 * Which means app.font("Name") should work.
 * 
 * 
 */
// await app.ready;


export default app;

export { app, View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test };