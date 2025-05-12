import Base from "/module/Base/Base.js";
import { el, div, View, h1, h2, h3, p, is } from "/module/View/View.js";

export default class FileSystem extends Base {
	load(files){
		this.files = [];
		this.dirs = [];
		for (const file of files){
			if (file.type === "file"){
				this.files.push(new File(file, { file_system: this }));
			} else {
				this.dirs.push(new Dir(file, { file_system: this }));
			}
		}

		this.build();
	}

	build(){
		// do dirs first, so they're ready
		// but, we might have to do this a few times?
		for (const dir of this.dirs){

		}
	}

	find_root_dir(){
		
	}

	render(){

		div.c("file-system", () => {
			div.c("sidebar", () => {
				for (const dir of this.dirs){
					dir.label();
				}

				for (const file of this.files){
					file.label();
				}
			})
		})
	}
}

class File extends Base {
	initialize(){
		if (this.path !== "./"){
			this.parts = this.path.split("/");
		}
	}
	label(){
		div.c("file label", this.name);
	}
}

class Dir extends File {
	children = [];

	label(){
		div.c("dir label", this.name);
	}

	add(file){ // file or dir
		if (this.is_parent_to(file)){
			this.children.push(file);
			file.parent = this;
		}
	}

	is_parent_to(file){
		return file.path == this.full;
	}
}