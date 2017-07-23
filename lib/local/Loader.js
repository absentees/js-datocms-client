'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntitiesRepo = require('../local/EntitiesRepo');

var _EntitiesRepo2 = _interopRequireDefault(_EntitiesRepo);

var _ItemsRepo = require('../local/ItemsRepo');

var _ItemsRepo2 = _interopRequireDefault(_ItemsRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
  function Loader(client) {
    _classCallCheck(this, Loader);

    this.client = client;
  }

  _createClass(Loader, [{
    key: 'load',
    value: function load() {
      var _this = this;

      return Promise.all([this.client.get('/site', { include: 'item_types,item_types.fields' }), this.client.items.all({}, false)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            site = _ref2[0],
            allItems = _ref2[1];

        _this.entitiesRepo = new _EntitiesRepo2.default(site, allItems);
        _this.itemsRepo = new _ItemsRepo2.default(_this.entitiesRepo);
      });
    }
  }]);

  return Loader;
}();

exports.default = Loader;
module.exports = exports['default'];