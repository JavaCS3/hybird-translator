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
var _translator = {
  translate: function(word, callback) {
    if (typeof callback !== 'function') return;

    _urlObject.query.q = word;
    var youdaoAPI = url.format(_urlObject);

    request(youdaoAPI, function(err, res, body) {
      if (err || res.statusCode != 200) {
        console.error(err);
        callback(err);
      }
      callback(null, body);
    });
  }
};

module.exports = function init(option) {
  _option = option || {};
  return _translator;
};