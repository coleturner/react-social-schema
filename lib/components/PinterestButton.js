'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BaseButton = require('./BaseButton');

var _BaseButton2 = _interopRequireDefault(_BaseButton);

var _Pinterest = require('./Icons/Pinterest');

var _Pinterest2 = _interopRequireDefault(_Pinterest);

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _selectors = require('../selectors');

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PinterestButton = function (_React$PureComponent) {
  (0, _inherits3.default)(PinterestButton, _React$PureComponent);

  function PinterestButton() {
    (0, _classCallCheck3.default)(this, PinterestButton);
    return (0, _possibleConstructorReturn3.default)(this, (PinterestButton.__proto__ || (0, _getPrototypeOf2.default)(PinterestButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(PinterestButton, [{
    key: 'getSchema',
    value: function getSchema() {
      return 'schema' in this.props ? this.props.schema : this.context.schema;
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var url = new URL('https://pinterest.com/pin/create/button');
      url.searchParams.set('description', (0, _selectors.getTitleAttribute)(this.getSchema()));
      url.searchParams.set('url', (0, _selectors.getURLAttribute)(this.getSchema()));

      var image = (0, _selectors.getImageAttribute)(this.getSchema());
      if (image) {
        url.searchParams.set('media', image.url);
      }

      (0, _popup2.default)(url.toString());
    }
  }, {
    key: 'getCount',
    value: function getCount() {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        var url = (0, _selectors.getURLAttribute)(_this2.getSchema());
        var requestURL = new URL('https://api.pinterest.com/v1/urls/count.json');
        requestURL.searchParams.set('url', url);

        try {
          (0, _jsonp2.default)(url.toString(), function (err, data) {
            if (!err && !!data && 'count' in data) {
              resolve(data.count);
            } else {
              throw new Error('Failed to get Pinterest count...');
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['children']);


      return _react2.default.createElement(
        _BaseButton2.default,
        (0, _extends3.default)({
          onClick: this.onClick,
          getCount: this.getCount
        }, otherProps),
        children
      );
    }
  }]);
  return PinterestButton;
}(_react2.default.PureComponent);

PinterestButton.propTypes = {
  children: _propTypes2.default.node.isRequired,
  count: _propTypes2.default.number,
  fetchTimeoutMS: _propTypes2.default.number,
  schema: _propTypes2.default.object
};
PinterestButton.defaultProps = {
  buttonComponent: 'button',
  countComponent: 'span',
  children: _react2.default.createElement(_Pinterest2.default, null),
  className: 'pinterest',
  count: null,
  fetchTimeoutMS: 3600 * 1000
};
PinterestButton.contextTypes = {
  schema: _propTypes2.default.object
};
exports.default = PinterestButton;