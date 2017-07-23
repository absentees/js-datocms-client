'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Seo = require('./Seo');

var _Seo2 = _interopRequireDefault(_Seo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalSeo = function () {
  function GlobalSeo(value) {
    _classCallCheck(this, GlobalSeo);

    this.value = value;
  }

  _createClass(GlobalSeo, [{
    key: 'toMap',
    value: function toMap() {
      return {
        siteName: this.siteName,
        titleSuffix: this.titleSuffix,
        facebookPageUrl: this.facebookPageUrl,
        twitterAccount: this.twitterAccount,
        fallbackSeo: this.fallbackSeo && this.fallbackSeo.toMap()
      };
    }
  }, {
    key: 'siteName',
    get: function get() {
      return this.value.siteName;
    }
  }, {
    key: 'titleSuffix',
    get: function get() {
      return this.value.titleSuffix;
    }
  }, {
    key: 'twitterAccount',
    get: function get() {
      return this.value.twitterAccount;
    }
  }, {
    key: 'facebookPageUrl',
    get: function get() {
      return this.value.facebookPageUrl;
    }
  }, {
    key: 'fallbackSeo',
    get: function get() {
      return this.value.fallbackSeo && new _Seo2.default(this.value.fallbackSeo);
    }
  }]);

  return GlobalSeo;
}();

exports.default = GlobalSeo;
module.exports = exports['default'];