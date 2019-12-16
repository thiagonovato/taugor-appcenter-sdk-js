import { _request } from "./functions.js";

const Auth = () => {
	const private = {
		post: data => {
			_request("/auth", "post", {}, data);
		},
		get: params => {
			_request("/auth", "get", params, {});
		}
	};
	let service = {
		authenticate: (user, password, fromApp) => {
			return private
				.post("/auth", {
					user,
					password,
					fromApp
				})
				.then(r => {
					return {
						user: r.data,
						response: r
					};
				});
		}
	};
	return service;
};

export default Auth;
