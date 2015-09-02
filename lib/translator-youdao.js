'use strict';

var Translator = require('./translator');
var url = require('url');

var _metadata = {
  name: 'youdao',
  version: '1.0'
};
var _option = {};

function _parseJSONResponse(res) {
  return {
    metadata: _metadata,
    basic: {
      speech: res.basic.speech,
      phonetic: res.basic.phonetic,
      explains: res.basic.explains
    }
  };
}

function _getQueryUrl(word) {
  var urlObject = {
    protocol: 'http',
    hostname: 'fanyi.youdao.com',
    pathname: '/openapi.do',
    query: {
      keyfrom: 'awf-Chinese-Dict',
      key: '19965805',
      type: 'data',
      doctype: 'json',
      q: word,
      version: '1.2'
    }
  };
  return url.format(urlObject);
}

var _translator = new Translator({
  metadata: {
    metadata: _metadata
  },
  getQueryUrl: _getQueryUrl,
  parseJSONResponse: _parseJSONResponse
});

module.exports = function init(option) {
  _option = option || _option;
  return _translator;
};