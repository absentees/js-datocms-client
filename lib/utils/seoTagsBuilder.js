'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builders = undefined;
exports.default = seoTagsBuilder;

var _humps = require('humps');

var _i18n = require('../utils/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tag = function tag(tagName, attributes) {
  return { tagName: tagName, attributes: attributes };
};
var metaTag = function metaTag(name, content) {
  return tag('meta', { name: name, content: content });
};
var ogTag = function ogTag(property, content) {
  return tag('meta', { property: property, content: content });
};
var cardTag = function cardTag(name, content) {
  return tag('meta', { name: name, content: content });
};
var contentTag = function contentTag(tagName, content) {
  return { tagName: tagName, content: content };
};

function seoAttributeWithFallback(attribute, alternative, item, site) {
  var fallbackSeo = site.globalSeo && site.globalSeo.fallbackSeo;
  var seoField = item && item.fields.find(function (f) {
    return f.fieldType === 'seo';
  });

  var itemSeoValue = seoField && item[(0, _humps.camelize)(seoField.apiKey)] && item[(0, _humps.camelize)(seoField.apiKey)][attribute];

  var fallbackSeoValue = fallbackSeo && fallbackSeo[attribute];

  return itemSeoValue || alternative || fallbackSeoValue;
}

var builders = exports.builders = {
  title: function title(item, site) {
    var titleField = item && item.fields.find(function (f) {
      return f.fieldType === 'string' && f.appeareance.type === 'title';
    });

    var title = seoAttributeWithFallback('title', titleField && item[(0, _humps.camelize)(titleField.apiKey)], item, site);

    if (title) {
      var suffix = site.globalSeo && site.globalSeo.titleSuffix || '';
      var titleWithSuffix = (title + suffix).length <= 60 ? title + suffix : title;

      return [contentTag('title', titleWithSuffix), ogTag('og:title', title), cardTag('twitter:title', title)];
    }

    return undefined;
  },
  description: function description(item, site) {
    var description = seoAttributeWithFallback('description', null, item, site);

    if (description) {
      return [metaTag('description', description), ogTag('og:description', description), cardTag('twitter:description', description)];
    }

    return undefined;
  },
  robots: function robots(item, site) {
    if (!site.noIndex) return undefined;

    return metaTag('robots', 'noindex');
  },
  twitterSite: function twitterSite(item, site) {
    if (site.globalSeo && site.globalSeo.twitterAccount) {
      return cardTag('twitter:site', site.globalSeo.twitterAccount);
    }

    return undefined;
  },
  twitterCard: function twitterCard() {
    return cardTag('twitter:card', 'summary');
  },
  articleModifiedTime: function articleModifiedTime(item) {
    if (!item) return undefined;
    return ogTag('article:modified_time', item.updatedAt.toISOString().split('.')[0] + 'Z');
  },
  articlePublisher: function articlePublisher(item, site) {
    if (site.globalSeo && site.globalSeo.facebookPageUrl) {
      return ogTag('article:publisher', site.globalSeo.facebookPageUrl);
    }

    return undefined;
  },
  ogLocale: function ogLocale() {
    return ogTag('og:locale', _i18n2.default.locale + '_' + _i18n2.default.locale.toUpperCase());
  },
  ogType: function ogType(item) {
    if (!item || item.singleton) {
      return ogTag('og:type', 'website');
    }

    return ogTag('og:type', 'article');
  },
  ogSiteName: function ogSiteName(item, site) {
    if (site.globalSeo && site.globalSeo.siteName) {
      return ogTag('og:site_name', site.globalSeo.siteName);
    }

    return undefined;
  },
  image: function image(item, site) {
    var itemImage = item && item.fields.filter(function (f) {
      return f.fieldType === 'image';
    }).map(function (field) {
      return item[(0, _humps.camelize)(field.apiKey)];
    }).filter(function (image) {
      return image;
    }).find(function (image) {
      return image.width >= 200 && image.height >= 200;
    });

    var image = seoAttributeWithFallback('image', itemImage, item, site);

    if (image) {
      var url = image.url();

      return [ogTag('og:image', url), cardTag('twitter:image', url)];
    }

    return undefined;
  }
};

function seoTagsBuilder(item, site) {
  return Object.values(builders).reduce(function (acc, builder) {
    var result = builder(item, site);

    if (result) {
      if (Array.isArray(result)) {
        return [].concat(acc, result);
      }

      return [].concat(acc, [result]);
    }

    return acc;
  }, []);
}