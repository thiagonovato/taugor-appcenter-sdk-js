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

var User = require('./User')["default"];

var Permission = require('./Permission')["default"];

var PermissionReference = require('../shapes').permissionReference;
/**
 * @type Group
 * @property {string} name
 * @property {string} description
 * @property {array<string>} tag
 * @property {array<User>} members
 * @property {array<PermissionReference>} permissions
 * @property {string} createdBy
 * @property {date} creationDate
 */


var Group =
/*#__PURE__*/
function (_ModelBase) {
  _inherits(Group, _ModelBase);

  function Group() {
    var _this;

    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Group);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Group).call(this, 'group'));
    _this.$fieldConfig = {
      name: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'name').isOfType().notEmpty().notNull().isValid();
        }
      },
      description: {
        type: FieldTypes.String,
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'description').isOfType().notEmpty().notNull().isValid();
        }
      },
      tag: {
        type: FieldTypes.ArrayOf(FieldTypes.String),
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'tag').isOfType().notEmpty().notNull().isValid();
        }
      },
      members: {
        type: FieldTypes.ArrayOf(User),
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'members').isOfType().notEmpty().notNull().isValid();
        }
      },
      permissions: {
        type: FieldTypes.ArrayOf(Permission),
        //TODO: implement final saving format
        saveAs: function saveAs(model) {
          return new PermissionReference(model);
        },
        validate: function validate() {
          return validator(_assertThisInitialized(_this), 'permissions').isOfType().notEmpty().notNull().isValid();
        }
      }
    };

    _this.$fill(properties);

    return _this;
  }

  return Group;
}(ModelBase);

exports["default"] = Group;