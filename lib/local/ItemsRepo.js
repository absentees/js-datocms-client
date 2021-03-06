'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _humps = require('humps');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _Site = require('./Site');

var _Site2 = _interopRequireDefault(_Site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function buildCollectionsByType(repo, itemTypeMethods) {
  var collectionsByType = {};
  var itemsById = {};

  repo.itemTypes.forEach(function (itemType) {
    var method = itemTypeMethods[itemType.apiKey];
    collectionsByType[method] = itemType.singleton ? null : [];
  });

  repo.entitiesRepo.findEntitiesOfType('item').forEach(function (entity) {
    var item = new _Item2.default(entity, repo);
    var method = itemTypeMethods[entity.itemType.apiKey];

    if (!entity.itemType.singleton) {
      collectionsByType[method].push(item);
    }

    itemsById[item.id] = item;
  });

  repo.itemTypes.forEach(function (itemType) {
    var method = itemTypeMethods[itemType.apiKey];
    if (!itemType.singleton && itemType.sortable) {
      collectionsByType[method] = collectionsByType[method].sort(function (a, b) {
        return a.position - b.position;
      });
    }
  });

  repo.itemTypes.forEach(function (itemType) {
    var method = itemTypeMethods[itemType.apiKey];

    if (itemType.singleton && itemType.singletonItem) {
      collectionsByType[method] = itemsById[itemType.singletonItem.id];
    }
  });

  return { collectionsByType: collectionsByType, itemsById: itemsById };
}

function buildItemTypeMethods(repo) {
  var result = {};

  var singletonKeys = repo.singleInstanceItemTypes.map(function (t) {
    return t.apiKey;
  });
  var collectionKeys = repo.collectionItemTypes.map(function (t) {
    return (0, _pluralize2.default)(t.apiKey);
  });
  var clashingKeys = singletonKeys.filter(function (k) {
    return collectionKeys.includes(k);
  });

  repo.itemTypes.forEach(function (itemType) {
    var singleton = itemType.singleton;

    var pluralizedApiKey = (0, _pluralize2.default)(itemType.apiKey);

    var method = (0, _humps.camelize)(singleton ? itemType.apiKey : pluralizedApiKey);

    if (clashingKeys.includes(pluralizedApiKey)) {
      var suffix = singleton ? 'Instance' : 'Collection';
      method += suffix;
    }

    result[itemType.apiKey] = method;
  });

  return result;
}

function buildCache(repo) {
  var itemTypeMethods = buildItemTypeMethods(repo);

  var _buildCollectionsByTy = buildCollectionsByType(repo, itemTypeMethods),
      collectionsByType = _buildCollectionsByTy.collectionsByType,
      itemsById = _buildCollectionsByTy.itemsById;

  return { collectionsByType: collectionsByType, itemsById: itemsById, itemTypeMethods: itemTypeMethods };
}

var ItemsRepo = function () {
  function ItemsRepo(entitiesRepo) {
    var _this = this;

    _classCallCheck(this, ItemsRepo);

    this.entitiesRepo = entitiesRepo;

    var _buildCache = buildCache(this),
        collectionsByType = _buildCache.collectionsByType,
        itemsById = _buildCache.itemsById,
        itemTypeMethods = _buildCache.itemTypeMethods;

    this.collectionsByType = collectionsByType;
    this.itemsById = itemsById;
    this.itemTypeMethods = itemTypeMethods;

    Object.values(itemTypeMethods).forEach(function (method) {
      Object.defineProperty(_this, method, {
        get: function get() {
          return collectionsByType[method];
        }
      });
    });
  }

  _createClass(ItemsRepo, [{
    key: 'find',
    value: function find(id) {
      return this.itemsById[id];
    }
  }, {
    key: 'itemsOfType',
    value: function itemsOfType(itemType) {
      var method = this.itemTypeMethods[itemType.apiKey];

      if (itemType.singleton) {
        var item = this.collectionsByType[method];
        return [item];
      }

      return this.collectionsByType[method];
    }
  }, {
    key: 'site',
    get: function get() {
      return new _Site2.default(this.entitiesRepo.findEntitiesOfType('site')[0]);
    }
  }, {
    key: 'itemTypes',
    get: function get() {
      return this.entitiesRepo.findEntitiesOfType('item_type');
    }
  }, {
    key: 'singleInstanceItemTypes',
    get: function get() {
      return this.itemTypes.filter(function (t) {
        return t.singleton;
      });
    }
  }, {
    key: 'collectionItemTypes',
    get: function get() {
      return this.itemTypes.filter(function (t) {
        return !t.singleton;
      });
    }
  }]);

  return ItemsRepo;
}();

exports.default = ItemsRepo;
module.exports = exports['default'];