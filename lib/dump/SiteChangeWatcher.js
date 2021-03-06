'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('pusher-js/node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = '75e6ef0fe5d39f481626';

var SiteChangeWatcher = function () {
  function SiteChangeWatcher(siteId) {
    _classCallCheck(this, SiteChangeWatcher);

    this.socket = new _node2.default(apiKey);
    this.siteId = siteId;
  }

  _createClass(SiteChangeWatcher, [{
    key: 'connect',
    value: function connect(cb) {
      this.channel = this.socket.subscribe('site-' + this.siteId);
      this.channel.bind('site:change', cb);
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.socket.unsubscribe('site-' + this.siteId);
      this.socket.disconnect();
    }
  }]);

  return SiteChangeWatcher;
}();

exports.default = SiteChangeWatcher;
module.exports = exports['default'];