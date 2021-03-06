'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectSsg;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _tomlJs = require('toml-js');

var _tomlJs2 = _interopRequireDefault(_tomlJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fileExists(filePath) {
  try {
    _fs2.default.accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

function detectRubyGenerator(dir) {
  var rubyGenerators = ['middleman', 'jekyll', 'nanoc'];

  var gemfilePath = _path2.default.join(dir, 'Gemfile');
  if (!fileExists(gemfilePath)) {
    return undefined;
  }

  var gemfile = _fs2.default.readFileSync(gemfilePath, 'utf8');

  return rubyGenerators.find(function (gen) {
    return gemfile.match('(\'' + gen + '\'|"' + gen + '")');
  });
}

function detectNodeGenerator(dir) {
  var nodeGenerators = ['brunch', 'assemble', 'ember-cli', 'hexo', 'metalsmith', 'react-scripts', 'roots', 'docpad', 'wintersmith', 'gatsby', 'harp', 'grunt', 'gulp'];

  var pkgPath = _path2.default.join(dir, 'package.json');
  if (!fileExists(pkgPath)) {
    return undefined;
  }

  try {
    var pkg = JSON.parse(_fs2.default.readFileSync(pkgPath, 'utf8'));
    var deps = pkg.dependencies || {};
    var devDeps = pkg.devDependencies || {};
    var allDeps = Object.assign(deps, devDeps);
    return nodeGenerators.find(function (gen) {
      return gen in allDeps;
    });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return undefined;
    }
    throw err;
  }
}

function detectPythonGenerator(dir) {
  var pythonGenerators = ['mkdocs', 'pelican', 'cactus'];

  var requirementsPath = _path2.default.join(dir, 'requirements.txt');
  if (!fileExists(requirementsPath)) {
    return undefined;
  }

  var requirements = _fs2.default.readFileSync(requirementsPath, 'utf8');
  return pythonGenerators.find(function (gen) {
    return requirements.match('^' + gen + '(==)?');
  });
}

function detectHugo(dir) {
  var configs = [{
    file: 'config.toml',
    loader: function loader(content) {
      return _tomlJs2.default.parse(content);
    }
  }, {
    file: 'config.yaml',
    loader: function loader(content) {
      return _jsYaml2.default.safeLoad(content);
    }
  }, {
    file: 'config.json',
    loader: function loader(content) {
      return JSON.parse(content);
    }
  }];

  var isHugo = configs.find(function (option) {
    var configPath = _path2.default.join(dir, option.file);
    if (!fileExists(configPath)) {
      return false;
    }

    try {
      var config = option.loader(_fs2.default.readFileSync(configPath, 'utf8'));
      return 'baseurl' in config;
    } catch (e) {
      return false;
    }
  });

  return isHugo && 'hugo';
}

function detectSsg(dir) {
  return detectRubyGenerator(dir) || detectNodeGenerator(dir) || detectPythonGenerator(dir) || detectHugo(dir) || 'unknown';
}
module.exports = exports['default'];