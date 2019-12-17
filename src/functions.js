import axios from "@axios";
const _request = (path, mode, params, data, authorization) => {
	let uriString = path;
	let p = [];
	Object.keys(params).map(param => {
		p.push(encodeURIComponent(`${param}=${params[param]}`));
	});
	if (uriString.endsWith("/")) {
		uriString = uriString.slice(0, -1);
	}
	uriString += p.join("&");
	const config = {};
	if (authorization) {
		config.headers = { Authorization: authorization };
	}
	return axios[mode](uriString, data, config);
};
const _post = (path, data, authorization) => {
	return _request(path, "post", {}, data, authorization);
};
const _put = (path, data, authorization) => {
	return _request(path, "put", {}, data, authorization);
};
const _delete = (path, data, authorization) => {
	return _request(path, "delete", {}, data, authorization);
};
const _get = (path, params, authorization) => {
	return _request(path, "get", params, {}, authorization);
};

export { _request, _post, _get, _put, _delete };
