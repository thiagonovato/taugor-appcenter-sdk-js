import BasicApi from "@basic";

class Company extends BasicApi {
	constructor() {
		super({ basePath: "/company" });
		const self = this;
		this.groups = {
			list: function({ company }) {
				return self._rest.get(`/${company}/groups`);
			}
		};
	}
}

export default Company;
