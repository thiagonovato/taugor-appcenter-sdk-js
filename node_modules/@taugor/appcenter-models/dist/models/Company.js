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

var Group = require('./Group')["default"],
    App = require('./App')["default"];

var shapes = require('../shapes');
/**
 * @type Company
 * @property {string} name
 * @property {string} description
 * @property {string} identificationNumber
 * @property {string} address
 * @property {string} primaryPhone
 * @property {string} secondaryPhone
 * @property {string} primaryEmail
 * @property {string} secondaryEmail
 * @property {string} website
 * @property {array}  contacts
 * @property {object} billing
 * @property {string} parent
 * @property {string} createdBy
 * @property {date} creationDate
 */


var Company =
/*#__PURE__*/
function (_ModelBase) {
  _inherits(Company, _ModelBase);

  function Company() {
    var _this;

    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Company);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Company).call(this, 'company'));

    try {
      _this.$fieldConfig = {
        name: {
          type: FieldTypes.String,
          minLength: 3,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'name').isOfType().minLength().notEmpty().notNull().isValid();
          }
        },
        description: {
          type: FieldTypes.String,
          minLength: 10,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'description').isOfType().minLength().isValid();
          }
        },
        identificationNumber: {
          type: FieldTypes.String,
          minLengh: 10,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'identificationNumber').isOfType().notEmpty().notNull().minLength().isValid();
          }
        },
        address: {
          type: FieldTypes.String,
          minLengh: 10,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'address').isOfType().notEmpty().notNull().minLength().isValid();
          }
        },
        primaryPhone: {
          type: FieldTypes.String,
          minLength: 8,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'primaryPhone').isOfType().notEmpty().notNull().minLength().isValid();
          }
        },
        secondaryPhone: {
          type: FieldTypes.String,
          minLength: 8,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'secondaryPhone').isOfType().minLength().isValid();
          }
        },
        primaryEmail: {
          type: FieldTypes.String,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'primaryEmail').isOfType().email().notEmpty().notNull().minLength().isValid();
          }
        },
        secondaryEmail: {
          type: FieldTypes.String,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'secondaryEmail').isOfType().email().minLength().isValid();
          }
        },
        website: {
          type: FieldTypes.String,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'website').isOfType().website().minLength().isValid();
          }
        },
        contacts: {
          type: FieldTypes.ArrayOf(FieldTypes.ShapedAs(shapes.contactPerson)),
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'contacts').isOfType().notEmpty().notNull().isValid();
          }
        },
        billing: {
          type: FieldTypes.ShapedAs(shapes.billing),
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'billing').isOfType().notEmpty().notNull().isValid();
          }
        },
        parent: {
          type: FieldTypes.IdOf(Company),
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'parent').isOfType().isValid();
          }
        },
        groups: {
          type: FieldTypes.ArrayOf(FieldTypes.IdOf(Group)),
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'groups').isOfType().isValid();
          }
        },
        apps: {
          type: FieldTypes.ArrayOf(FieldTypes.IdOf(App)),
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'apps').isOfType().isValid();
          }
        }
      };
    } catch (e) {
      console.log(e);
    }

    _this.$fill(properties);

    return _this;
  }

  return Company;
}(ModelBase);

exports["default"] = Company;