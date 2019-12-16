"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var omj = require('@zerobytes/object-model-js');

var ModelBase = omj.ModelBase;
var FieldTypes = omj.FieldTypes;
var validator = omj.Validator;

var Company = require('./Company')["default"],
    Group = require('./Group')["default"],
    Permission = require('./Permission')["default"];

var shapes = require('../shapes');
/**
 * @type User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} provider
 * @property {array<any>} addresses
 * @property {string} birthdate
 * @property {string} email
 * @property {string} phone
 * @property {string} phoneArea
 * @property {string} phoneCountry
 * @property {string} taxDocument
 * @property {number} followersCount
 * @property {number} followingCount
 * @property {number} postsCount
 * @property {string} bio
 * @property {number} temporaryBalance
 * @property {string} createdBy
 * @property {date} creationDate
 */


var User =
/*#__PURE__*/
function (_ModelBase) {
  _inherits(User, _ModelBase);

  function User() {
    var _this;

    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, User);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(User).call(this, 'user'));
    _this.$fieldConfig = {
      firstName: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'firstName').isOfType().notEmpty().notNull().isValid();
        }
      },
      lastName: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'lastName').isOfType().notEmpty().notNull().isValid();
        }
      },
      provider: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'provider').isOfType().notEmpty().notNull().isValid();
        }
      },
      addresses: {
        type: FieldTypes.ArrayOf(FieldTypes.ShapedAs(shapes.locationAddress)),
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'addresses').isOfType().notNull().notEmpty().isValid();
        }
      },
      birthdate: {
        type: FieldTypes.Date,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'provider').isOfType().notEmpty().notNull().isValid();
        }
      },
      email: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'email').isOfType().notEmpty().notNull().email().isValid();
        }
      },
      phoneCountry: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'phoneCountry').isOfType().isValid();
        }
      },
      phoneArea: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'phoneArea').isOfType().isValid();
        }
      },
      phone: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'phone').isOfType().notEmpty().notNull().isValid();
        }
      },
      taxDocument: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'taxDocument').isOfType().isValid();
        }
      },
      companies: {
        type: FieldTypes.ArrayOf(FieldTypes.IdOf(Company)),
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'companies').isOfType().isValid();
        }
      },
      groups: {
        type: FieldTypes.ArrayOf(FieldTypes.IdOf(Group)),
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'groups').isOfType().isValid();
        }
      },
      permissions: {
        type: FieldTypes.ArrayOf(FieldTypes.IdOf(Permission)),
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'permissions').isOfType().isValid();
        }
      }
    };

    _this.$fill(properties);

    return _this;
  }

  return User;
}(ModelBase);

exports["default"] = User;