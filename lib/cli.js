'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _docopt = require('docopt');

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _command = require('./dump/command');

var _command2 = _interopRequireDefault(_command);

var _command3 = require('./check/command');

var _command4 = _interopRequireDefault(_command3);

var _command5 = require('./migrateSlugs/command');

var _command6 = _interopRequireDefault(_command5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load({ silent: true });

var doc = '\nDatoCMS CLI tool\n\nUsage:\n  dato dump [--watch] [--verbose] [--token=<apiToken>] [--config=<file>]\n  dato migrate-slugs [--token=<apiToken>] [--skip-id-prefix]\n  dato check\n  dato -h | --help\n  dato --version\n';

var options = (0, _docopt.docopt)(doc, { version: _package2.default.version });

if (options.dump) {
  (0, _command2.default)(options);
}

if (options.check) {
  (0, _command4.default)(options);
}

if (options['migrate-slugs']) {
  (0, _command6.default)(options);
}