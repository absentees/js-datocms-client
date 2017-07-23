'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _Seo = require('./Seo');

var _Seo2 = _interopRequireDefault(_Seo);

var _Links = require('./Links');

var _Links2 = _interopRequireDefault(_Links);

var _DateTime = require('./DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _DateOnly = require('./DateOnly');

var _DateOnly2 = _interopRequireDefault(_DateOnly);

var _Gallery = require('./Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

var _Color = require('./Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fieldTypeParser = {
  date: function date(value) {
    if (!value) {
      return value;
    }
    return new _DateOnly2.default(Date.parse(value));
  },
  date_time: function date_time(value) {
    if (!value) {
      return value;
    }
    return new _DateTime2.default(Date.parse(value));
  },
  link: function link(value, repo) {
    if (!value) {
      return value;
    }
    return value && repo.find(value);
  },
  links: function links(value, repo) {
    var items = value ? value.map(function (id) {
      return repo.find(id);
    }) : [];
    return new (Function.prototype.bind.apply(_Links2.default, [null].concat(_toConsumableArray(items))))();
  },
  rich_text: function rich_text(value, repo) {
    var items = value ? value.map(function (id) {
      return repo.find(id);
    }) : [];
    return new (Function.prototype.bind.apply(_Links2.default, [null].concat(_toConsumableArray(items))))();
  },
  image: function image(value) {
    if (!value) {
      return value;
    }
    return new _Image2.default(value);
  },
  gallery: function gallery(value) {
    var _this = this;

    var images = value ? value.map(function (data) {
      return _this.image(data);
    }) : [];
    return new (Function.prototype.bind.apply(_Gallery2.default, [null].concat(_toConsumableArray(images))))();
  },
  file: function file(value) {
    if (!value) {
      return value;
    }
    return new _File2.default(value);
  },
  color: function color(value) {
    if (!value) {
      return value;
    }
    return new _Color2.default(value);
  },
  seo: function seo(value) {
    if (!value) {
      return value;
    }
    return new _Seo2.default(value);
  }
};

function build(fieldType, value, itemsRepo) {
  if (fieldTypeParser[fieldType]) {
    return fieldTypeParser[fieldType](value, itemsRepo);
  }

  return value;
}
module.exports = exports['default'];