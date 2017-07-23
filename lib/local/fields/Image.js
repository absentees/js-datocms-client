'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
  function Image(value) {
    _classCallCheck(this, Image);

    this.value = value;
  }

  _createClass(Image, [{
    key: 'url',
    value: function url() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var baseUrl = 'https://www.datocms-assets.com';
      return '' + baseUrl + this.path + '?' + _queryString2.default.stringify(params);
    }
  }, {
    key: 'toMap',
    value: function toMap() {
      return {
        format: this.format,
        size: this.size,
        width: this.width,
        height: this.height,
        title: this.title,
        alt: this.alt,
        url: this.url()
      };
    }
  }, {
    key: 'path',
    get: function get() {
      return this.value.path;
    }
  }, {
    key: 'format',
    get: function get() {
      return this.value.format;
    }
  }, {
    key: 'size',
    get: function get() {
      return this.value.size;
    }
  }, {
    key: 'width',
    get: function get() {
      return this.value.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.value.height;
    }
  }, {
    key: 'alt',
    get: function get() {
      return this.value.alt;
    }
  }, {
    key: 'title',
    get: function get() {
      return this.value.title;
    }
  }]);

  return Image;
}();

exports.default = Image;
module.exports = exports['default'];