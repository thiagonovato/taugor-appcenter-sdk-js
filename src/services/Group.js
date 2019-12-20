import BasicApi from "@basic";

class Group extends BasicApi {
	constructor() {
		super({ basePath: "/group" });
		const self = this;
		this.members = {
			list: function({ group }) {
				return self._rest.get(`/${group}/members`);
			}
		};
	}
}

export default Group;
