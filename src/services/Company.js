import BasicApi from "@basic";

class Company extends BasicApi {
	constructor() {
		super({ basePath: "/company" });
	}
}

export default Company;
