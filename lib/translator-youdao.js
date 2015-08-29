'use strict';
var request = require('request');
var url = require('url');

var _metadata = {
  name: 'youdao',
  version: '1.0'
};
var _option = {};
var _urlObject = {
  protocol: 'http',
  hostname: 'fanyi.youdao.com',
  pathname: '/openapi.do',
  query: {
    keyfrom: 'awf-Chinese-Dict',
    key: '19965805',
    type: 'data',
    doctype: 'json',
    q: '',
    version: '1.2'
  }
};

function _parseJSONResponse(body) {
  console.log(body);
  return {
    metadata: _metadata,
    translation: body.translation,
    basic: {
      speech: body.basic.speech,
      phonetic: body.basic.phonetic,
      explains: body.basic.explains
    }
  };
}

function _getQueryUrl(word) {
  _urlObject.query.q = word;
  return url.format(_urlObject);
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
        callback(err);
      }
    });
  }
};

module.exports = function init(option) {
  _option = option || {};
  return _translator;
};