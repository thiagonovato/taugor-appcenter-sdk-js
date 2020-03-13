import { _post, _get, _delete } from '../functions.js';

let _localExecutionToken = '';

const Auth = () => {
	const $tokenKey = 'auth-token';
	const _private = {
		post: (path, data) => _post('/auth' + path, data),
		get: (path, params) => _get('/auth' + path, params),
		delete: (path, authToken) => _delete('/auth' + path, authToken),
		removeToken: () => {
			if (typeof localStorage === 'undefined') {
				_localExecutionToken = '';
				return;
			}

			localStorage.removeItem($tokenKey);
		},
		setToken: (token) => {
			if (typeof localStorage === 'undefined') {
				_localExecutionToken = token;
				return;
			}

			localStorage.setItem($tokenKey, token);
		},
		getToken: () => {
			if (typeof localStorage === 'undefined') return _localExecutionToken;
			return localStorage.getItem($tokenKey);
		}
	};
	let service = {
		//TODO: add logout method
		logout: () => {
			return _private.delete('', _private.getToken()).catch((e) => {
				if (!!e.code && !!e.message) return Promise.reject(e);

				_private.removeToken();

				return Promise.resolve(e);
			});
		},
		authenticate: (user, password, fromApp) => {
			return _private
				.post('', {
					user,
					password,
					fromApp
				})
				.then((r) => {
					_private.setToken(r.headers.authorization);
					return {
						user: r.data,
						token: r.headers.authorization
					};
				});
		},
		token: {
			current: (token) => {
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
