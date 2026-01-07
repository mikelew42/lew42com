import app, { App, el, div, View, h1, h2, h3, icon, p, is, test } from "/app.js";

app.$root.ac("pad");

el("style", `
    .layout-demo {
        border: 2px solid rgba(0,0,0,0.1);
        border-radius: 8px;
        padding: 1em;
        margin-bottom: 2em;
        background: white;
    }
    
    .layout-demo h3 {
        margin-top: 0;
        margin-bottom: 1em;
        color: #333;
    }
    
    .demo-area {
        background: rgba(0,0,0,0.05);
        border: 1px dashed rgba(0,0,0,0.2);
        padding: 1em;
        margin: 0.5em 0;
    }
    
    .demo-header { background: rgba(59, 130, 246, 0.2); }
    .demo-sidebar { background: rgba(16, 185, 129, 0.2); }
    .demo-main { background: rgba(251, 191, 36, 0.2); }
    .demo-footer { background: rgba(239, 68, 68, 0.2); }
    .demo-card { background: rgba(139, 92, 246, 0.2); }
    .demo-nav { background: rgba(236, 72, 153, 0.2); }
    
    /* Centered Layout */
    .centered-layout {
        max-width: 800px;
        margin: 0 auto;
        padding: 2em;
    }
    
    /* Sidebar Layout */
    .sidebar-layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 1em;
        min-height: 400px;
    }
    
    /* Header Footer Layout */
    .header-footer-layout {
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 500px;
        gap: 1em;
    }
    
    /* Card Grid Layout */
    .card-grid-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1em;
    }
    
    /* Split Screen Layout */
    .split-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        min-height: 400px;
    }
    
    /* Dashboard Layout */
    .dashboard-layout {
        display: grid;
        grid-template-columns: 200px 1fr;
        grid-template-rows: auto 1fr;
        gap: 1em;
        min-height: 500px;
    }
    
    .dashboard-layout .header {
        grid-column: 1 / -1;
    }
    
    /* Article Layout */
    .article-layout {
        max-width: 900px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2em;
        padding: 2em;
    }
    
    /* Navbar Layout */
    .navbar-layout {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em 2em;
    }
    
    .navbar-layout .nav-links {
        display: flex;
        gap: 1.5em;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    @media (max-width: 768px) {
        .sidebar-layout,
        .split-layout,
        .article-layout {
            grid-template-columns: 1fr;
        }
        
        .dashboard-layout {
            grid-template-columns: 1fr;
        }
        
        .navbar-layout {
            flex-direction: column;
            gap: 1em;
        }
        
        .navbar-layout .nav-links {
            flex-direction: column;
            gap: 0.5em;
        }
    }
`);

h1("Cursor Layout Library");

p("A collection of simple, useful web layouts ready to use in your projects.");

// Centered Layout
div.c("layout-demo", () => {
    h3("1. Centered Content Layout");
    p("Perfect for articles, forms, and focused content. Centers content with a max-width.");
    
    div.c("centered-layout demo-area", () => {
        h3("Centered Content");
        p("This content is centered with a maximum width of 800px. Great for readability and focus.");
        p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    });
});

// Sidebar Layout
div.c("layout-demo", () => {
    h3("2. Sidebar Layout");
    p("Two-column layout with a fixed sidebar and flexible main content.");
    
    div.c("sidebar-layout", () => {
        div.c("demo-area demo-sidebar", () => {
            h3("Sidebar");
            p("250px fixed width");
            p("Navigation, filters, or secondary content");
        });
        div.c("demo-area demo-main", () => {
            h3("Main Content");
            p("Flexible width, takes remaining space");
            p("Primary content area");
        });
    });
});

// Header Footer Layout
div.c("layout-demo", () => {
    h3("3. Header/Footer Layout");
    p("Classic layout with header, main content, and footer.");
    
    div.c("header-footer-layout", () => {
        div.c("demo-area demo-header", () => {
            h3("Header");
            p("Site navigation, logo, or top bar");
        });
        div.c("demo-area demo-main", () => {
            h3("Main Content");
            p("Main content area that expands to fill available space");
        });
        div.c("demo-area demo-footer", () => {
            h3("Footer");
            p("Copyright, links, or footer content");
        });
    });
});

// Card Grid Layout
div.c("layout-demo", () => {
    h3("4. Card Grid Layout");
    p("Responsive grid of cards that adapts to screen size.");
    
    div.c("card-grid-layout", () => {
        div.c("demo-area demo-card", () => {
            h3("Card 1");
            p("Auto-sizing cards");
        });
        div.c("demo-area demo-card", () => {
            h3("Card 2");
            p("Minimum 250px width");
        });
        div.c("demo-area demo-card", () => {
            h3("Card 3");
            p("Responsive grid");
        });
        div.c("demo-area demo-card", () => {
            h3("Card 4");
            p("Fills available space");
        });
    });
});

// Split Screen Layout
div.c("layout-demo", () => {
    h3("5. Split Screen Layout");
    p("Equal-width two-column layout, perfect for comparisons or dual content.");
    
    div.c("split-layout", () => {
        div.c("demo-area demo-main", () => {
            h3("Left Panel");
            p("50% width");
            p("Content for left side");
        });
        div.c("demo-area demo-sidebar", () => {
            h3("Right Panel");
            p("50% width");
            p("Content for right side");
        });
    });
});

// Dashboard Layout
div.c("layout-demo", () => {
    h3("6. Dashboard Layout");
    p("Full dashboard layout with sidebar navigation and header.");
    
    div.c("dashboard-layout", () => {
        div.c("demo-area demo-header", () => {
            h3("Header");
            p("Spans full width");
        });
        div.c("demo-area demo-sidebar", () => {
            h3("Sidebar");
            p("200px fixed");
            p("Navigation menu");
        });
        div.c("demo-area demo-main", () => {
            h3("Dashboard Content");
            p("Main dashboard area");
            p("Charts, widgets, data tables");
        });
    });
});

// Article Layout
div.c("layout-demo", () => {
    h3("7. Article/Content Layout");
    p("Blog post or article layout with main content and sidebar.");
    
    div.c("article-layout", () => {
        div.c("demo-area demo-main", () => {
            h3("Article Title");
            p("Main article content goes here. This is the primary reading area with flexible width.");
            p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.");
            p("More content continues here...");
        });
        div.c("demo-area demo-sidebar", () => {
            h3("Sidebar");
            p("300px fixed");
            p("Related articles, ads, or additional info");
        });
    });
});

// Navbar Layout
div.c("layout-demo", () => {
    h3("8. Navigation Bar Layout");
    p("Flexible navigation bar with logo and links.");
    
    div.c("navbar-layout demo-nav", () => {
        div.c("demo-area", () => {
            h3("Logo");
        });
        el("ul", "nav-links", () => {
            el("li", "Home");
            el("li", "About");
            el("li", "Services");
            el("li", "Contact");
        });
    });
});

h2("Usage Notes");

div.c("layout-demo", () => {
    p("All layouts are responsive and will stack on mobile devices.");
    p("Copy the CSS classes and HTML structure to use these layouts in your projects.");
    p("Customize colors, spacing, and dimensions to match your design system.");
});
