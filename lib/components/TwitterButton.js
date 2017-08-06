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

var _Twitter = require('./Icons/Twitter');

var _Twitter2 = _interopRequireDefault(_Twitter);

var _selectors = require('../selectors');

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwitterButton = function (_React$PureComponent) {
  (0, _inherits3.default)(TwitterButton, _React$PureComponent);

  function TwitterButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TwitterButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TwitterButton.__proto__ || (0, _getPrototypeOf2.default)(TwitterButton)).call.apply(_ref, [this].concat(args))), _this), _this.getCount = function () {
      return new _promise2.default(function (resolve, reject) {
        reject();
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TwitterButton, [{
    key: 'getSchema',
    value: function getSchema() {
      return 'schema' in this.props ? this.props.schema : this.context.schema;
    }
  }, {
    key: 'getTwitterHandle',
    value: function getTwitterHandle() {
      if (this.props.twitterHandle) {
        return this.props.twitterHandle;
      }

      var schema = this.getSchema();
      var twitterProfile = (0, _selectors.resolveSocial)(schema, function (a) {
        return a.indexOf('twitter.com') !== -1;
      });

      if (twitterProfile) {
        try {
          var urlObject = new URL(twitterProfile);
          return urlObject.pathname.splice(1);
        } catch (e) {
          return null;
        }
      }

      return null;
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var url = new URL(this.props.tweetID ? 'https://twitter.com/intent/retweet' : 'https://twitter.com/intent/tweet');
      var twitterHandle = this.getTwitterHandle();

      if (this.props.tweetID) {
        url.searchParams.set('tweet_id', this.props.tweetID);

        if (twitterHandle) {
          url.searchParams.set('related', twitterHandle);
        }
      } else {
        url.searchParams.set('text', (0, _selectors.getTitleAttribute)(this.getSchema()));
        url.searchParams.set('url', (0, _selectors.getURLAttribute)(this.getSchema()));

        if (twitterHandle) {
          url.searchParams.set('via', twitterHandle);
        }
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
  return TwitterButton;
}(_react2.default.PureComponent);

TwitterButton.propTypes = {
  children: _propTypes2.default.node.isRequired,
  count: _propTypes2.default.number,
  twitterHandle: _propTypes2.default.string,
  tweetID: _propTypes2.default.string,
  schema: _propTypes2.default.object
};
TwitterButton.defaultProps = {
  buttonComponent: 'button',
  countComponent: 'span',
  children: _react2.default.createElement(_Twitter2.default, null),
  className: 'twitter',
  count: null,
  tweetID: null
};
TwitterButton.contextTypes = {
  schema: _propTypes2.default.object
};
exports.default = TwitterButton;