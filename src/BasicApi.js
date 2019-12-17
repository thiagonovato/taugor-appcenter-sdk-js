import { _post, _get, _put, _delete } from "./functions.js";
import AuthService from "@services/Auth";

const BasicApi = function({ basePath }) {
	const _private = {
		post: (path, data) =>
			_post(basePath + path, data, AuthService.token.current()),
		put: (path, data) =>
			_put(basePath + path, data, AuthService.token.current()),
		delete: (path, data) =>
			_delete(basePath + path, data, AuthService.token.current()),
		get: (path, params) =>
			_get(basePath + path, params, AuthService.token.current())
	};
	this.get = function(id) {
		return _private.get(`/${id}`);
	};
	this.create = function(props) {
		return _private.post("", props);
	};
	this.update = function(id, props) {
		return _private.put(`/${id}`, props);
	};
	this.list = function(filters) {
		return _private.get("");
	};
	this.delete = function(id) {
		return _private.delete(`/${id}`);
	};
	return this;
};

export default BasicApi;
