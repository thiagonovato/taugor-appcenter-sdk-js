import BasicApi from "@basic";

class Company extends BasicApi {
	constructor() {
		super({ basePath: "/company" });
		this.groups = {
			list: function({ company }) {
				return this._rest.get(`/${company}/groups`);
			}
		};
	}
}

export default Company;
