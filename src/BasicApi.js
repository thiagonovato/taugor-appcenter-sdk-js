import { _request } from "./functions.js";
const BasicApi = function({ uri }) {
	const private = {};
	this.get = function(id) {};
	this.create = function(props) {};
	this.update = function(id, props) {};
	this.list = function(filters) {};
	this.delete = function(id) {};
	return this;
};

export default BasicApi;
