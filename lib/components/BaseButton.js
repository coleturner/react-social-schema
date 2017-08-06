'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseButton = function (_React$PureComponent) {
  (0, _inherits3.default)(BaseButton, _React$PureComponent);

  function BaseButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BaseButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BaseButton.__proto__ || (0, _getPrototypeOf2.default)(BaseButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = { lastFetch: null, count: null }, _this.updateInterval = null, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BaseButton, [{
    key: 'setCount',
    value: function setCount(count) {
      if ('count' in this.props && this.props.count !== null) {
        return null;
      }

      return this.setState({ count: count, lastFetch: new Date().getTime() });
    }
  }, {
    key: 'getCount',
    value: function getCount() {
      if ('count' in this.props && this.props.count !== null) {
        return this.props.count;
      }

      if (this.state.count !== null && this.state.lastFetch + this.props.fetchTimeoutMS > new Date().getTime()) {
        return this.state.count;
      }

      this.props.getCount().then(this.setCount).catch(function (e) {
        console.warn('Error while fetching count: ' + e);
      });

      return this.state.count;
    }
  }, {
    key: 'countNode',
    value: function countNode() {
      if (this.props.count === null) {
        return null;
      }

      var Component = this.props.countComponent;


      return _react2.default.createElement(
        Component,
        { className: 'count' },
        this.getCount()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.buttonComponent,
          children = _props.children,
          className = _props.className,
          count = _props.count,
          countComponent = _props.countComponent,
          fetchTimeoutMS = _props.fetchTimeoutMS,
          schema = _props.schema,
          twitterID = _props.twitterID,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['buttonComponent', 'children', 'className', 'count', 'countComponent', 'fetchTimeoutMS', 'schema', 'twitterID']);


      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({
          onClick: this.props.onClick,
          className: (0, _classnames2.default)('share-button', className)
        }, otherProps),
        children,
        this.countNode()
      );
    }
  }]);
  return BaseButton;
}(_react2.default.PureComponent);

BaseButton.propTypes = {
  buttonComponent: _propTypes2.default.string,
  className: _propTypes2.default.any,
  children: _propTypes2.default.node,
  countComponent: _propTypes2.default.string,
  count: _propTypes2.default.number,
  getCount: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  fetchTimeoutMS: _propTypes2.default.number,
  schema: _propTypes2.default.object,
  twitterID: _propTypes2.default.number
};
BaseButton.contextTypes = {
  attachToContainer: _propTypes2.default.func,
  schema: _propTypes2.default.object
};
exports.default = BaseButton;