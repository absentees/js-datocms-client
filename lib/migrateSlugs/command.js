'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (options) {
  var token = options['--token'] || process.env.DATO_API_TOKEN;
  var skipIdPrefix = options['--skip-id-prefix'];

  if (!token) {
    process.stdout.write('Missing API token: use the --token option or set an DATO_API_TOKEN environment variable!\n');
    process.exit(1);
  }

  var client = new _SiteClient2.default(token, { 'X-Reason': 'migrate-slugs' });

  var spinner = (0, _ora2.default)('Fetching site information').start();

  function addSlugField(field) {
    var validators, slugField;
    return regeneratorRuntime.async(function addSlugField$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validators = {
              unique: {}
            };


            if (field.validators.required) {
              validators.required = {};
            }

            _context.next = 4;
            return regeneratorRuntime.awrap(client.fields.create(field.itemType, {
              fieldType: 'slug',
              appeareance: { titleFieldId: field.id },
              validators: validators,
              position: 99,
              apiKey: 'slug',
              label: 'Slug',
              hint: '',
              localized: field.localized
            }));

          case 4:
            slugField = _context.sent;
            _context.next = 7;
            return regeneratorRuntime.awrap(client.fields.update(slugField.id, {
              position: field.position + 1
            }));

          case 7:
            return _context.abrupt('return', _context.sent);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  }

  function times(n) {
    /* eslint-disable prefer-spread */
    return Array.apply(null, { length: n }).map(Number.call, Number);
    /* eslint-enable prefer-spread */
  }

  function itemsFor(itemTypeId) {
    var itemsPerPage = 500;

    return client.get('/items', { 'page[limit]': itemsPerPage, 'filter[type]': itemTypeId }).then(function (baseResponse) {
      var pages = Math.ceil(baseResponse.meta.total_count / itemsPerPage);

      var extraFetches = times(pages - 1).map(function (extraPage) {
        return client.get('/items', {
          'page[offset]': itemsPerPage * (extraPage + 1),
          'page[limit]': itemsPerPage
        }).then(function (response) {
          return response.data;
        });
      });

      return Promise.all(extraFetches).then(function (x) {
        return [x, baseResponse];
      });
    }).then(function (_ref) {
      var _baseResponse$data;

      var _ref2 = _slicedToArray(_ref, 2),
          datas = _ref2[0],
          baseResponse = _ref2[1];

      return (0, _deserializeJsonApi2.default)(Object.assign({}, baseResponse, {
        data: (_baseResponse$data = baseResponse.data).concat.apply(_baseResponse$data, _toConsumableArray(datas))
      }));
    });
  }

  function simpleSlugify(item, title, suffix) {
    if (!title) {
      return null;
    }

    var slug = (0, _slugify2.default)(title);

    if (skipIdPrefix) {
      return '' + slug + suffix;
    }

    return item.id + '-' + slug + suffix;
  }

  function localizedSlugify(item, title, suffix) {
    if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
      return Object.entries(title).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            locale = _ref4[0],
            value = _ref4[1];

        return Object.assign({}, acc, _defineProperty({}, locale, simpleSlugify(item, value, suffix)));
      }, {});
    }

    return simpleSlugify(item, title, suffix);
  }

  function updateItem(titleField, item) {
    var title, counter, slug, _e$body$data$, id, attributes;

    return regeneratorRuntime.async(function updateItem$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            title = item[titleField.apiKey];
            counter = 0;

            /* eslint-disable no-constant-condition */

          case 2:
            if (!1) {
              _context2.next = 24;
              break;
            }

            slug = localizedSlugify(item, title, counter === 0 ? '' : '-' + counter);
            _context2.prev = 4;
            _context2.next = 7;
            return regeneratorRuntime.awrap(client.items.update(item.id, Object.assign({}, item, { slug: slug })));

          case 7:
            return _context2.abrupt('return', _context2.sent);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](4);

            if (!(_context2.t0 instanceof _ApiException2.default)) {
              _context2.next = 21;
              break;
            }

            _e$body$data$ = _context2.t0.body.data[0], id = _e$body$data$.id, attributes = _e$body$data$.attributes;

            if (!(id === 'INVALID_FIELD' && attributes.details.field === 'slug' && attributes.details.code === 'VALIDATION_UNIQUE')) {
              _context2.next = 18;
              break;
            }

            counter += 1;
            _context2.next = 19;
            break;

          case 18:
            throw _context2.t0;

          case 19:
            _context2.next = 22;
            break;

          case 21:
            throw _context2.t0;

          case 22:
            _context2.next = 2;
            break;

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this, [[4, 10]]);
  }

  function run() {
    var _this = this;

    var itemTypes, titleFields;
    return regeneratorRuntime.async(function run$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(client.itemTypes.all());

          case 2:
            itemTypes = _context6.sent;
            _context6.next = 5;
            return regeneratorRuntime.awrap(Promise.all(itemTypes.map(function _callee(itemType) {
              var fields, anySlugPresent;
              return regeneratorRuntime.async(function _callee$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(client.fields.all(itemType.id));

                    case 2:
                      fields = _context3.sent;
                      anySlugPresent = fields.some(function (f) {
                        return f.fieldType === 'slug' || f.apiKey === 'slug';
                      });

                      if (!anySlugPresent) {
                        _context3.next = 6;
                        break;
                      }

                      return _context3.abrupt('return', null);

                    case 6:
                      return _context3.abrupt('return', fields.find(function (field) {
                        return field.fieldType === 'string' && field.appeareance.type === 'title';
                      }));

                    case 7:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, null, _this);
            })));

          case 5:
            _context6.t0 = function (field) {
              return !!field;
            };

            titleFields = _context6.sent.filter(_context6.t0);


            spinner.text = 'Updating site';

            _context6.next = 10;
            return regeneratorRuntime.awrap(Promise.all(titleFields.map(function _callee3(titleField) {
              var items;
              return regeneratorRuntime.async(function _callee3$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(addSlugField(titleField));

                    case 2:
                      _context5.next = 4;
                      return regeneratorRuntime.awrap(itemsFor(titleField.itemType));

                    case 4:
                      items = _context5.sent;
                      _context5.next = 7;
                      return regeneratorRuntime.awrap(Promise.all(items.map(function _callee2(item) {
                        return regeneratorRuntime.async(function _callee2$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return regeneratorRuntime.awrap(updateItem(titleField, item));

                              case 2:
                                return _context4.abrupt('return', _context4.sent);

                              case 3:
                              case 'end':
                                return _context4.stop();
                            }
                          }
                        }, null, _this);
                      })));

                    case 7:
                    case 'end':
                      return _context5.stop();
                  }
                }
              }, null, _this);
            })));

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, null, this);
  }

  var pe = new _prettyError2.default();

  return run().then(function () {
    spinner.succeed();
  }).catch(function (e) {
    spinner.fail();
    process.stdout.write(pe.render(e));
  });
};

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _SiteClient = require('../site/SiteClient');

var _SiteClient2 = _interopRequireDefault(_SiteClient);

var _deserializeJsonApi = require('../deserializeJsonApi');

var _deserializeJsonApi2 = _interopRequireDefault(_deserializeJsonApi);

var _slugify = require('../utils/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

var _ApiException = require('../ApiException');

var _ApiException2 = _interopRequireDefault(_ApiException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = exports['default'];