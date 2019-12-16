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

var Company = require('./Company')["default"];

var shapes = require('../shapes');
/**
 * @type App
 * @property {string} name
 * @property {string} description
 * @property {string} mainUrl
 * @property {string[]} companies
 * @property {string} createdBy
 * @property {date} creationDate
 */


var App =
/*#__PURE__*/
function (_ModelBase) {
  _inherits(App, _ModelBase);

  function App() {
    var _this;

    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, 'company'));

    try {
      _this.$fieldConfig = {
        name: {
          type: FieldTypes.String,
          minLength: 2,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'name').isOfType().minLength().notEmpty().notNull().isValid();
          }
        },
        description: {
          type: FieldTypes.String,
          minLength: 4,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'description').isOfType().minLength().isValid();
          }
        },
        mainUrl: {
          type: FieldTypes.String,
          minLengh: 6,
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'mainUrl').isOfType().notEmpty().notNull().minLength().isValid();
          }
        },
        companies: {
          type: FieldTypes.ArrayOf(FieldTypes.IdOf(Company)),
          validate: function validate() {
            return validator(_assertThisInitialized(_this), 'companies').isOfType().isValid();
          }
        }
      };
    } catch (e) {
      console.log(e);
    }

    _this.$fill(properties);

    return _this;
  }

  return App;
}(ModelBase);

exports["default"] = App;