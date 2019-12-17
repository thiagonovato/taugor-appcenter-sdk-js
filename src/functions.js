import axios from "@axios";
const _request = (path, mode, params, data, authorization) => {
	let uriString = path;
	let p = [];
	Object.keys(params || {}).map(param => {
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
	if (mode === "get" || mode === "delete") {
		return axios[mode](uriString, config);
	} else {
		return axios[mode](uriString, data, config);
	}
};
const _post = (path, data, authorization) => {
	return _request(path, "post", null, data, authorization);
};
const _put = (path, data, authorization) => {
	return _request(path, "put", null, data, authorization);
};
const _delete = (path, authorization) => {
	return _request(path, "delete", null, null, authorization);
};
const _get = (path, params, authorization) => {
	return _request(path, "get", params, null, authorization);
};

export { _request, _post, _get, _put, _delete };
