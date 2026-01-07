import { App, el, div, View, h1, h2, h3, p, is, test, Test, Events } from "/app.js";;
import List0 from "./List0.js";

/*

!!!! This does not extend List2, but List0.  I abandoned the translate mechanism, going back to cursor mode.

*/

export default class List3 extends List0 {
	pointerdown(e){
		super.pointerdown(e);
		if (!this.cursor){
			this.cursor = div.c("drag-cursor");
		}
	}

	pointermove(e){
		if (this.target !== e.target){
			this.new_target(e);
		}

		this.cursor_update(e);
	}

	pointerup(e){
		super.pointerup(e);

		this.target?.classList.remove("dragover");
		this.target_list?.view.rc("dragover");
		// this.cursor.remove();

		if (this.target_list){
			this.parent?.remove(this);
			this.target_list.insert(this, this.last_nearest_insert_index);
		}
	}

	new_target(e){
		this.target?.classList.remove("dragover");
		this.target_list?.view.rc("dragover");
			// this.last_target = this.target;
			// this.last_lists_target = this.target_list;

		this.target = e.target;
		this.target_list = this.get_list_from_target(this.target);

		if (this.target_list && this.target_list !== this){
			this.target_list.view.ac("dragover");
		}

		console.log("new target", e.target);
	}

	cursor_update(e){
		if (this.target.matches(".list > .container")){
			const real_children = Array.from(this.target.children).filter(c => c !== this.cursor.el);
			// console.log("real", real_children);

			// y coordinate midpoints for each child
			const midpoints = [];
			for (const child of real_children){
				midpoints.push(
					child.getBoundingClientRect().top 
				 + (child.getBoundingClientRect().height / 2)
				);
			}

			// returns { value, index }

			console.log("midpoints", midpoints);
			const nearest = findClosestNumber(midpoints, e.clientY);

			if (e.clientY < nearest.value){
				// nearest.insert_index = Math.max(0, nearest.index - 1); // ensures we don't go below 0
				nearest.insert_index = nearest.index; // ensures we don't go below 0
			} else {
				nearest.insert_index = nearest.index + 1;
			}

			nearest.el = real_children[nearest.insert_index];

			this.last_nearest_insert_index = nearest.insert_index;
			console.log(nearest);

			if (nearest.el !== this.last_nearest_el){
				this.last_nearest_el = nearest.el;
				console.log("new target...");
				this.target.insertBefore(this.cursor.el, nearest.el);
				this.target.classList.add("has-cursor");
				// setTimeout(() => this.cursor.ac("grow"), 0);
				this.cursor.ac("grow");
			} else {
				console.log("same target...")
			}
		} else {
			this.cursor.remove();
		}
	}

	get_list_from_target(target, search_parents = true){

		if (this.view.el.contains(target)){
			// maybe its this, maybe its a child...

			var child_match;
			this.each(child => {
				child_match = child.get_list_from_target(target, false);
				if (child_match) return false;
			});

			if (child_match){
				return child_match;
			}

			return this;
		} else if (search_parents){
			// parent match?
			var parent = this.parent?.get_list_from_target(target);
			if (parent){
				return parent;
			}
		}
		return null; // this was return false

		/* but this.target_list?.view.ac() kept throwing undefined error 
		 * the conditional ?. property accessor still continues if the property is false, which is absurd */
	}

}



function findClosestNumber(array, inputNumber) {
	// debugger;
    // Initialize variables to store the closest number and the smallest difference
    let closestNumber = array[0];
    let smallestDifference = Math.abs(array[0] - inputNumber);
    let index = 0;

    // Loop through the array
    for (let i = 1; i < array.length; i++) {
        // Calculate the difference between the current array element and the input number
        const currentDifference = Math.abs(array[i] - inputNumber);

        // If the current difference is smaller than the smallest difference found so far
        if (currentDifference < smallestDifference) {
            // Update the smallest difference and the closest number
            smallestDifference = currentDifference;
            closestNumber = array[i];
            index = i;
        }
    }

    // Return the closest number found
    return { value: closestNumber, index };
}