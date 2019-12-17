import BasicApi from "@basic";

class Permission extends BasicApi {
	constructor() {
		super({ basePath: "/permission" });
	}
}

export default Permission;
