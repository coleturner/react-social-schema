'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = popup;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function popup(url, inputOptions, callback) {
  var defaults = { width: '850', height: '650', toolbar: 0, scrollbars: 1, location: 0, statusbar: 0, menubar: 0, resizable: 1 };
  var options = (0, _assign2.default)({}, defaults, inputOptions);
  var name = options.name;

  var data = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(options)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      data.push(key + '=' + encodeURIComponent(value));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var x = window.open(url, name, data.join(','));
  if (typeof callback === 'function') {
    (function () {
      var popUpInt = setInterval(function () {
        if (!x || x.closed) {
          callback();
          clearInterval(popUpInt);
        }
      }, 300);
    })();
  }

  return x;
}