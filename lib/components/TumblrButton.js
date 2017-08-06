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

var _Tumblr = require('./Icons/Tumblr');

var _Tumblr2 = _interopRequireDefault(_Tumblr);

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _selectors = require('../selectors');

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TumblrButton = function (_React$PureComponent) {
  (0, _inherits3.default)(TumblrButton, _React$PureComponent);

  function TumblrButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TumblrButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TumblrButton.__proto__ || (0, _getPrototypeOf2.default)(TumblrButton)).call.apply(_ref, [this].concat(args))), _this), _this.getCount = function () {
      return new _promise2.default(function (resolve, reject) {
        var url = (0, _selectors.getURLAttribute)(_this.getSchema());
        var requestURL = new URL('http://api.tumblr.com/v2/share/stats');
        requestURL.searchParams.set('url', url);

        try {
          (0, _jsonp2.default)(url.toString(), function (err, data) {
            if (!err && !!data && 'response' in data && 'note_count' in data.response) {
              _this.setCount(data.response.note_count);
            } else {
              throw new Error('Failed to get Tumblr count...');
            }
          });
        } catch (e) {
          reject(_this.state.count);
        }
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TumblrButton, [{
    key: 'getSchema',
    value: function getSchema() {
      return 'schema' in this.props ? this.props.schema : this.context.schema;
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var url = new URL('https://www.tumblr.com/widgets/share/tool?posttype=photo');
      url.searchParams.set('title', (0, _selectors.getTitleAttribute)(this.getSchema()));
      url.searchParams.set('caption', (0, _selectors.getBodyAttribute)(this.getSchema()));
      url.searchParams.set('canonicalUrl', (0, _selectors.getURLAttribute)(this.getSchema()));

      var image = (0, _selectors.getImageAttribute)(this.getSchema());
      if (image) {
        url.searchParams.set('content', image.url);
      }

      (0, _popup2.default)(url.toString());
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
  return TumblrButton;
}(_react2.default.PureComponent);

TumblrButton.propTypes = {
  children: _propTypes2.default.node.isRequired,
  count: _propTypes2.default.number,
  fetchTimeoutMS: _propTypes2.default.number,
  schema: _propTypes2.default.object
};
TumblrButton.defaultProps = {
  buttonComponent: 'button',
  countComponent: 'span',
  children: _react2.default.createElement(_Tumblr2.default, null),
  className: 'tumblr',
  count: null,
  fetchTimeoutMS: 3600 * 1000
};
TumblrButton.contextTypes = {
  schema: _propTypes2.default.object
};
exports.default = TumblrButton;