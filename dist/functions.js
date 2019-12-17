"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._get = exports._post = exports._request = void 0;

var _axiosConfig = _interopRequireDefault(require("../axios-config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _request = function _request(path, mode, params, data) {
  var uriString = path;
  var p = [];
  Object.keys(params).map(function (param) {
    p.push(encodeURIComponent("".concat(param, "=").concat(params[param])));
  });

  if (uriString.endsWith("/")) {
    uriString = uriString.slice(0, -1);
  }

  uriString += p.join("&");
  return _axiosConfig["default"][mode](uriString, data);
};

exports._request = _request;

var _post = function _post(path, data) {
  return _request(path, "post", {}, data);
};

exports._post = _post;

var _get = function _get(path, params) {
  return _request(path, "get", params, {});
};

exports._get = _get;