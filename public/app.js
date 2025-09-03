import { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test } from "/framework/core/App/App.js";
import Socket from "/framework/ext/Socket/Socket.js";
import Directory from "/framework/ext/Directory/Directory.js";


const app = window.app = new App({
    initialize(){
        View.stylesheet("/lew42.css").on("load", () => {
            console.log("lew42.css loaded");
        });        
        
        // View.stylesheet("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap").on("load", () => {
        //     console.log("Montserrat loaded");
        // });
        // this.initialize_font();
        // this.initialize_google_icon_font();
        this.initialize_socket();
        this.initialize_directory();
        this.initialize_ready();
    },

    async initialize_font(){
        this.font = new FontFace("Montserrat", "url(https://fonts.gstatic.com/s/montserrat/v30/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2)");
        await this.font.load();
        document.fonts.add(this.font);
    },

    initialize_google_icon_font(){
        // View.stylesheet("https://fonts.googleapis.com/icon?family=Material+Icons").on("load", () => {
        //     console.log("Google Icons Loaded");
        // });

    },

    initialize_socket(){
        if (window.location.hostname == "localhost"){
            this.socket = Socket.singleton();
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

    async initialize_ready(){
		this.ready = Promise.all([
            this.socket.ready, 
            new Promise(resolve => {
                if (document.readyState === "complete"){
                    console.log("document.readyState === 'complete'");
                    this.initialize_body();
                    resolve(this);
                } else {
                    window.addEventListener("load", () => {
                        console.log("window.load");
                        this.initialize_body();
                        resolve(this);
                    });
                }
		    }),
            (async () => {
                console.log("loading Google Icon Font");
                el("style", `.material-icons {
                    font-family: 'Material Icons';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;
                    line-height: 1;
                    letter-spacing: normal;
                    text-transform: none;
                    display: inline-block;
                    white-space: nowrap;
                    word-wrap: normal;
                    direction: ltr;
                    -webkit-font-feature-settings: 'liga';
                    -webkit-font-smoothing: antialiased;
                }`).append_to(document.head);
                this.icon_font = new FontFace("Material Icons", "url(https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)", {
                    style: "normal", weight: "400" 
                });
                await this.icon_font.load();
                console.log("Google Icon Font loaded");
                document.fonts.add(this.icon_font);
            })(),
            (async () => {
                console.log("loading Montserrat FontFace");
                this.font = new FontFace("Montserrat", "url(https://fonts.gstatic.com/s/montserrat/v30/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2)", {
                    // 3. The descriptors object, matching your CSS
                    // style: 'normal',
                    weight: '100 900', // Crucial for variable fonts
                    // display: 'swap',
                    // unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
                });
                await this.font.load();
                console.log("Montserrat FontFace loaded");
                document.fonts.add(this.font);
            })(),
            new Promise(async resolve => {
                console.log("await fonts.ready");
                await document.fonts.ready;
                console.log("fonts ready");
                resolve();
            })
        ]);

        await this.ready;
        console.log("app ready");
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
        
        var navstate = JSON.parse(localStorage.getItem("navstate"));

        if (navstate === null){
            navstate = true;
            localStorage.setItem("navstate", "true");
        }

        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '\\') {
                localStorage.setItem("navstate", JSON.stringify(!navstate));
                app.$sidenav.toggle();
            }
        });
        this.$sidenav = div.c("sidenav", {
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
                // div.c("nav", () => {
                //     el.c("a", "nav-item", "Framework").attr("href", "/framework/");
                //     el.c("a", "nav-item", "Layout").attr("href", "/layout/");
                //     el.c("a", "nav-item", "Life").attr("href", "/life/");
                //     el.c("a", "nav-item", "Fly").attr("href", "/fly/");
                //     el.c("a", "nav-item", "Test").attr("href", "/test/");
                // });

                this.directory.render();
            }
        });

        if (navstate === false){
            this.$sidenav.hide();
        }

        return this.$sidenav;
    }
});

await app.ready;

export default app;

export { app, View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test };