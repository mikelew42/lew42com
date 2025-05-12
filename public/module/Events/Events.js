import Base from "../Base/Base.js";

export default class Events extends Base {
  instantiate(...args) {
    this.events = {};
    this.assign(...args);
    this.initialize();
  }

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

  static events = {};

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
}