'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var currentLocale = 'en';

exports.default = {
  availableLocales: ['en'],

  get locale() {
    return currentLocale;
  },

  set locale(value) {
    if (this.availableLocales.includes(value)) {
      currentLocale = value;
    } else {
      throw new Error('Invalid locale ' + value);
    }
  },

  withLocale: function withLocale(locale, fn) {
    var oldLocale = currentLocale;
    this.locale = locale;
    var result = fn();
    this.locale = oldLocale;
    return result;
  }
};
module.exports = exports['default'];