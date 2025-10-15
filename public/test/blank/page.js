import { el, div, View, h1, h2, h3, icon, p, is, Base } from "/framework/core/View/View.js";
import Socket from "/framework/ext/Socket/Socket.js";

Socket.singleton();

View.body().init();
View.stylesheet("styles.css");

div.c("root", () => {
    div.c("header", () => {

    });

    div.c("main", () => {
        div.c("left", () => {});
        div().attr("id", "root").append(() => {
            h1("Why is the body background 100%, when the body clearly isn't???")
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
            lorem();
        });
    });
});

function lorem(){
    p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus. Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.")
}