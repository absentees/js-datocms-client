'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = serializeJsonApi;
function serializeRelationships(item, relationships) {
  var result = {};

  Object.entries(relationships).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        type = _ref2[1];

    var idOrIds = item[name];

    var data = null;

    if (Array.isArray(idOrIds)) {
      data = idOrIds.map(function (id) {
        return { type: type, id: id };
      });
    } else if (idOrIds) {
      data = { type: type, id: idOrIds };
    }

    result[name] = { data: data };
  });

  return result;
}

function serialize(item, _ref3) {
  var type = _ref3.type,
      attributes = _ref3.attributes,
      requiredAttributes = _ref3.requiredAttributes,
      relationships = _ref3.relationships,
      requiredRelationships = _ref3.requiredRelationships;

  var result = { type: type, attributes: {} };

  attributes.forEach(function (attribute) {
    if (attribute in item) {
      result.attributes[attribute] = item[attribute];
    }
  });

  if (item.id) {
    result.id = item.id;
  }

  if (requiredAttributes) {
    requiredAttributes.forEach(function (requiredAttribute) {
      if (item[requiredAttribute] === undefined) {
        throw new Error('Required attribute: ' + requiredAttribute);
      }
    });
  }

  if (relationships) {
    result.relationships = serializeRelationships(item, relationships);

    if (requiredRelationships) {
      requiredRelationships.forEach(function (requiredRelationship) {
        if (item[requiredRelationship] === undefined) {
          throw new Error('Required relationship: ' + requiredRelationship + '!');
        }
      });
    }
  }

  return result;
}

function serializeJsonApi() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 2) {
    var singleOrCollection = args[0],
        rules = args[1];

    if (Array.isArray(singleOrCollection)) {
      var data = singleOrCollection.map(function (obj) {
        return serialize(obj, rules);
      });
      return { data: data };
    }

    return { data: serialize(singleOrCollection, rules) };
  }

  if (args.length === 3) {
    var id = args[0],
        attributes = args[1],
        _rules = args[2];

    var newObject = Object.assign({}, { id: id.toString() }, attributes);
    var _data = serialize(newObject, _rules);
    return { data: _data };
  }

  throw new Error('Invalid arguments');
}
module.exports = exports['default'];