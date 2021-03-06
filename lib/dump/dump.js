'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _denodeify = require('denodeify');

var _denodeify2 = _interopRequireDefault(_denodeify);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _Loader = require('../local/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _createPost2 = require('./createPost');

var _createPost3 = _interopRequireDefault(_createPost2);

var _createDataFile2 = require('./createDataFile');

var _createDataFile3 = _interopRequireDefault(_createDataFile2);

var _addToDataFile2 = require('./addToDataFile');

var _addToDataFile3 = _interopRequireDefault(_addToDataFile2);

var _i18n = require('../utils/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rimraf = (0, _denodeify2.default)(_rimraf2.default);

var createDirectory = void 0;

function collectOperations(base, config) {
  var operations = [];

  var dsl = {
    directory: function directory(dir, subConfig) {
      operations.push(createDirectory((0, _path.join)(base, dir), subConfig));
    },
    createDataFile: function createDataFile(file, format, data) {
      operations.push(_createDataFile3.default.bind(null, (0, _path.join)(base, file), format, data));
    },
    createPost: function createPost(file, format, data) {
      operations.push(_createPost3.default.bind(null, (0, _path.join)(base, file), format, data));
    },
    addToDataFile: function addToDataFile(file, format, data) {
      operations.push(_addToDataFile3.default.bind(null, (0, _path.join)(base, file), format, data));
    }
  };

  config(dsl, _i18n2.default);

  return operations;
}

createDirectory = function createDirectory(dir, config) {
  var operations = collectOperations(dir, config);

  return function () {
    return rimraf((0, _path.join)(dir, '*')).then(function () {
      return Promise.all(operations.map(function (o) {
        return o();
      }));
    }).then(function (descriptions) {
      var _ref;

      var description = 'Created ' + (0, _path.relative)(process.cwd(), dir);
      return (_ref = []).concat.apply(_ref, [description].concat(_toConsumableArray(descriptions)));
    });
  };
};

function start(path, config) {
  var operations = collectOperations(path, config);

  return function () {
    return Promise.all(operations.map(function (o) {
      return o();
    })).then(function (descriptions) {
      var _ref2;

      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(descriptions));
    });
  };
}

exports.default = function dump(configFile, client) {
  var destinationPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.cwd();
  var config, loader, startOperation;
  return regeneratorRuntime.async(function dump$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /* eslint-disable global-require, import/no-dynamic-require */
          delete require.cache[configFile];
          config = require(configFile);
          /* eslint-enable global-require, import/no-dynamic-require */

          loader = new _Loader2.default(client);
          _context.next = 5;
          return regeneratorRuntime.awrap(loader.load());

        case 5:

          _i18n2.default.availableLocales = loader.itemsRepo.site.locales;
          _i18n2.default.locale = _i18n2.default.availableLocales[0];

          startOperation = start(destinationPath, config.bind(config, loader.itemsRepo));
          _context.next = 10;
          return regeneratorRuntime.awrap(startOperation());

        case 10:
          return _context.abrupt('return', _context.sent);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
};

module.exports = exports['default'];