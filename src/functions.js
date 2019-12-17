import axios from "@axios";
const _request = (path, mode, params, data) => {
	let uriString = path;
	let p = [];
	Object.keys(params).map(param => {
		p.push(encodeURIComponent(`${param}=${params[param]}`));
	});
	if (uriString.endsWith("/")) {
		uriString = uriString.slice(0, -1);
	}
	uriString += p.join("&");
	return axios[mode](uriString, data);
};
const _post = (path, data) => {
	return _request(path, "post", {}, data);
};
const _get = (path, params) => {
	return _request(path, "get", params, {});
};

export { _request, _post, _get };
