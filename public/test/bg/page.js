import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon } from "/app.js";

el("style", `
    #root { background-position: 50% 50%; background-size: cover; color: white;  }    
`);
app.$root.style("background-image", "url('/assets/img/space.jpg')");

p("Lorem ipsum dolor sit amet consectetur. Non pellentesque cum ipsum pretium nibh id elementum nunc sagittis. Id auctor neque donec ultrices lectus facilisis at vulputate. Nisl eget sapien sit tellus.");