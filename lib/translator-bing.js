'use strict';
var request = require('request');
var url = require('url');

var _metadata = {
  name: 'bing',
  version: '1.0'
};
var _option = {};

function _getQueryUrl(word) {
  var urlObject = {
    protocol: 'http',
    hostname: 'dict.bing.com.cn',
    pathname: '/io.aspx',
    query: {
      t: 'dict',
      ut: 'default',
      q: word
    }
  };
  return url.format(urlObject);
}

function _parseJSONResponse(res) {
  return res;
}

var _translator = {
  translate: function (word, callback) {
    if (typeof callback !== 'function') {
      return;
    }

    request(_getQueryUrl(word), function (err, res, body) {
      try {
        if (err || res.statusCode !== 200) {
          throw new Error('network error');
        }
        var jsonObject = JSON.parse(body);
        callback(null, _parseJSONResponse(jsonObject));
      } catch (ex) {
        callback(err, {
          metadata: _metadata
        });
      }
    });
  }
};

module.exports = function init(option) {
  _option = option || {};
  return _translator;
};