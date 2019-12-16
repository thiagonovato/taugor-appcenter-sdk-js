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
/**
 * @type Permission
 * @property {string} title
 * @property {string} description
 * @property {string} route
 * @property {boolean} active
 * @property {string} createdBy
 * @property {date} creationDate
 */

var Permission =
/*#__PURE__*/
function (_ModelBase) {
  _inherits(Permission, _ModelBase);

  function Permission() {
    var _this;

    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Permission);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Permission).call(this, 'permission'));
    _this.$fieldConfig = {
      title: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'title').isOfType().notNull().notEmpty().isValid();
        }
      },
      description: {
        type: FieldTypes.String,
        validate: function validate() {
          return true;
        }
      },
      route: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'route').isOfType().notNull().notEmpty().isValid();
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

  return Permission;
}(ModelBase);

exports["default"] = Permission;