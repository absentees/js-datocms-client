'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uploadImage;

var _uploadFile = require('./uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uploadImage(client, source) {
  return (0, _uploadFile2.default)(client, source).then(function (hash) {
    return fetch('https://www.datocms-assets.com' + hash.path + '?fm=json').then(function (res) {
      return res.json();
    }).then(function (_ref) {
      var PixelHeight = _ref.PixelHeight,
          PixelWidth = _ref.PixelWidth;

      return Object.assign({ height: PixelHeight, width: PixelWidth }, hash);
    });
  });
} /* global fetch */

module.exports = exports['default'];