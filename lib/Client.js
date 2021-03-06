'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _humps = require('humps');

var _ApiException = require('./ApiException');

var _ApiException2 = _interopRequireDefault(_ApiException);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _isBrowser = require('./isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable global-require */
if (!_isBrowser2.default) {
  global.fetch = require('./fetch');
}
/* eslint-enable global-require */

var Client = function () {
  function Client(token, extraHeaders, baseUrl) {
    _classCallCheck(this, Client);

    this.baseUrl = baseUrl;
    this.token = token;
    this.extraHeaders = extraHeaders;
  }

  _createClass(Client, [{
    key: 'get',
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.request(this.buildUrl(url, params), options);
    }
  }, {
    key: 'put',
    value: function put(url, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return this.request(this.buildUrl(url, params), Object.assign({
        method: 'PUT',
        body: JSON.stringify((0, _humps.decamelizeKeys)(body))
      }, options));
    }
  }, {
    key: 'post',
    value: function post(url, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return this.request(this.buildUrl(url, params), Object.assign({
        method: 'POST',
        body: JSON.stringify((0, _humps.decamelizeKeys)(body))
      }, options));
    }
  }, {
    key: 'delete',
    value: function _delete(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.request(this.buildUrl(url, params), Object.assign({
        method: 'DELETE'
      }, options));
    }
  }, {
    key: 'defaultHeaders',
    value: function defaultHeaders() {
      var userAgent = _isBrowser2.default ? 'js-client (browser)' : 'js-client (nodejs)';

      return {
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: 'Bearer ' + this.token,
        'user-agent': userAgent + ' v' + _package2.default.version
      };
    }
  }, {
    key: 'buildUrl',
    value: function buildUrl(path) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var query = Object.keys(params).length ? '?' + _queryString2.default.stringify(params) : '';

      return '' + this.baseUrl + path + query;
    }
  }, {
    key: 'request',
    value: function request(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var fullHeaders = Object.assign({}, this.extraHeaders, this.defaultHeaders(), options.headers);

      var fullOptions = Object.assign({}, options, { headers: fullHeaders });

      return fetch(url, fullOptions).then(function (res) {
        if (res.status !== 204) {
          return res.json().then(function (body) {
            return [res, body];
          });
        }
        return Promise.resolve([res, null]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            res = _ref2[0],
            body = _ref2[1];

        if (res.status >= 200 && res.status < 300) {
          return Promise.resolve((0, _humps.camelizeKeys)(body));
        }
        return Promise.reject(new _ApiException2.default(res, (0, _humps.camelizeKeys)(body)));
      });
    }
  }]);

  return Client;
}();

exports.default = Client;
module.exports = exports['default'];