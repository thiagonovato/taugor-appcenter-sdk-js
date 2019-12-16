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
 * @type PermissionReference
 * @property {FieldTypes.String} uid
 * @property {FieldTypes.Boolean} active
 */

var PermissionReference =
/*#__PURE__*/
function (_ShapeBase) {
  _inherits(PermissionReference, _ShapeBase);

  function PermissionReference() {
    var _this;

    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, PermissionReference);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PermissionReference).call(this));
    _this.uid = '';
    _this.active = true;
    _this.$fieldConfig = {
      uid: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'uid').isOfType().notNull().notEmpty().isValid();
        }
      },
      active: {
        type: FieldTypes.Boolean,
        defaultValue: true,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'active').isOfType().isValid();
        }
      }
    };

    _this.$fill(properties);

    return _this;
  }

  return PermissionReference;
}(ShapeBase);

module.exports = PermissionReference;