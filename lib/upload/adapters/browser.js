'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = browser;
/* global XMLHttpRequest */

function uploadToS3(id, url, file) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(id);
        } else {
          reject();
        }
      }
    };

    xhr.open('PUT', url);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.send(file);
  });
}

function browser(client, file) {
  var format = file.name.split('.').pop();

  return client.uploadRequests.create({ filename: file.name }).then(function (_ref) {
    var id = _ref.id,
        url = _ref.url;

    return uploadToS3(id, url, file);
  }).then(function (id) {
    return {
      path: id,
      size: file.size,
      format: format
    };
  });
}
module.exports = exports['default'];