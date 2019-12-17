"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../functions.js");

var Auth = function Auth() {
  var $tokenKey = "auth-token";
  var _private = {
    post: function post(path, data) {
      return (0, _functions._post)("/auth" + path, data);
    },
    get: function get(path, params) {
      return (0, _functions._get)("/auth" + path, params);
    },
    saveToken: function saveToken(token) {
      localStorage.setItem($tokenKey, token);
    },
    getToken: function getToken() {
      return localStorage.getItem($tokenKey);
    }
  };
  var service = {
    authenticate: function authenticate(user, password, fromApp) {
      return _private.post("", {
        user: user,
        password: password,
        fromApp: fromApp
      }).then(function (r) {
        return r.data;
      });
    },
    token: {
      current: function current() {
        return _private.getToken();
      }
    }
  };
  return service;
};

var _default = Auth();

exports["default"] = _default;