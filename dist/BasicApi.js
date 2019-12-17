"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("./functions.js");

var _Auth = _interopRequireDefault(require("@sevices/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BasicApi = function BasicApi(_ref) {
  var basePath = _ref.basePath;
  var _private = {
    post: function post(path, data) {
      return (0, _functions._post)(basePath + path, data, _Auth["default"].token.current());
    },
    put: function put(path, data) {
      return (0, _functions._put)(basePath + path, data, _Auth["default"].token.current());
    },
    "delete": function _delete(path, data) {
      return (0, _functions._delete)(basePath + path, data, _Auth["default"].token.current());
    },
    get: function get(path, params) {
      return (0, _functions._get)(basePath + path, params, _Auth["default"].token.current());
    }
  };

  this.get = function (id) {
    return _private.get("/".concat(id));
  };

  this.create = function (props) {
    return _private.post("", props);
  };

  this.update = function (id, props) {
    return _private.put("/".concat(id), props);
  };

  this.list = function (filters) {
    return _private.get("");
  };

  this["delete"] = function (id) {
    return _private["delete"]("/".concat(id));
  };

  return this;
};

var _default = BasicApi;
exports["default"] = _default;