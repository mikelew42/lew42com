---
trigger: model_decision
description: Framework architecture overview.
---

FRAMEWORK ARCHITECTURE & CORE PATTERNS

LOADING & MOUNTING LIFECYCLE
To prevent FOUC (Flash of Unstyled Content), the framework decouples element creation from DOM injection.

class App:
- config(): Sets up initial state and triggers render().
- render(): Builds the UI tree in memory (assigning to this.$root, etc.) but does NOT append to document.body.
- load(): An async phase that awaits this.load_page() and then this.loaded.
- loaded: A getter that returns Promise.all of View.stylesheets and App.loaders.
- initialize(): Called ONLY after all assets are ready. This is where this.inject() (appending to body) happens.

VIEW & CAPTURING SYSTEM
The framework uses a "capturing" mechanism to handle nesting without explicit parent references.

- View.set_captor(view): Sets the current parent that will receive new elements.
- el.c(tag, classes, ...content): Shorthand for creating elements with classes.
- div.c(classes, ...content): Shorthand for el.c("div", ...).
- Capturing Hooks: Fns passed to append or div.c are called with the context of the view, automatically capturing children created inside them.

FILE & CLASS CONVENTIONS
- Structure: Core classes use PascalCase.
- Paths: Follow the /Thing/Thing.js pattern (directory name matches class name).
- Naming: Use snake_case for variables, methods, and arguments. Prefer short, single words.

CSS & ASSETS
- Stylesheets: Use this.stylesheet(import.meta, "path.css"). This adds to the View.stylesheets global gate.
- Fonts: Defined in App.js and loaded via this.font(name).