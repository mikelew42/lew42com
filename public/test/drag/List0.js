import { App, el, div, View, h1, h2, h3, p, is, test, Test, Events } from "/app.js";;

export default class List extends Events {
	instantiate(...args){
		this.lists = [];

		this.assign(...args);

		this.pointermove = this.pointermove.bind(this);
		this.pointerup = this.pointerup.bind(this);
		this.pointerdown = this.pointerdown.bind(this);

		this.initialize();
	}

	render(){
		this.view = div.c("list " + this.name.replace(" ", ""), {
			bar: {
				name: div(this.name || "undefined"),
				add: div("add").click(() => this.add()),
				delete: div("delete").click(() => this.parent.remove(this))
			},
			container: div()
		});

		this.view.name = this.view.bar.name;

		this.update();

		this.view.name.on("pointerdown", this.pointerdown);
	}

	update(){
		this.view?.container.empty().append(() => {
			this.each(item => item?.render());
		});
	}


	pointerdown(e){
		document.addEventListener("pointermove", this.pointermove);
		document.addEventListener("pointerup", this.pointerup);
		this.view.ac("dragging");
		View.body().ac("drag-in-progress");
	}

	pointermove(e){

	}

	pointerup(e){
		document.removeEventListener("pointermove", this.pointermove);
		document.removeEventListener("pointerup", this.pointerup);
		this.view.rc("dragging");
		View.body().rc("drag-in-progress");
	}

	insert(item, index) {
		// Use splice to insert the item at the specified index
		this.lists.splice(index, 0, item);
		item.parent = this;
		this.update();
		return this;
	}

	remove(child){
		if (child){
			this.each((item, i) => {
				if (item === child){
					this.lists.splice(i, 1);
				}
			});
			this.update();
		} else if (this.parent){
			this.parent.remove(this);
			delete this.parent;
		}
	}

	find(fn){
		var result;
		this.each(function find(v, i){
			if (fn(v, i)){
				result = v;
				return false;
			}
		});
		return result;
	}

	each(fn){
		for (let i = 0; i < this.lists.length; i++){
			if (fn.call(this, this.lists[i], i) === false)
				return this; // return false to stop early
		}
		return this;
	}

	add(item){
		if (!item){
			item = new this.constructor({ 
				name: "item" + this.lists.length 
			});
		}
		item.parent = this;
		this.lists.push(item);
		this.update();
		return this;
	}

	make(n){
		for (let i = 1; i <= n; i++){
			this.add(new this.constructor({ name: "item " + i }));
		}
		return this;
	}
}