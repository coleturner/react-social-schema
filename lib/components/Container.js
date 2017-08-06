'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var Container = function (_React$PureComponent) {
  (0, _inherits3.default)(Container, _React$PureComponent);

  function Container() {
    (0, _classCallCheck3.default)(this, Container);
    return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).apply(this, arguments));
  }

  (0, _createClass3.default)(Container, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        schema: this.props.schema
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          Component = _props.thisComponent,
          schema = _props.schema,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'thisComponent', 'schema']);


      var obj = { __html: (0, _stringify2.default)(schema) };
      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({ className: (0, _classnames2.default)(className) }, otherProps),
        _react2.default.createElement('script', { type: 'application/ld+json', dangerouslySetInnerHTML: obj }),
        children
      );
    }
  }]);
  return Container;
}(_react2.default.PureComponent);

Container.propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.any,
  schema: _propTypes2.default.shape({
    '@context': _propTypes2.default.string.isRequired,
    '@type': _propTypes2.default.string.isRequired,
    'name': _propTypes2.default.string,
    'sameAs': _propTypes2.default.array
  }),
  thisComponent: _propTypes2.default.string
};
Container.defaultProps = {
  classNames: 'share-actions',
  thisComponent: 'div'
};
Container.childContextTypes = {
  schema: _propTypes2.default.object
};
exports.default = Container;