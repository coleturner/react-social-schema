'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = function () {
  function Schema() {
    (0, _classCallCheck3.default)(this, Schema);
  }

  (0, _createClass3.default)(Schema, null, [{
    key: 'findObjectByType',
    value: function findObjectByType(schema, type) {
      var _this = this;

      if ((typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === 'object' && '@type' in schema && schema['@type'] === type) {
        return schema;
      } else if ((typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === 'object') {
        return (0, _values2.default)(schema).find(function (a) {
          return _this.constructor.findObjectByType(a, type);
        });
      } else if (Array.isArray(schema)) {
        return schema.find(function (a) {
          return _this.constructor.findObjectByType(a, type);
        });
      }

      return null;
    }
  }]);
  return Schema;
}();

exports.default = Schema;