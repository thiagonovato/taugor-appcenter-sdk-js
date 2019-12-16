"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var omj = require('@zerobytes/object-model-js');

var FieldTypes = omj.FieldTypes;
var validator = omj.Validator;
var ShapeBase = omj.ShapeBase;
/**
 * @type ContactPerson
 * @property {FieldTypes.String} name
 * @property {FieldTypes.String} phoneNumber
 * @property {FieldTypes.String} email
 * @property {FieldTypes.String} address
 * @property {FieldTypes.String} website
 */

var ContactPerson =
/*#__PURE__*/
function (_ShapeBase) {
  _inherits(ContactPerson, _ShapeBase);

  function ContactPerson() {
    var _this;

    _classCallCheck(this, ContactPerson);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactPerson).call(this));
    _this.name = '';
    _this.phoneNumber = '';
    _this.email = '';
    _this.address = '';
    _this.website = '';
    _this.$fieldConfig = {
      name: {
        type: FieldTypes.String,
        minLength: 3,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'name').isOfType().minLength().notEmpty().notNull().isValid();
        }
      },
      phoneNumber: {
        type: FieldTypes.String,
        minLength: 8,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'phoneNumber').isOfType().minLength().notEmpty().notNull().isValid();
        }
      },
      email: {
        type: FieldTypes.String,
        minLength: 10,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'email').isOfType().minLength().email().notEmpty().notNull().isValid();
        }
      },
      address: {
        type: FieldTypes.String,
        minLength: 10,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'address').isOfType().minLength().notEmpty().notNull().isValid();
        }
      },
      website: {
        type: FieldTypes.String,
        minLength: 3,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'website').isOfType().website().isValid();
        }
      }
    };
    return _this;
  }

  return ContactPerson;
}(ShapeBase);

module.exports = ContactPerson;