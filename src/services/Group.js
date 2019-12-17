import BasicApi from "@basic";

class Group extends BasicApi {
	constructor() {
		super({ basePath: "/group" });
	}
}

export default Group;
