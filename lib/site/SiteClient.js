'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _repos = require('./repos');

var repos = _interopRequireWildcard(_repos);

var _Client2 = require('../Client');

var _Client3 = _interopRequireDefault(_Client2);

var _uploadFile2 = require('../upload/uploadFile');

var _uploadFile3 = _interopRequireDefault(_uploadFile2);

var _uploadImage2 = require('../upload/uploadImage');

var _uploadImage3 = _interopRequireDefault(_uploadImage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SiteClient = function (_Client) {
  _inherits(SiteClient, _Client);

  function SiteClient(token) {
    var extraHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var baseUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://site-api.datocms.com';

    _classCallCheck(this, SiteClient);

    var _this = _possibleConstructorReturn(this, (SiteClient.__proto__ || Object.getPrototypeOf(SiteClient)).call(this, token, extraHeaders, baseUrl));

    var repoInstances = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2),
            method = _step$value[0],
            Klass = _step$value[1];

        Object.defineProperty(_this, method, {
          enumerable: true,
          get: function get() {
            repoInstances[method] = repoInstances[method] || new Klass(this);
            return repoInstances[method];
          }
        });
      };

      for (var _iterator = Object.entries(repos)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }

  _createClass(SiteClient, [{
    key: 'uploadFile',
    value: function uploadFile(source) {
      return (0, _uploadFile3.default)(this, source);
    }
  }, {
    key: 'uploadImage',
    value: function uploadImage(source) {
      return (0, _uploadImage3.default)(this, source);
    }
  }]);

  return SiteClient;
}(_Client3.default);

exports.default = SiteClient;
module.exports = exports['default'];