export default class Events {

    constructor(...args) {
        this.events = {}; // so that new events can be added immediately
        this.assign(...args); // maybe before 'new' event?
        this.constructor.emit("new", this); // this isn't inheritance friendly
        this.instantiate();
    }

    assign(...args) {
        return Object.assign(this, ...args);
    }

    instantiate() {
        this.initialize();
    }

    initialize() { }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    once(event, listener) {
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }

    emit(event, ...args) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => listener.apply(this, args));
    }

    clear(event) {
        if (!this.events[event]) return;

        this.events[event] = [];
    }

    static get events() {
        return this._events || (this._events = {});
    }

    static on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    static off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    static once(event, listener) {
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }

    static emit(event, ...args) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => listener.apply(this, args));
    }

    static clear(event) {
        if (!this.events[event]) return;

        this.events[event] = [];
    }

    static use(plugin) {
        // if plugin is a function, call it for new instances, but not classes
        if (typeof plugin === "function" && !plugin.prototype) {
            this.on("new", plugin.bind(plugin));
            return this;

            // if plugin has a plugin method, call it for new instances
        } else if (plugin.plugin) {
            this.on("new", plugin.plugin.bind(plugin));
            return this;
        } else {
            console.warn("Plugin must be a function or have a plugin method");
            return this;
        }
    }

    static plugin(instance) {
        console.log(`Implement ${this.name}.plugin()`, instance);
        // new this({ instance })
        return this;
    }
}

export { Events }
