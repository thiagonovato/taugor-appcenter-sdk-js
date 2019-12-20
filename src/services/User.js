import BasicApi from "@basic";

class User extends BasicApi {
	constructor() {
		super({ basePath: "/user" });
		this.groups = {
			list: function({ user, company }) {
				if (company) {
					return this._rest.get(
						`/${user}/groupsByCompany/${
							company === true ? "" : company
						}`
					);
				}
				return this._rest.get(`/${user}/groups`);
			}
		};
	}
}

export default User;
