'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Facebook = require('./Facebook');

var _Facebook2 = _interopRequireDefault(_Facebook);

var _Pinterest = require('./Pinterest');

var _Pinterest2 = _interopRequireDefault(_Pinterest);

var _Tumblr = require('./Tumblr');

var _Tumblr2 = _interopRequireDefault(_Tumblr);

var _Twitter = require('./Twitter');

var _Twitter2 = _interopRequireDefault(_Twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Facebook: _Facebook2.default,
  Pinterest: _Pinterest2.default,
  Tumblr: _Tumblr2.default,
  Twitter: _Twitter2.default
};