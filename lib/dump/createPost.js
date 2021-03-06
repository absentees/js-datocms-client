'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPost;

var _generateFrontmatter = require('./generateFrontmatter');

var _generateFrontmatter2 = _interopRequireDefault(_generateFrontmatter);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPost(file, format, _ref) {
  var frontmatter = _ref.frontmatter,
      _ref$content = _ref.content,
      content = _ref$content === undefined ? '' : _ref$content;

  return (0, _writeFile2.default)(file, (0, _generateFrontmatter2.default)(format, frontmatter) + content);
}
module.exports = exports['default'];