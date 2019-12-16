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
 * @type LocationAddress
 * @property {FieldTypes.String} line1
 * @property {FieldTypes.String} line2
 * @property {FieldTypes.String} postalCode
 * @property {FieldTypes.String} city
 * @property {FieldTypes.String} country
 */

var LocationAddress =
/*#__PURE__*/
function (_ShapeBase) {
  _inherits(LocationAddress, _ShapeBase);

  function LocationAddress() {
    var _this;

    _classCallCheck(this, LocationAddress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocationAddress).call(this));
    _this.line1 = '';
    _this.line2 = '';
    _this.postalCode = '';
    _this.city = '';
    _this.country = '';
    _this.$fieldConfig = {
      line1: {
        type: FieldTypes.String,
        minLength: 2,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'line1').isOfType().minLength().notEmpty().notNull().isValid();
        }
      },
      line2: {
        type: FieldTypes.String,
        validate: function validate() {
          return true;
        }
      },
      postalCode: {
        type: FieldTypes.String,
        minLength: 3,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'postalCode').isOfType().minLength().notEmpty().notNull().isValid();
        }
      },
      city: {
        type: FieldTypes.String,
        minLength: 3,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'city').isOfType().minLength().notEmpty().notNull().isValid();
        }
      },
      country: {
        type: FieldTypes.String,
        minLength: 3,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'country').isOfType().minLength().notEmpty().notNull().isValid();
        }
      }
    };
    return _this;
  }

  return LocationAddress;
}(ShapeBase);

module.exports = LocationAddress;