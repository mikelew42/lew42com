import Base from "./Base.js";
import Events from "./Events.js";
import { el, div, View, h1, h2, h3, p, is } from "./View.js";


/*

This really doesn't need anything?  We just can't have:
- events
- references

Unless we're careful about them...

So we just create our Events class carefully...
And add the reference feature to the base class...?



We can use a toJSON = () => undefined; to ignore any obj or arr...
*/
export default class Direct extends Base {

}