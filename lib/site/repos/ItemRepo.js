'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deserializeJsonApi = require('../../deserializeJsonApi');

var _deserializeJsonApi2 = _interopRequireDefault(_deserializeJsonApi);

var _serializeJsonApi = require('../../serializeJsonApi');

var _serializeJsonApi2 = _interopRequireDefault(_serializeJsonApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function times(n) {
  /* eslint-disable prefer-spread */
  return Array.apply(null, { length: n }).map(Number.call, Number);
  /* eslint-enable prefer-spread */
}

var ItemRepo = function () {
  function ItemRepo(client) {
    _classCallCheck(this, ItemRepo);

    this.client = client;
  }

  _createClass(ItemRepo, [{
    key: 'create',
    value: function create(resourceAttributes) {
      var attributeKeys = Object.keys(resourceAttributes);
      ['id', 'itemType'].forEach(function (key) {
        var index = attributeKeys.indexOf(key);
        if (index > -1) {
          attributeKeys.splice(index, 1);
        }
      });

      var serializedResource = (0, _serializeJsonApi2.default)(resourceAttributes, {
        type: 'item',
        attributes: attributeKeys,
        requiredAttributes: [],
        relationships: {
          itemType: 'item_type'
        },
        requiredRelationships: ['itemType']
      });
      return this.client.post('/items', serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'update',
    value: function update(itemId, resourceAttributes) {
      var attributeKeys = Object.keys(resourceAttributes);
      ['id', 'updatedAt', 'isValid', 'itemType', 'lastEditor'].forEach(function (key) {
        var index = attributeKeys.indexOf(key);
        if (index > -1) {
          attributeKeys.splice(index, 1);
        }
      });

      var serializedResource = (0, _serializeJsonApi2.default)(itemId, resourceAttributes, {
        type: 'item',
        attributes: attributeKeys
      });
      return this.client.put('/items/' + itemId, serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'all',
    value: function all() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var deserializeResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var itemsPerPage = 500;

      return this.client.get('/items', Object.assign({}, params, { 'page[limit]': itemsPerPage })).then(function (baseResponse) {
        var pages = Math.ceil(baseResponse.meta.totalCount / itemsPerPage);

        var extraFetches = times(pages - 1).map(function (extraPage) {
          return _this.client.get('/items', Object.assign({}, params, {
            'page[offset]': itemsPerPage * (extraPage + 1),
            'page[limit]': itemsPerPage
          })).then(function (response) {
            return response.data;
          });
        });

        return Promise.all(extraFetches).then(function (x) {
          return [x, baseResponse];
        });
      }).then(function (_ref) {
        var _baseResponse$data;

        var _ref2 = _slicedToArray(_ref, 2),
            datas = _ref2[0],
            baseResponse = _ref2[1];

        return Object.assign({}, baseResponse, {
          data: (_baseResponse$data = baseResponse.data).concat.apply(_baseResponse$data, _toConsumableArray(datas))
        });
      }).then(function (response) {
        return Promise.resolve(deserializeResponse ? (0, _deserializeJsonApi2.default)(response) : response);
      });
    }
  }, {
    key: 'find',
    value: function find(itemId) {
      return this.client.get('/items/' + itemId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(itemId) {
      return this.client.delete('/items/' + itemId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }]);

  return ItemRepo;
}();

exports.default = ItemRepo;
module.exports = exports['default'];