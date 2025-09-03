import { App, el, div, View, h1, h2, h3, p, is, Base, test, Test, Events } from "/app.js";;
import List1 from "./List1.js";

/*

Note to future self:

I'm going to abandon this animated translate based version.
- animation is unnecessary, complex
- I just need a functional version
- I'll go back to using the cursor

The idea here, was to translate shift each item as we move around, but that math would be tricky.  Also, we'd have to track all the shifted items, so we could unshift them.

And lastly, we'd have to decide how to do the swap, without it being visible.

I could come back to this later...
*/

export default class List2 extends List1 {
	new_target(e){
		super.new_target(e);

		if (e.target.matches(".list > .container")){
			this.target_list.mouse_to_index(e.clientY);
		}
	}
}



function getHeightIncludingMargin(element) {
  // Get the height of the element
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  
  // Get the computed styles of the element
  const style = window.getComputedStyle(element);
  
  // Get the margin values
  const marginTop = parseFloat(style.marginTop);
  const marginBottom = parseFloat(style.marginBottom);
  
  // Calculate the total height including margins
  const totalHeight = height + marginTop + marginBottom;
  
  return totalHeight;
}