'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = node;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeRemote = require('./nodeRemote');

var _nodeRemote2 = _interopRequireDefault(_nodeRemote);

var _nodeLocal = require('./nodeLocal');

var _nodeLocal2 = _interopRequireDefault(_nodeLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function node(client, source) {
  var _url$parse = _url2.default.parse(source),
      host = _url$parse.host;

  if (host) {
    return (0, _nodeRemote2.default)(client, source);
  }

  _fs2.default.accessSync(source);

  return (0, _nodeLocal2.default)(client, source);
}
module.exports = exports['default'];