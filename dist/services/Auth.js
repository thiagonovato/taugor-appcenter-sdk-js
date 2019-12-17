"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("./functions.js");

var Auth = function Auth() {
  var _private = {
    post: function post(path, data) {
      return _post("/auth/" + path, data);
    },
    get: function get(path, params) {
      return _post("/auth/" + path, params);
    }
  };
  var service = {
    authenticate: function authenticate(user, password, fromApp) {
      return _private.post("/auth", {
        user: user,
        password: password,
        fromApp: fromApp
      }).then(function (r) {
        return {
          user: r.data,
          response: r
        };
      });
    }
  };
  return service;
};

var _default = Auth;
exports["default"] = _default;