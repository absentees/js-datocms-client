'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Seo = exports.File = exports.Image = exports.Loader = exports.SiteClient = exports.AccountClient = undefined;

var _AccountClient = require('./account/AccountClient');

Object.defineProperty(exports, 'AccountClient', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AccountClient).default;
  }
});

var _SiteClient = require('./site/SiteClient');

Object.defineProperty(exports, 'SiteClient', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SiteClient).default;
  }
});

var _Loader = require('./local/Loader');

Object.defineProperty(exports, 'Loader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Loader).default;
  }
});

var _Image = require('./local/fields/Image');

Object.defineProperty(exports, 'Image', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Image).default;
  }
});
Object.defineProperty(exports, 'File', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Image).default;
  }
});

var _Seo = require('./local/fields/Seo');

Object.defineProperty(exports, 'Seo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Seo).default;
  }
});

require('core-js/fn/object/entries');

require('core-js/fn/object/values');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.ADD_POLYFILLS) {
  /* eslint-disable global-require */
  require('babel-polyfill');
  require('whatwg-fetch');
  /* eslint-enable global-require */
}