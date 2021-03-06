'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nodeUrl;

var _tmp = require('tmp');

var _tmp2 = _interopRequireDefault(_tmp);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _nodeLocal = require('./nodeLocal');

var _nodeLocal2 = _interopRequireDefault(_nodeLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodeUrl(client, fileUrl) {
  return new Promise(function (resolve, reject) {
    _tmp2.default.dir(function (err, dir, cleanupCallback) {
      if (err) {
        reject(err);
      }

      var _url$parse = _url2.default.parse(fileUrl),
          pathname = _url$parse.pathname;

      var filePath = _path2.default.join(dir, _path2.default.basename(pathname));
      var writeStream = _fs2.default.createWriteStream(filePath);

      (0, _request2.default)(fileUrl).pipe(writeStream);

      writeStream.on('close', function () {
        (0, _nodeLocal2.default)(client, filePath).then(function (result) {
          _fs2.default.unlinkSync(filePath);
          cleanupCallback();
          resolve(result);
        });
      });
    });
  });
}
module.exports = exports['default'];