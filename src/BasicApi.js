import { _post, _get, _put, _delete } from "./functions.js";
import AuthService from "@services/Auth";

const BasicApi = function({ basePath }) {
	this._rest = {
		post: (path, data) =>
			_post(basePath + path, data, AuthService.token.current()).then(
				r => r.data
			),
		put: (path, data) =>
			_put(basePath + path, data, AuthService.token.current()).then(
				r => r.data
			),
		delete: (path, data) =>
			_delete(basePath + path, data, AuthService.token.current()).then(
				r => r.data
			),
		get: (path, params) =>
			_get(basePath + path, params, AuthService.token.current()).then(
				r => r.data
			)
	};
	this.get = function(id) {
		return this._rest.get(`/${id}`);
	};
	this.create = function(props) {
		return this._rest.post("", props);
	};
	this.update = function(id, props) {
		return this._rest.put(`/${id}`, props);
	};
	this.list = function(filters) {
		return this._rest.get("");
	};
	this.delete = function(id) {
		return this._rest.delete(`/${id}`);
	};
	return this;
};

export default BasicApi;
