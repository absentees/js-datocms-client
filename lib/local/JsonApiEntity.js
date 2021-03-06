"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonApiEntity = function () {
  function JsonApiEntity(payload, repo) {
    var _this = this;

    _classCallCheck(this, JsonApiEntity);

    this.payload = payload;
    this.repo = repo;

    Object.entries(payload.attributes || {}).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];

      Object.defineProperty(_this, name, { enumerable: true, value: value });
    });

    Object.entries(payload.relationships || {}).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          value = _ref4[1];

      Object.defineProperty(_this, name, {
        enumerable: true,
        get: function get() {
          var linkage = value.data;

          if (Array.isArray(linkage)) {
            return linkage.map(function (item) {
              return repo.findEntity(item.type, item.id);
            });
          } else if (linkage) {
            return repo.findEntity(linkage.type, linkage.id);
          }

          return null;
        }
      });
    });
  }

  _createClass(JsonApiEntity, [{
    key: "id",
    get: function get() {
      return this.payload.id;
    }
  }, {
    key: "type",
    get: function get() {
      return this.payload.type;
    }
  }]);

  return JsonApiEntity;
}();

exports.default = JsonApiEntity;
module.exports = exports["default"];