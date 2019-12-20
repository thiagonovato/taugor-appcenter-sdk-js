import BasicApi from "@basic";

class User extends BasicApi {
	constructor() {
		super({ basePath: "/user" });
		const self = this;
		this.groups = {
			list: function({ user, company }) {
				if (company) {
					return self._rest.get(
						`/${user}/groupsByCompany/${
							company === true ? "" : company
						}`
					);
				}
				return self._rest.get(`/${user}/groups`);
			}
		};
	}
}

export default User;
