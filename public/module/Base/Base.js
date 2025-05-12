export default class Base {
	constructor(...args){
		this.instantiate(...args);
	}

	instantiate(...args){
		// this.name = this.constructor.name.toLowerCase();
		// this.type = this.constructor.name;
		this.assign(...args);
		this.initialize();
	}

	initialize(){}

	assign(...args){
		return Object.assign(this, ...args);
	}
}