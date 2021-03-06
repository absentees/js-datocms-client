'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deserializeJsonApi = require('../../deserializeJsonApi');

var _deserializeJsonApi2 = _interopRequireDefault(_deserializeJsonApi);

var _serializeJsonApi = require('../../serializeJsonApi');

var _serializeJsonApi2 = _interopRequireDefault(_serializeJsonApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemTypeRepo = function () {
  function ItemTypeRepo(client) {
    _classCallCheck(this, ItemTypeRepo);

    this.client = client;
  }

  _createClass(ItemTypeRepo, [{
    key: 'create',
    value: function create(resourceAttributes) {
      var serializedResource = (0, _serializeJsonApi2.default)(resourceAttributes, {
        type: 'item_type',
        attributes: ['name', 'apiKey', 'singleton', 'sortable', 'orderingDirection'],
        requiredAttributes: ['name', 'apiKey', 'singleton', 'sortable', 'orderingDirection'],
        relationships: {
          orderingField: 'field'
        },
        requiredRelationships: ['orderingField']
      });
      return this.client.post('/item-types', serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'update',
    value: function update(itemTypeId, resourceAttributes) {
      var serializedResource = (0, _serializeJsonApi2.default)(itemTypeId, resourceAttributes, {
        type: 'item_type',
        attributes: ['name', 'apiKey', 'singleton', 'sortable', 'orderingDirection'],
        requiredAttributes: ['name', 'apiKey', 'singleton', 'sortable', 'orderingDirection'],
        relationships: {
          orderingField: 'field'
        },
        requiredRelationships: ['orderingField']
      });
      return this.client.put('/item-types/' + itemTypeId, serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'all',
    value: function all() {
      return this.client.get('/item-types').then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'find',
    value: function find(itemTypeId) {
      return this.client.get('/item-types/' + itemTypeId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(itemTypeId) {
      return this.client.delete('/item-types/' + itemTypeId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }]);

  return ItemTypeRepo;
}();

exports.default = ItemTypeRepo;
module.exports = exports['default'];