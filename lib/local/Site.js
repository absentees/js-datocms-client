'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _i18n = require('../utils/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _Image = require('./fields/Image');

var _Image2 = _interopRequireDefault(_Image);

var _GlobalSeo = require('./fields/GlobalSeo');

var _GlobalSeo2 = _interopRequireDefault(_GlobalSeo);

var _faviconTagsBuilder = require('../utils/faviconTagsBuilder');

var _faviconTagsBuilder2 = _interopRequireDefault(_faviconTagsBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Site = function () {
  function Site(entity) {
    _classCallCheck(this, Site);

    this.entity = entity;
  }

  _createClass(Site, [{
    key: 'toMap',
    value: function toMap() {
      var _this = this;

      var fields = ['id', 'name', 'locales', 'themeHue', 'domain', 'internalDomain', 'noIndex', 'globalSeo', 'favicon', 'faviconMetaTags'];

      return fields.reduce(function (acc, field) {
        var value = _this[field];

        if (value && value.toMap) {
          value = value.toMap();
        }

        return Object.assign(acc, _defineProperty({}, field, value));
      }, {});
    }
  }, {
    key: 'readAttribute',
    value: function readAttribute(attribute, TypeKlass, localized) {
      var value = void 0;

      if (localized) {
        value = (this.entity[attribute] || {})[_i18n2.default.locale];
      } else {
        value = this.entity[attribute];
      }

      return value && new TypeKlass(value);
    }
  }, {
    key: 'id',
    get: function get() {
      return this.entity.id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.entity.name;
    }
  }, {
    key: 'locales',
    get: function get() {
      return this.entity.locales;
    }
  }, {
    key: 'themeHue',
    get: function get() {
      return this.entity.themeHue;
    }
  }, {
    key: 'domain',
    get: function get() {
      return this.entity.domain;
    }
  }, {
    key: 'internalDomain',
    get: function get() {
      return this.entity.internalDomain;
    }
  }, {
    key: 'noIndex',
    get: function get() {
      return this.entity.noIndex;
    }
  }, {
    key: 'globalSeo',
    get: function get() {
      return this.readAttribute('globalSeo', _GlobalSeo2.default, this.locales > 0);
    }
  }, {
    key: 'favicon',
    get: function get() {
      return this.readAttribute('favicon', _Image2.default, false);
    }
  }, {
    key: 'faviconMetaTags',
    get: function get() {
      return (0, _faviconTagsBuilder2.default)(this);
    }
  }]);

  return Site;
}();

exports.default = Site;
module.exports = exports['default'];