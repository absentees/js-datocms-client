'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = faviconTagsBuilder;
var tag = function tag(tagName, attributes) {
  return { tagName: tagName, attributes: attributes };
};
var metaTag = function metaTag(name, content) {
  return tag('meta', { name: name, content: content });
};

var builders = {
  apple: function apple(site) {
    if (!site.favicon) return undefined;

    return [57, 60, 72, 76, 114, 120, 144, 152, 180].map(function (size) {
      return tag('link', {
        rel: 'apple-touch-icon',
        sizes: size + 'x' + size,
        href: site.favicon.url({ w: size, h: size })
      });
    });
  },
  windows: function windows(site) {
    if (!site.favicon) return undefined;

    return [[70, 70], [150, 150], [310, 310], [310, 150]].map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          w = _ref2[0],
          h = _ref2[1];

      return metaTag('msapplication-square' + w + 'x' + h, site.favicon.url({ w: w, h: h }));
    });
  },
  icon: function icon(site) {
    if (!site.favicon) return undefined;

    return [16, 32, 96, 192].map(function (size) {
      return tag('link', {
        rel: 'icon',
        sizes: size + 'x' + size,
        href: site.favicon.url({ w: size, h: size }),
        type: 'image/' + site.favicon.format
      });
    });
  },
  appName: function appName(site) {
    if (!site.name) return undefined;

    return metaTag('application-name', site.name);
  },
  themeColor: function themeColor(site, _themeColor) {
    if (!_themeColor) return undefined;

    return [metaTag('theme-color', _themeColor), metaTag('msapplication-TileColor', _themeColor)];
  }
};

function faviconTagsBuilder(site) {
  var themeColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return Object.values(builders).reduce(function (acc, builder) {
    var result = builder(site, themeColor);

    if (result) {
      if (Array.isArray(result)) {
        return [].concat(acc, result);
      }
      return [].concat(acc, [result]);
    }

    return acc;
  }, []);
}
module.exports = exports['default'];