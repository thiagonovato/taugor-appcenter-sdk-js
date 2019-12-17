import BasicApi from "@basic";

class User extends BasicApi {
	constructor() {
		super({ basePath: "/user" });
	}
}

export default User;
