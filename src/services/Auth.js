import { _post, _get } from "../functions.js";

const Auth = () => {
	const $tokenKey = "auth-token";
	const _private = {
		post: (path, data) => _post("/auth" + path, data),
		get: (path, params) => _get("/auth" + path, params),
		setToken: token => {
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
					_private.setToken(r.headers.authorization);
					return {
						user: r.data,
						token: r.headers.authorization
					};
				});
		},
		token: {
			current: token => {
				if (token === undefined) {
					return _private.getToken();
				}
				_private.setToken(token);
			}
		}
	};
	return service;
};

export default Auth();
