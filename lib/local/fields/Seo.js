'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Seo = function () {
  function Seo(value) {
    _classCallCheck(this, Seo);

    this.value = value;
  }

  _createClass(Seo, [{
    key: 'toMap',
    value: function toMap() {
      return {
        title: this.title,
        description: this.description,
        image: this.image && this.image.toMap()
      };
    }
  }, {
    key: 'title',
    get: function get() {
      return this.value.title;
    }
  }, {
    key: 'description',
    get: function get() {
      return this.value.description;
    }
  }, {
    key: 'image',
    get: function get() {
      return this.value.image && new _Image2.default(this.value.image);
    }
  }]);

  return Seo;
}();

exports.default = Seo;
module.exports = exports['default'];