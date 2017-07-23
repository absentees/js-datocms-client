'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uploadFile;

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */

function uploadFile(client, source) {
  if (_isBrowser2.default) {
    var _adapter = require('./adapters/browser');
    return _adapter(client, source);
  }

  var adapter = require('./adapters/node');
  return adapter(client, source);
}
module.exports = exports['default'];