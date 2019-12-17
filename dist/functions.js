"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._delete = exports._put = exports._get = exports._post = exports._request = void 0;

var _axiosConfig = _interopRequireDefault(require("./axios-config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _request = function _request(path, mode, params, data, authorization) {
  var uriString = path;
  var p = [];
  Object.keys(params).map(function (param) {
    p.push(encodeURIComponent("".concat(param, "=").concat(params[param])));
  });

  if (uriString.endsWith("/")) {
    uriString = uriString.slice(0, -1);
  }

  uriString += p.join("&");
  var config = {};

  if (authorization) {
    config.headers = {
      Authorization: authorization
    };
  }

  return _axiosConfig["default"][mode](uriString, data, config);
};

exports._request = _request;

var _post = function _post(path, data, authorization) {
  return _request(path, "post", {}, data, authorization);
};

exports._post = _post;

var _put = function _put(path, data, authorization) {
  return _request(path, "put", {}, data, authorization);
};

exports._put = _put;

var _delete = function _delete(path, data, authorization) {
  return _request(path, "delete", {}, data, authorization);
};

exports._delete = _delete;

var _get = function _get(path, params, authorization) {
  return _request(path, "get", params, {}, authorization);
};

exports._get = _get;