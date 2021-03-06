"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deserializeJsonApi;
function deserialize(_ref) {
  var id = _ref.id,
      attributes = _ref.attributes,
      relationships = _ref.relationships;

  var result = Object.assign({ id: id }, attributes);

  if (relationships) {
    var relationshipKeys = Object.keys(relationships);
    relationshipKeys.forEach(function (key) {
      var relationshipData = relationships[key].data;

      if (Array.isArray(relationshipData)) {
        var relationshipBody = relationshipData.map(function (obj) {
          return obj.id;
        });
        result[key] = relationshipBody;
        return;
      }
      result[key] = relationshipData ? relationshipData.id : null;
      return;
    });
  }
  return result;
}

function deserializeJsonApi(json) {
  var data = json.data;

  if (Array.isArray(data)) {
    return data.map(function (item) {
      return deserialize(item);
    });
  }

  return deserialize(data);
}
module.exports = exports["default"];