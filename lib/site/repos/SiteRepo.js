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

var SiteRepo = function () {
  function SiteRepo(client) {
    _classCallCheck(this, SiteRepo);

    this.client = client;
  }

  _createClass(SiteRepo, [{
    key: 'find',
    value: function find() {
      return this.client.get('/site').then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'update',
    value: function update(resourceAttributes) {
      var serializedResource = (0, _serializeJsonApi2.default)(resourceAttributes, {
        type: 'site',
        attributes: ['noIndex', 'favicon', 'globalSeo', 'name', 'themeHue', 'productionDeployAdapter', 'productionDeploySettings', 'stagingDeployAdapter', 'stagingDeploySettings', 'locales', 'timezone', 'ssg', 'frontendUrl']
      });
      return this.client.put('/site', serializedResource).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }]);

  return SiteRepo;
}();

exports.default = SiteRepo;
module.exports = exports['default'];