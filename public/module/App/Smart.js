import Base from "/module/Base/Base.js";
import Events from "/module/Events/Events.js";
import { el, div, View, h1, h2, h3, p, is } from "./View.js";


/*

getter/setter
toJSON -> 

*/
export default class Smart extends Base {
	instantiate(...args){
		this.assign(...args);
		// this.initialize(); // do this after?
	}

	toJSON(){
		return this.props;
	}


	get(name){
		return this.props[name];
	}

	/*
	This is quite confusing.
	1. A smart object needs to be set to a parent smart object.
	2. We assume the parent smart object is already initialized with data...?
	*/
	set(name, value){
		// if the property is also a smart object, we need to do some setup
		if (value instanceof Smart){
			value.setup(this, name);
		} else {
			// normal prop update...
			this.props[name] = value;
			this.save();
		}

		if (is.obj(value) || is.arr(value) || is.class(value)){
			if (!is.def(this[name]))
				this[name] = value;
			else
				console.warn("promote prop conflict");
		}

		return this; // ?
	}

	// when we parent.set("child", child), the parent.set will in turn call this
	setup(parent, name){
		const data = parent.props[name];

		// set this before .initialize(), so initialize can .set child smart objects
		this.saver = parent.saver;


		if (!this.props){ // unset smart object
			if (!is.def(data)) // no data to load
				parent.props[name] = this.props = {};  // init empty props
				// I'm not sure if this should be saved yet?
				// I guess the empty props would be saved, and would be reloaded...
				// could be useful for fleshing out some sort of empty structures...?
			else // assume the data are for real
				this.props = data;  // doesn't need to be saved...

			// both of the above could probably just be:
			// this.props = parent.props[name] = data || {};
			this.initialize();
		} else {
			console.warn("hmm, not sure here");
			// we're trying to re-set a smart object...
		}

	}

	save(){
		if (this.saver) this.saver.save();
		else console.error("no .saver");
		// else this.constructor.save();
	}

	static save(){
		this.saver.save();
	}

	// get root_prop(){
	// 	return this.props._root_prop;
	// }

	// set root_prop(value){
	// 	this.props._root_prop = value;
	// 	this.save();
	// }  // no underscore needed, just map it?

	log(){
		console.log(this);
	}
}


/*



Maybe instead of .props, we use .data?  And basically just this.data = new Data()?  Could work...  It could encapsulate all the saving, so we don't even need a save() method...

Ideally, we get setup to work with the object without having to save anything:
- either by defining get/set methods for all the most common props
- or by using the get() set() methods (maybe the only 2 required methods)



Could the Smart object use _underscored prop names to indicate that we should promote these props, upon instantiation, to the actual object?

We could also define root get/set methods for these properties that interact with this.props._underscore

*/



/*
 * Fully stringable...
 * Still needs get/set methods to trigger saving...
 * 
 */
class Simple {
	props = ["list", "of", "savable", "props"];
	toJSON(){
		const data = {};
		for (const prop of this.props){
			data[prop] = this[prop];
		} // copies only the list of savable props
		return data;
	}
}


class Simpler {
	// just no refs
	// no events
	// fully stringable...
}


/*
The question is, should the app be a Smart object, Simple object, etc?
I'm still not 100% sure when exactly we'll need these additions or omissions, and which way wwill be easier...

Currently, I was working to have app.data.data be a duplicate tree of all the data.

And so part of the objective here was to eliminate the need to duplicate everything, in order to be able to JSON.stringify(app)...

One of the biggest challenges there will be the references.  Circular or otherwise.  Also just auto saving, auto instantiation, etc...


The question is, can we preserve the data structure without extra creation or redundancy?

How do we configure the smart objects in order to properly... configure the saving?

That's the trick.

We can go from simple .props to wrapping the props in their own wrappers that could define their own custom fn.

But, because the stringify will automatically check for toJSON on all objects, means we should be able to customize it along the way.  Let's see...



Ahh yes, so the app has the .data saver class, it has the socket, it has a lot of utility things that don't need to be saved.

So, instead of trying to JSON-ignore all the things, we probably want to JSON include them (using the smart object)


Again, there can be different levels..


Even though the root {} object for any file could represent the app, it doesn't necessarily need to mimic the app props directly.  If we're using the smart object to map the data around, we just need to be slightly careful about collisions...

For example, currently, the app.data.set("prop") is a root data.json prop.  

Now, if app is a smart object, and we try to use app.set("prop") to be a root prop...

Do the classes use app.set("Thing", Thing) ?

Maybe...



Maybe the App class should have its own smart properties.

App.set("Thing", Thing);

And then the root data.json file really represents the App class's properties.  That would make more sense.

And then when we make a new app, that app gets added.

In fact, the App can create App.set("apps", []) -> keep an updated list of apps.


And there's a problem with array and object properties - you'd have to re-set them every time you wanted to change a property or adjust the array...

We could potentially use a collection in order to .set("coll", coll) and have the changes automatically work.  But that requires a handshake between the set and the coll, @todo.



Comparing the list of props, vs the separate props object, what are the pros and cons?

Is it just the lack of need to copy the data?  I mean, this is quite convenient and efficient...

But it also means we have to jump through hoops?

Well - either way, we have to either setup individual get/set methods, or use the generic get/set system, in order to trigger the saving...



Ok, so once we set the prop...
For simple data props, we can just .set() -> saves, no problem.
For changing out references, we can just .set() -> saves...
For arrays, we have to reset the array in order to trigger the save, which I guess is no problem.

So like,

this.arr.push(123) -> this.set("arr", this.arr);??

Or, probably better:

this.arr.push(123);
this.save(); --> no need to reset it, it's already linked, and the save just triggers a re-string...
maybe we always try to trigger the App.save()?

ehh, this.save() is more convenient, and each object might be configured for a different saver.





*/