import BasicApi from "@basic";

class Group extends BasicApi {
	constructor() {
		super({ basePath: "/group" });
		this.members = {
			list: function({ group }) {
				return this._rest.get(`/${group}/members`);
			}
		};
	}
}

export default Group;
