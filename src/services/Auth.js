import { _post, _get } from "../functions.js";

const _localExecutionToken = "";

const Auth = () => {
	const $tokenKey = "auth-token";
	const _private = {
		post: (path, data) => _post("/auth" + path, data),
		get: (path, params) => _get("/auth" + path, params),
		setToken: token => {
			if (!localStorage) {
				_localExecutionToken = token;
				return;
			}

			localStorage.setItem($tokenKey, token);
		},
		getToken: () => {
			if (!localStorage) return _localExecutionToken;
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
