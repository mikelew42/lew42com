import app, { App, el, div, View, h1, h2, h3, p, is, Base, icon, test } from "/app.js";

h1("/Promises/Thenable/");

test("1", async t => {
    // console.log(Promise.resolve(42).then((...args) => {
    //     console.log(...args);
    // }))

    const thenable = window.thenable = {
        then(res, rej){
            console.log("then");
            setInterval(() => {
                // Tell the promise system "we're done"
                res("🎯 Thenable resolved!");
                // Or: reject("Something went wrong");
            }, 1000);
            // this.res = res;
            // this.rej = rej;
        }
    };

    console.log("before");
    await thenable;
    console.log("after");
})

class Thing {
    then(resolve, reject){

    }
}

/**
 * Cool text frame, bro.
 */

/**
 * Too bad this doesn't wrap by default.
 * 
 * Damn, VS Code has a crazy settings menu: One long scrolling list.
 * 
 * That's a lot of settings.  It would be cool if you could see the actual code, and even edit the conditions...
 * That's when things get better.  When logic is simplified, streamlined, clearer, simpler, etc.
 * 
 * Ok, so these Thenables.  This is a really interesting pattern.  
 * 
 * I thought adding a `then()` method would be like an async method, where you have to return the value that get's resolved.
 * 
 * See, the await whatever syntax expects the value to be a promise, or a thennable.
 * 
 * If the then method had to return this, to resolve to the actual object...
 * 
 * (await thing)
 * 
 * You could do this, sort of like ready, but .ready almost reads better..
 * 
 * Although, maybe the thennable method is more performant?
 * Rather than recreate a bunch of Promises that have to be gc'd, it seems like the thennable way introduces new potential...
 * 
 * You only get 1?
 * 
 * No, you could create properties that are thennable...
 * 
 * await this.something;
 * 
 * You could use these as timers, just to get the code to execute at the right time
 * - set up properties blindly, and then use them on step 2?  this usually works, but can be unclear
 * 
 * You could resolve to anything...
 * 
 * const value = await this.something;
 * 
 * 
 * The then executes immediately?
 * 
 * 
 * Honestly, it's not much different in terms of functional benefit, compared to a normal promise.  We have async/await, and a resolved value, and it can be the thing directly, or a sub thing.
 * 
 * And so we can do the exact same things with `.ready`
 * 
 * Maybe it's clearer syntax to use a custom Thenable rather than this.ready = new Promise()?
 * 
 * Actually no, that ability to run code when the promise is awaited, is gold:
 * When you have a promise, you can't automatically do that.
 * 
 * And, it seems like it happens on the next tick, good to know.
 * 
 * 
 * 
 * And so, `await this.whatever` is sort of like calling a method?
 * 
 * It's a little unclear though.  It would be clearer to write `await this.whatever()`, and actually make a promise.
 * And then you don't need that execution point, because you can do it in the method, and it's more clear.
 * 
 * 
 * When you use an async method, it automatically returns a promise.
 * 
 * this.whatever() => implicit new Promise
 * 
 * Inside, you can await this.delay(500);
 */

