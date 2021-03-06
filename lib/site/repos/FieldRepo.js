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

var FieldRepo = function () {
  function FieldRepo(client) {
    _classCallCheck(this, FieldRepo);

    this.client = client;
  }

  _createClass(FieldRepo, [{
    key: 'create',
    value: function create(itemTypeId, resourceAttributes) {
      var serializedResource = (0, _serializeJsonApi2.default)(resourceAttributes, {
        type: 'field',
        attributes: ['label', 'fieldType', 'localized', 'apiKey', 'hint', 'validators', 'appeareance', 'position'],
        requiredAttributes: ['label', 'fieldType', 'localized', 'apiKey', 'hint', 'validators', 'appeareance', 'position']
      });
      return this.client.post('/item-types/' + itemTypeId + '/fields', serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'update',
    value: function update(fieldId, resourceAttributes) {
      var serializedResource = (0, _serializeJsonApi2.default)(fieldId, resourceAttributes, {
        type: 'field',
        attributes: ['label', 'apiKey', 'localized', 'validators', 'appeareance', 'position', 'hint']
      });
      return this.client.put('/fields/' + fieldId, serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'all',
    value: function all(itemTypeId) {
      return this.client.get('/item-types/' + itemTypeId + '/fields').then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'find',
    value: function find(fieldId) {
      return this.client.get('/fields/' + fieldId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(fieldId) {
      return this.client.delete('/fields/' + fieldId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }]);

  return FieldRepo;
}();

exports.default = FieldRepo;
module.exports = exports['default'];