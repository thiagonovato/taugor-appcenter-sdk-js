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

export { _request };
