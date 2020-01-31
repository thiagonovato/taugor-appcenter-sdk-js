"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../functions.js");

var _localExecutionToken = '';

var Auth = function Auth() {
  var $tokenKey = 'auth-token';
  var _private = {
    post: function post(path, data) {
      return (0, _functions._post)('/auth' + path, data);
    },
    get: function get(path, params) {
      return (0, _functions._get)('/auth' + path, params);
    },
    "delete": function _delete(path, params) {
      return (0, _functions._delete)('/auth' + path);
    },
    setToken: function setToken(token) {
      if (typeof localStorage === 'undefined') {
        _localExecutionToken = token;
        return;
      }

      localStorage.setItem($tokenKey, token);
    },
    getToken: function getToken() {
      if (typeof localStorage === 'undefined') return _localExecutionToken;
      return localStorage.getItem($tokenKey);
    }
  };
  var service = {
    //TODO: add logout method
    logout: function logout() {
      return _private["delete"]('', _private.getToken());
    },
    authenticate: function authenticate(user, password, fromApp) {
      return _private.post('', {
        user: user,
        password: password,
        fromApp: fromApp
      }).then(function (r) {
        _private.setToken(r.headers.authorization);

        return {
          user: r.data,
          token: r.headers.authorization
        };
      });
    },
    token: {
      current: function current(token) {
        if (token === undefined) {
          return _private.getToken();
        }

        _private.setToken(token);
      }
    }
  };
  return service;
};

var _default = Auth();

exports["default"] = _default;