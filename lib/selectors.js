'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.findObjectByType = findObjectByType;
exports.getTitleAttribute = getTitleAttribute;
exports.getBodyAttribute = getBodyAttribute;
exports.getURLAttribute = getURLAttribute;
exports.getImageAttribute = getImageAttribute;
exports.resolveSocial = resolveSocial;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findObjectByType(schema, type) {
  if ((typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === 'object' && '@type' in schema && schema['@type'] === type) {
    return schema;
  } else if ((typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === 'object') {
    return (0, _values2.default)(schema).find(function (a) {
      return findObjectByType(a, type);
    });
  } else if (Array.isArray(schema)) {
    return schema.find(function (a) {
      return findObjectByType(a, type);
    });
  }

  return null;
}

function getTitleAttribute(schema) {
  return schema.headline;
}

function getBodyAttribute(schema) {
  return schema.description || null;
}

function getURLAttribute(schema) {
  if ('mainEntityOfPage' in schema && '@id' in schema.mainEntityOfPage) {
    return schema.mainEntityOfPage['@id'];
  } else if ('publisher' in schema) {
    return schema.publisher.url;
  } else if (typeof location !== 'undefined') {
    return location.href;
  }

  return null;
}

function getImageAttribute(schema) {
  if ('image' in schema) {
    return schema.image;
  } else if ('image' in schema.author) {
    return schema.author.image;
  } else if ('logo' in schema.publisher) {
    return schema.publisher.logo;
  }

  var foundImage = findObjectByType(schema, 'ImageObject');

  if (foundImage) {
    return foundImage;
  }

  return null;
}

function resolveSocial(schema, test) {
  if ((0, _typeof3.default)('sameAs') in schema) {
    var testValue = schema.sameAs.find(test);
    if (testValue) {
      return testValue;
    }
  }

  var _arr = ['author', 'publisher', 'provider'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    if (key in schema && 'sameAs' in schema[key]) {
      var _testValue = schema[key].sameAs.find(test);
      if (_testValue) {
        return _testValue;
      }
    }
  }

  return null;
}