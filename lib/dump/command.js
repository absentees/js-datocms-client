'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var configFile = _path2.default.resolve(options['--config'] || 'dato.config.js');
  var tokenOption = options['--token'] || process.env.DATO_API_TOKEN;
  var watch = options['--watch'];
  var quiet = options['--quiet'];

  var tokenPromise = void 0;

  if (tokenOption) {
    tokenPromise = Promise.resolve(tokenOption);
  } else {
    tokenPromise = (0, _requireToken2.default)();
  }

  return tokenPromise.then(function (token) {
    try {
      _fs2.default.accessSync(configFile);
    } catch (e) {
      process.stderr.write('Missing config file ' + configFile + '\n');
      process.exit(1);
    }

    var client = new _SiteClient2.default(token, {
      'X-Reason': 'dump',
      'X-SSG': (0, _detectSsg2.default)(process.cwd())
    });

    function exec() {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var text = 'Fetching content from DatoCMS';

      if (prefix) {
        text = prefix + '! ' + text;
      }

      var spinner = (0, _ora2.default)(text).start();

      return (0, _dump2.default)(configFile, client).then(function (operations) {
        spinner.succeed();
        if (!quiet) {
          process.stdout.write('\n');
          operations.forEach(function (operation) {
            return process.stdout.write('* ' + operation + '\n');
          });
          process.stdout.write('\n');
        }
      }).catch(function (e) {
        spinner.fail();
        process.stderr.write(new _prettyError2.default().render(e));
      });
    }

    if (watch) {
      return exec().then(function () {
        return client.site.find();
      }).then(function (site) {
        var watcher = new _SiteChangeWatcher2.default(site.id);
        watcher.connect(exec.bind(null, 'Detected site data change'));

        _chokidar2.default.watch(configFile).on('change', exec.bind(null, 'Detected change to config file'));

        process.on('SIGINT', function () {
          watcher.disconnect();
          process.exit();
        });
      });
    }

    return exec();
  });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _SiteClient = require('../site/SiteClient');

var _SiteClient2 = _interopRequireDefault(_SiteClient);

var _detectSsg = require('./detectSsg');

var _detectSsg2 = _interopRequireDefault(_detectSsg);

var _dump = require('./dump');

var _dump2 = _interopRequireDefault(_dump);

var _SiteChangeWatcher = require('./SiteChangeWatcher');

var _SiteChangeWatcher2 = _interopRequireDefault(_SiteChangeWatcher);

var _requireToken = require('./requireToken');

var _requireToken2 = _interopRequireDefault(_requireToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];