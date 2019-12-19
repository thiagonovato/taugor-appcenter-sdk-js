import BasicApi from "@basic";

class Group extends BasicApi {
	constructor() {
		super({ basePath: "/group" });
	}
}
Group.prototype.members = {
	list: ({ group }) => {
		return this._rest.get(`/${group}/members`);
	}
};

export default Group;
