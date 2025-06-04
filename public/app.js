import { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test } from "/framework/core/App/App.js";
import Socket from "/framework/Socket/Socket.js";
import Directory from "/framework/ext/Directory/Directory.js";


const app = window.app = new App({
    initialize(){
        View.stylesheet("/lew42.css");
        this.initialize_google_icon_font();
        this.initialize_socket();
        this.initialize_directory();
        this.initialize_ready();
    },

    initialize_google_icon_font(){
        View.stylesheet("https://fonts.googleapis.com/icon?family=Material+Icons");
    },

    initialize_socket(){
        if (window.location.hostname == "localhost"){
            this.socket = new Socket();
        } else {
            this.socket = { ready: Promise.resolve() };
        }
    },
    
    initialize_directory() {
        this.directory = new Directory({ 
            app: this,
            ignore: ["home.page.js"]
         });
    },

    initialize_ready(){
		this.ready = Promise.all([
            this.socket.ready, 
            new Promise(resolve => {
                if (document.readyState === "complete"){
                    this.initialize_body();
                    resolve(this);
                } else {
                    window.addEventListener("load", () => {
                        // console.log("window.load");
                        this.initialize_body();
                        resolve(this);
                    });
                }
		})]);
	},

    initialize_body(){
        this.$body = View.body().init();
        this.$body.ac("page-" + ( window.location.pathname.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-") || "home" ));
    },

    header(){
        this.$header = el("header", {
            logo: el.c("img", "logo").attr("src", "/assets/img/mlogo.png").click(() => {
                window.location = "/";
            })
        });
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

    sidenav(){
        const app = this;

    
        // window.addEventListener('keydown', (e) => {
        //     console.log('Key:', e.key, 'Ctrl:', e.ctrlKey, 'Focused:', document.activeElement);
        //   });

        // setInterval(() => {
        //     console.log('Active element:', document.activeElement);
        //   }, 500);
          

        window.addEventListener('keydown', (e) => {
            // console.log('Key:', e.key, 'Ctrl:', e.ctrlKey, 'Focused:', document.activeElement);
            if (e.ctrlKey && e.key === '\\') {
                // debugger;
                // console.log('Ctrl + \\ pressed');
                app.$sidenav.toggle();
                document.body.focus();  // hmm, focus issues after Ctrl + R reload
            }
        });
        return this.$sidenav || (this.$sidenav = div.c("sidenav", {
            logobar: div({
                logo: el.c("img", "logo").attr("src", "/assets/img/mlogo.png"),
                title: div("Lew42.com"),
                // close: icon("close").click(() => {
                //     this.$sidenav.remove();
                //     this.$sidenav = null;
                // })
            }).click(() => {
                window.location = "/";
            }),
            content: () =>{
                div.c("nav", () => {
                    el.c("a", "nav-item", "Framework").attr("href", "/framework/");
                    el.c("a", "nav-item", "Layout").attr("href", "/layout/");
                    el.c("a", "nav-item", "Life").attr("href", "/life/");
                    el.c("a", "nav-item", "Fly").attr("href", "/fly/");
                    el.c("a", "nav-item", "Test").attr("href", "/test/");
                });

                this.directory.render();
            }
        }));
    }
});

await app.ready;

export default app;

export { app, View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test };