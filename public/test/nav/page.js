import { el, div, p, Base, View, h1, h2, h3 } from "/framework/core/core.js";
import Socket from "/framework/ext/Socket/Socket.js";
import sub from "./sub.page.js";

Socket.singleton();
View.body().init();


sub.render();
sub.link();