import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon, style } from "/app.js";

app.$root.ac("pad center squeeze light");

app.stylesheet("test.css");

// putting the el("style") into the document caused the :first-child { margin-top: 0; } logic to break.
// this function puts the style element into the head, where it should be...
style(`.bg\\2b 10 {
    color: purple;
}`); // moved to test.css

function test(code){
    let status, editor;
    div.c("test", test => {
        div.c("layout", () => {

            editor = el.c("textarea", "editor-textarea", code).attr("spellcheck", "false").on("input", () => {
                editor.update();
            }).on("keydown", e => {
                // Check if the key property equals the string 'Tab'
                if (e.key === 'Tab') {
                    e.preventDefault(); // Stop the default behavior (which is tabbing to the next element)
                    
                    // Your custom logic here, e.g., inserting a tab character
                    // console.log('Tab key pressed!');
                    
                    // Example: Insert a tab character at the cursor position
                    const start = editor.el.selectionStart;
                    const end = editor.el.selectionEnd;
                    editor.el.value = editor.el.value.substring(0, start) + '\t' + editor.el.value.substring(end);
                    editor.el.selectionStart = editor.el.selectionEnd = start + 1;
                }
            });

            const viewport = div.c("viewport", {
                content: div()
            });
    
            editor.update = function(){
                const content = new View({
                    capture: false
                }).ac("content");
                try {
                    content.append(() => {
                        eval(editor.el.value);
                    });
    
                    viewport.content.replace(content);
                    viewport.content = content;
                    // status.text("Ok");
                    // test.rc("error").ac("ok");
                    editor.error.hide();
                } catch (e){
                    // console.log("error", e.message);
                    // status.text(e.message);
                    // test.rc("ok").ac("error");
                    editor.error.attr("title", e.message);
                    editor.error.show();
                }
            };

    
        });

        editor.error = div.c("error", () => {
            editor.icon = icon("report_problem");
        }).hide();

        // status = div.c("status");
        editor.update();

    });
}

h1("This is the test/test page");

div.c("flex gap", el("a", "Text").attr("href", "text"), el("a", "Squeeze").attr("href", "squeeze"));

p.c("intro", "This is an intro paragraph, and could be styled a little differently.");

h2("Imagine...");

p("You want to create a CSS class name system, that uses the `+` and `-` characters to mean 'plus' and 'minus'.  Like `bg+10` and `bg-10`, to represent a lighter and darker shade of the bg color.  This could work:");

el("pre", `.bg+10 {
    color: purple
}`);

p.c("bg+10", "I just used `color: purple` to test the theory.  This paragraph has a CSS class of `bg+10` (inspect it), which is normally not allowed.  Well, it's allowed in HTML, you just can't use `.bg+10 {}` in your CSS code, because the `+` character is reserved.  However, if you use:");

el("pre", `.bg\\\\2b 10 {
    color: purple
}`);

p("it works.  You can then use `bg+10` as a CSS class name to style HTML elements.")

p("In order to add a link, within a line of text, we need to use ", el("a", "Link Title").attr("href", "/"), " lots of extra syntax... And here's an unvisited link: ", el("a", "Unvisited Link Title").attr("href", "/dne2/"), ".  And here's some more text to see how the line height looks when wrapped to the next line.");

p("Here's some text which should upgrade `backticks` into code elements.")

p("Mother fuckers.  These `a:visited` styles are a huge PITA.  I can't remove the border in the nav... Crazy.")

p("Let's say I had a paragraph, right here.  To explain the codes. So, now we can put some ", el.c("code", "light", "div()"), " code into the text.");

p().filler("2-4s");
p().filler("2-4s");
p().filler("2-4s");
p().filler("2-4s");


el.c("pre", "bg-plus-20", `div(() => {
    // does this work?
});`);

el.c("pre", "bg-plus-10", `div(() => {
    // does this work?
});`);

el("pre", `div(() => {
    // does this work?
});`);


el.c("pre", "bg-minus-10", `div(() => {
    // does this work?
});`);


el.c("pre", "bg-minus-20", `div(() => {
    // does this work?
});`);

el.c("pre", "bg-minus-20", `div(() => {
    // does this work?
});`);




p(`Now, let's say I didn't want to quote and unquote all the time, cause that's a pita.  What if I could just use these little curly expressions ${el("code", "div('quoets iwthin wuotes within quotes')")}`);


test(`div("hello world")`);
test(`div.c("class-name", "hello world, I have a CSS class")`);

h2("Function Signatures");
p("The el, div, p, etc append all.  The el.c, div.c, p.c, etc add the class, then append the rest.")

p("Notice how the paragraphs are nested within the div.flex:");
test(`div.c("flex gap", () => {
    p("Left");
    p("Right");
})`);

p("This allows us to do cool things with JavaScript:");

test(`p("Let's count to 10.");

el("ul", () => {
    for (let i = 1; i <= 10; i++){
        el("li", "This is item " + i + ".");
    }
})`);

test(`div.c("thing", () => {
    p("This is inside a <div class='thing'>.");
    p("This is inside a ", el("code", "<div class='thing'>"), ".");
    p("This is inside a \`<div class='thing'>\`.");
})`);
test(`// p();
p("This is a paragraph.");

// p.c();
p.c("css-class", "This is a paragraph, with css-class");`);

test(`console.log("yo yo yo");`)
test(`icon("dashboard"); icon("verified_user"); icon("bug_report").style("font-size", "10em");`)

test(
    'const name = "Michael";\n' +
    'div(`Hello, ${name}!`);');

test("");

test("test name", t => {
    // do stuff in here
});