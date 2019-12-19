import BasicApi from "@basic";

class Company extends BasicApi {
	constructor() {
		super({ basePath: "/company" });
	}
}

Company.prototype.groups = {
	list: ({ company }) => {
		return this._rest.get(`/${company}/groups`);
	}
};
export default Company;
