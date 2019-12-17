"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("./functions.js");

var BasicApi = function BasicApi(_ref) {
  var uri = _ref.uri;

  this.get = function (id) {};

  this.create = function (props) {};

  this.update = function (id, props) {};

  this.list = function (filters) {};

  this["delete"] = function (id) {};

  return this;
};

var _default = BasicApi;
exports["default"] = _default;