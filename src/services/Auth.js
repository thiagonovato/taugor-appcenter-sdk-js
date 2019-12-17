import { _post, _get } from "../functions.js";

const Auth = () => {
	const $tokenKey = "auth-token";
	const _private = {
		post: (path, data) => _post("/auth" + path, data),
		get: (path, params) => _get("/auth" + path, params),
		saveToken: token => {
			localStorage.setItem($tokenKey, token);
		},
		getToken: () => {
			return localStorage.getItem($tokenKey);
		}
	};
	let service = {
		authenticate: (user, password, fromApp) => {
			return _private
				.post("", {
					user,
					password,
					fromApp
				})
				.then(r => {
					return r.data;
				});
		},
		token: {
			current: () => _private.getToken()
		}
	};
	return service;
};

export default Auth();
