export default class DirComponent extends Component {}

/*

new DirComponent({
	
});

DirComponent.dir = /module/DirComponent/?

test = new DC({ name: "test" }) -> /test/ + test.json?
test.dir = /test/
test.dir.file("new.ext")
test.dir.dir("dirname");



Sub Components:
- embed in test.json?
- add as file.json?
- add as sub DC (/sub/ and sub.json)
- add via "instances" pattern /instances/ and either thing1.json or /thing1/


Thing.dir.instances = instances dir
Thing.dir.instances.file("thing1.json");
Thing.dir.instances.dir("thing1").file("thing1.json");

*/