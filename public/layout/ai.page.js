import app, { el, div, h1, h2, h3, p, style } from '/app.js';

app.$root.ac('page');

style(`
    .layout-section { margin-bottom: 4em; }
    .layout-demo { background: white; padding: 2em; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 2em; }
    .layout-item { background: var(--bg-plus-10); padding: 1.5em; border-radius: 3px; color: white; display: flex; align-items: center; justify-content: center; min-height: 100px; }
    .layout-item.tall { min-height: 200px; }
    .layout-item.short { min-height: 60px; }

    /* Holy Grail Layout */
    .holy-grail { display: flex; flex-direction: column; min-height: 400px; }
    .holy-grail .header, .holy-grail .footer { background: var(--bg); color: white; padding: 1em; text-align: center; }
    .holy-grail .middle { display: flex; flex: 1; }
    .holy-grail .sidebar { background: var(--bg-plus-10); color: white; padding: 1em; flex: 0 0 200px; }
    .holy-grail .content { flex: 1; padding: 1em; background: var(--bg-minus-10); color: white; }
    .holy-grail .right { background: var(--bg-plus-10); color: white; padding: 1em; flex: 0 0 200px; }

    /* Grid Layouts */
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1em; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1em; }
    .grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1em; }

    /* Sidebar Layouts */
    .sidebar-left { display: flex; gap: 1em; }
    .sidebar-left .sidebar { flex: 0 0 250px; }
    .sidebar-left .main { flex: 1; }

    .sidebar-right { display: flex; gap: 1em; }
    .sidebar-right .main { flex: 1; }
    .sidebar-right .sidebar { flex: 0 0 250px; }

    /* Card Grid */
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5em; }
    .card { background: white; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .card .card-header { background: var(--bg); color: white; padding: 1em; font-weight: 600; }
    .card .card-body { padding: 1.5em; }
    .card .card-footer { padding: 1em; border-top: 1px solid #eee; background: #f9f9f9; }

    /* Split Layouts */
    .split-50 { display: flex; gap: 1em; }
    .split-50 > * { flex: 1; }

    .split-60-40 { display: flex; gap: 1em; }
    .split-60-40 > :first-child { flex: 6; }
    .split-60-40 > :last-child { flex: 4; }

    .split-70-30 { display: flex; gap: 1em; }
    .split-70-30 > :first-child { flex: 7; }
    .split-70-30 > :last-child { flex: 3; }

    /* Stack Layout */
    .stack { display: flex; flex-direction: column; gap: 1em; }

    /* Center Layout */
    .center-all { display: flex; align-items: center; justify-content: center; min-height: 300px; }

    /* Responsive Wrapper */
    .responsive-wrap { display: flex; flex-wrap: wrap; gap: 1em; }
    .responsive-wrap > * { flex: 1 1 300px; }

    /* Dashboard Layout */
    .dashboard { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1em; }
    .dashboard .widget-full { grid-column: span 12; }
    .dashboard .widget-half { grid-column: span 6; }
    .dashboard .widget-third { grid-column: span 4; }
    .dashboard .widget-quarter { grid-column: span 3; }

    /* Masonry-like Layout */
    .masonry { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1em; grid-auto-flow: dense; }
    .masonry .tall { grid-row: span 2; }

    /* Sticky Sidebar */
    .sticky-layout { display: flex; gap: 1em; }
    .sticky-layout .sticky-sidebar { flex: 0 0 250px; position: sticky; top: 1em; height: fit-content; }
    .sticky-layout .scroll-content { flex: 1; }

    /* Responsive */
    @media (max-width: 768px) {
        .holy-grail .middle { flex-direction: column; }
        .sidebar-left, .sidebar-right { flex-direction: column; }
        .split-50, .split-60-40, .split-70-30 { flex-direction: column; }
        .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }
`);

h1('Layout Library');
p.c('intro', 'A comprehensive collection of useful, responsive layouts for modern web applications.');

div.c('layout-section', () => {
    h2('Holy Grail Layout');
    p('Classic three-column layout with header and footer. Perfect for blogs, documentation sites, and traditional web apps.');

    div.c('layout-demo', () => {
        div.c('holy-grail', () => {
            div.c('header', 'Header');
            div.c('middle', () => {
                div.c('sidebar', 'Left Sidebar');
                div.c('content', 'Main Content Area');
                div.c('right', 'Right Sidebar');
            });
            div.c('footer', 'Footer');
        });
    });

    h3('Code:');
    el('pre', `<div class="holy-grail">
    <div class="header">Header</div>
    <div class="middle">
        <div class="sidebar">Left Sidebar</div>
        <div class="content">Main Content</div>
        <div class="right">Right Sidebar</div>
    </div>
    <div class="footer">Footer</div>
</div>`);
});

div.c('layout-section', () => {
    h2('Grid Layouts');
    p('Flexible grid systems for organizing content into columns.');

    h3('2 Column Grid');
    div.c('layout-demo', () => {
        div.c('grid-2', () => {
            div.c('layout-item', 'Column 1');
            div.c('layout-item', 'Column 2');
        });
    });

    h3('3 Column Grid');
    div.c('layout-demo', () => {
        div.c('grid-3', () => {
            div.c('layout-item', 'Column 1');
            div.c('layout-item', 'Column 2');
            div.c('layout-item', 'Column 3');
        });
    });

    h3('4 Column Grid');
    div.c('layout-demo', () => {
        div.c('grid-4', () => {
            div.c('layout-item', 'Column 1');
            div.c('layout-item', 'Column 2');
            div.c('layout-item', 'Column 3');
            div.c('layout-item', 'Column 4');
        });
    });

    h3('Auto-Fit Grid (Responsive)');
    p('Automatically adjusts columns based on available space.');
    div.c('layout-demo', () => {
        div.c('grid-auto', () => {
            div.c('layout-item', 'Item 1');
            div.c('layout-item', 'Item 2');
            div.c('layout-item', 'Item 3');
            div.c('layout-item', 'Item 4');
            div.c('layout-item', 'Item 5');
        });
    });
});

div.c('layout-section', () => {
    h2('Sidebar Layouts');
    p('Fixed-width sidebar with flexible main content area.');

    h3('Left Sidebar');
    div.c('layout-demo', () => {
        div.c('sidebar-left', () => {
            div.c('sidebar layout-item', 'Sidebar');
            div.c('main layout-item tall', 'Main Content');
        });
    });

    h3('Right Sidebar');
    div.c('layout-demo', () => {
        div.c('sidebar-right', () => {
            div.c('main layout-item tall', 'Main Content');
            div.c('sidebar layout-item', 'Sidebar');
        });
    });
});

div.c('layout-section', () => {
    h2('Card Grid Layout');
    p('Responsive card grid that automatically adjusts to screen size. Perfect for product listings, portfolios, and galleries.');

    div.c('layout-demo', () => {
        div.c('card-grid', () => {
            for (let i = 1; i <= 6; i++) {
                div.c('card', () => {
                    div.c('card-header', `Card ${i}`);
                    div.c('card-body', 'Card content goes here. This can include text, images, or any other content.');
                    div.c('card-footer', 'Card Footer');
                });
            }
        });
    });
});

div.c('layout-section', () => {
    h2('Split Layouts');
    p('Proportional two-column layouts with different ratios.');

    h3('50/50 Split');
    div.c('layout-demo', () => {
        div.c('split-50', () => {
            div.c('layout-item tall', '50%');
            div.c('layout-item tall', '50%');
        });
    });

    h3('60/40 Split');
    div.c('layout-demo', () => {
        div.c('split-60-40', () => {
            div.c('layout-item tall', '60%');
            div.c('layout-item tall', '40%');
        });
    });

    h3('70/30 Split');
    div.c('layout-demo', () => {
        div.c('split-70-30', () => {
            div.c('layout-item tall', '70%');
            div.c('layout-item tall', '30%');
        });
    });
});

div.c('layout-section', () => {
    h2('Stack Layout');
    p('Vertical stacking with consistent spacing between elements.');

    div.c('layout-demo', () => {
        div.c('stack', () => {
            div.c('layout-item short', 'Item 1');
            div.c('layout-item short', 'Item 2');
            div.c('layout-item short', 'Item 3');
            div.c('layout-item short', 'Item 4');
        });
    });
});

div.c('layout-section', () => {
    h2('Center Layout');
    p('Perfect for login pages, loading screens, or centered modals.');

    div.c('layout-demo', () => {
        div.c('center-all', () => {
            div.c('layout-item', 'Centered Content');
        });
    });
});

div.c('layout-section', () => {
    h2('Responsive Wrap Layout');
    p('Items wrap to new lines as needed, each maintaining a minimum width.');

    div.c('layout-demo', () => {
        div.c('responsive-wrap', () => {
            div.c('layout-item', 'Item 1');
            div.c('layout-item', 'Item 2');
            div.c('layout-item', 'Item 3');
            div.c('layout-item', 'Item 4');
        });
    });
});

div.c('layout-section', () => {
    h2('Dashboard Layout');
    p('12-column grid system for building complex dashboards with widgets of various sizes.');

    div.c('layout-demo', () => {
        div.c('dashboard', () => {
            div.c('widget-full layout-item short', 'Full Width Widget (12 cols)');
            div.c('widget-half layout-item', 'Half Width (6 cols)');
            div.c('widget-half layout-item', 'Half Width (6 cols)');
            div.c('widget-third layout-item', 'Third (4 cols)');
            div.c('widget-third layout-item', 'Third (4 cols)');
            div.c('widget-third layout-item', 'Third (4 cols)');
            div.c('widget-quarter layout-item', 'Quarter (3 cols)');
            div.c('widget-quarter layout-item', 'Quarter (3 cols)');
            div.c('widget-quarter layout-item', 'Quarter (3 cols)');
            div.c('widget-quarter layout-item', 'Quarter (3 cols)');
        });
    });
});

div.c('layout-section', () => {
    h2('Masonry-like Layout');
    p('Grid layout where tall items can span multiple rows, creating a masonry effect.');

    div.c('layout-demo', () => {
        div.c('masonry', () => {
            div.c('layout-item', 'Item 1');
            div.c('layout-item tall', 'Tall Item');
            div.c('layout-item', 'Item 3');
            div.c('layout-item', 'Item 4');
            div.c('layout-item tall', 'Tall Item');
            div.c('layout-item', 'Item 6');
            div.c('layout-item', 'Item 7');
            div.c('layout-item', 'Item 8');
        });
    });
});

div.c('layout-section', () => {
    h2('Sticky Sidebar Layout');
    p('Sidebar stays in view while scrolling through main content.');

    div.c('layout-demo', () => {
        div.c('sticky-layout', () => {
            div.c('sticky-sidebar layout-item', 'Sticky Sidebar');
            div.c('scroll-content', () => {
                div.c('layout-item tall', 'Scrollable Content');
                div.c('layout-item tall', 'More Content');
                div.c('layout-item tall', 'Even More Content');
            });
        });
    });
});

div.c('layout-section', () => {
    h2('Usage Tips');
    p('All layouts are fully responsive and will adapt to mobile screens.');
    p('You can combine these layouts to create complex page structures.');
    p('Add your own styling by extending the CSS classes or using utility classes.');

    h3('Common Utility Classes');
    el('pre', `.gap-1 { gap: 1em; }
.gap-2 { gap: 2em; }
.pad-1 { padding: 1em; }
.pad-2 { padding: 2em; }
.mb-1 { margin-bottom: 1em; }
.mb-2 { margin-bottom: 2em; }`);
});
