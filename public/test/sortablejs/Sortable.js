export default class Sortable {
  constructor(el, options = {}) {
    this.el = el;
    this.options = Object.assign({
      draggable: 'li',
      onEnd: () => {},
    }, options);

    this.el.style.position = "relative";

    this.dragEl = null;
    this.placeholder = null;

    // Bind methods
    this._onTapStart = this._onTapStart.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDrop = this._onDrop.bind(this);

    // Attach listeners
    el.addEventListener('mousedown', this._onTapStart);
  }

  _onTapStart(evt) {
    const target = evt.target.closest(this.options.draggable);
    // if (!target || evt.button !== 0) return;
    if (!target) return;

    this.dragEl = target;
    this.placeholder = target.cloneNode(true);
    this.placeholder.style.position = 'absolute';
    this.placeholder.style.outline = '1px solid red';
    this.el.insertBefore(this.placeholder, target.nextSibling);

    target.style.opacity = '0.5';

    document.addEventListener('mousemove', this._onDragOver);
    document.addEventListener('mouseup', this._onDrop);
  }

  _onDragOver(evt) {
    console.group("dragover");
    const mouseY = evt.clientY;
    const items = Array.from(this.el.querySelectorAll(this.options.draggable));

    /**
     * This logic finds the first child where mouseY is above the midpoint.
     * In other words, the first child that is below the mouse.
     * In other words, if the mouse is currently below the midpoint, the midpoint is above the mouse
     * 
     *   -- midpoint
     *    |\ mouse          =>      mouseY is not less (midpoint above mouse)
     *                                                 
     * 
     * 
     *    |\ mouse
     *    -- midpoint       =>      mouseY is less (midpoint below mouse)
     *
     *    => first midpoint (child) below the mouse is used as the insertion target
     * 
     * Does this rely on the first children being above?  Yes it does...
     * 
     * That's why finding the nearest midpoint is probably a better idea.
     * 
     * And, we can probably just move the target, instead of the placeholder.
     * 
     * This is very similar to my implementation.
     */
    for (const item of items) {
      if (item === this.dragEl || item === this.placeholder){
        console.log("item === dragEl || placeholder, continue");
        continue;
      }
      const rect = item.getBoundingClientRect();
      if (mouseY < rect.top + rect.height / 2) {
        console.log("mouseY less than midpoint, insert placeholder before item:", item);
        this.el.insertBefore(this.placeholder, item);
        break;
      } else {

        // this fires alot, unnecessarily...
        // it seems to work in the end, but why re-append unnecessarily so many times..
        console.log("append...?");
        this.el.appendChild(this.placeholder);
      }
    }
    console.groupEnd();
  }

  _onDrop(evt) {
    if (!this.dragEl) return;
    this.dragEl.style.opacity = '';

    // insert the dragged item into the container, before the placeholder
    this.el.insertBefore(this.dragEl, this.placeholder);
    this.el.removeChild(this.placeholder);

    this.options.onEnd(this.dragEl);

    this.dragEl = null;
    this.placeholder = null;

    document.removeEventListener('mousemove', this._onDragOver);
    document.removeEventListener('mouseup', this._onDrop);
  }
}

/**
 * Some differences with my implementation:
 * 
 * I'm using a Draggable instance per item, which allows nesting.
 * 
 * 
 * This Sortable adds one event listener for the container, and handles the logic for all the items.
 * 
 * In my implementation, each item is a Sortable, and adds its own pointerdown, so there are more cbs.
 * It's not necessarily a problem, if it works?
 */