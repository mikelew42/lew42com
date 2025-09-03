import { App, el, div, View, h1, h2, h3, p, is, Base, test, Test, Events } from "/app.js";;
import List0 from "./List0.js";

export default class List1 extends List0 {

	pointerdown(e){
		super.pointerdown(e);

		this.startX = e.clientX;
		this.startY = e.clientY;
		// console.log("start", this.startX, this.startY)
	}

	pointermove(e){
		this.follow_cursor(e);

		if (this.target !== e.target){
			this.new_target(e);
		}

		this.container_target_update(e);
	}

	pointerup(e){
		super.pointerup(e);

		this.target?.classList.remove("dragover");

		this.release();
	}

	release(){
		this.view.ac("release");
		this.view.el.style.transform = "";
		this.view.el.addEventListener("transitionend", () => {
			this.view.rc("release");
		})
	}

	follow_cursor(e){
		const rect = this.view.el.getBoundingClientRect();
		// console.log("client", e.clientX, e.clientY);
		// console.log("delta", e.clientX - this.startX, e.clientY - this.startY);
		this.view.el.style.transform = `translate(${e.clientX - this.startX}px, ${e.clientY - this.startY}px)`;
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

	container_target_update(e){
		if (e.target.matches(".list > .container")){

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