import { View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test } from "/module/App/App.js";


const app = window.app = await new App().ready;

export default app;

export { app, View, Base, Events, App, el, div, h1, h2, h3, p, is, icon, Test, test };