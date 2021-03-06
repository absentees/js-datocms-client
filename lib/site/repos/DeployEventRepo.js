'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deserializeJsonApi = require('../../deserializeJsonApi');

var _deserializeJsonApi2 = _interopRequireDefault(_deserializeJsonApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeployEventRepo = function () {
  function DeployEventRepo(client) {
    _classCallCheck(this, DeployEventRepo);

    this.client = client;
  }

  _createClass(DeployEventRepo, [{
    key: 'all',
    value: function all() {
      return this.client.get('/deploy-events').then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }, {
    key: 'find',
    value: function find(deployEventId) {
      return this.client.get('/deploy-events/' + deployEventId).then(function (response) {
        return Promise.resolve((0, _deserializeJsonApi2.default)(response));
      });
    }
  }]);

  return DeployEventRepo;
}();

exports.default = DeployEventRepo;
module.exports = exports['default'];