"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("./functions.js");

var _Auth = _interopRequireDefault(require("./services/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BasicApi = function BasicApi(_ref) {
  var basePath = _ref.basePath;
  this._rest = {
    post: function post(path, data) {
      return (0, _functions._post)(basePath + path, data, _Auth["default"].token.current()).then(function (r) {
        return r.data;
      });
    },
    put: function put(path, data) {
      return (0, _functions._put)(basePath + path, data, _Auth["default"].token.current()).then(function (r) {
        return r.data;
      });
    },
    "delete": function _delete(path, data) {
      return (0, _functions._delete)(basePath + path, data, _Auth["default"].token.current()).then(function (r) {
        return r.data;
      });
    },
    get: function get(path, params) {
      return (0, _functions._get)(basePath + path, params, _Auth["default"].token.current()).then(function (r) {
        return r.data;
      });
    }
  };

  this.get = function (id) {
    return this._rest.get("/".concat(id));
  };

  this.create = function (props) {
    return this._rest.post("", props);
  };

  this.update = function (id, props) {
    return this._rest.put("/".concat(id), props);
  };

  this.list = function (filters) {
    return this._rest.get("");
  };

  this["delete"] = function (id) {
    return this._rest["delete"]("/".concat(id));
  };

  return this;
};

var _default = BasicApi;
exports["default"] = _default;