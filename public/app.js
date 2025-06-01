import { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test } from "/framework/App/App.js";
import Socket from "/framework/Socket/Socket.js";


const app = window.app = new App({
    initialize(){
        View.stylesheet("/lew42.css");
        this.initialize_google_icon_font();
        this.initialize_ready();
        this.initialize_socket();
    },

    initialize_socket(){
        if (window.location.hostname == "localhost"){
            this.socket = new Socket();
            this.ready = Promise.all([this.ready, this.socket.ready]);
        }
    },
    
    initialize_google_icon_font(){
        View.stylesheet("https://fonts.googleapis.com/icon?family=Material+Icons");
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
        return this.$sidenav || (this.$sidenav = div.c("sidenav", {
            bar: div.c("bar", {
                logo: el.c("img", "logo").attr("src", "/assets/img/mlogo.png"),
                title: div("Lew42.com"),
                // close: icon("close").click(() => {
                //     this.$sidenav.remove();
                //     this.$sidenav = null;
                // })
            }).click(() => {
                window.location = "/";
            }),
            content: {
                nav() {
                    el.c("a", "nav-item", "Framework").attr("href", "/framework/");
                    el.c("a", "nav-item", "Layout").attr("href", "/layout/");
                    el.c("a", "nav-item", "Life").attr("href", "/life/");
                    el.c("a", "nav-item", "Fly").attr("href", "/fly/");
                    el.c("a", "nav-item", "Mastermind").attr("href", "/mastermind/");
                }
            }
        }));
    }
});

await app.ready;

export default app;

export { app, View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test };