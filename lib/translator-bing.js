'use strict';

var Translator = require('./translator');
var url = require('url');
var util = require('util');

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
  var root = res.ROOT;

  function sen2Str(obj) {
    var tmpList = [obj.$POS];
    var senList = util.isArray(obj.SEN) ? obj.SEN : [obj.SEN];
    for (var i = senList.length - 1; i >= 0; i--) {
      tmpList.push(senList[i].D.$);
    }
    return tmpList.join('. ');
  }

  var explains = (function (defs) {
    var ret = [];
    for (var i in defs) {
      var eachDef = defs[i];
      var sens0 = eachDef.SENS[0] || eachDef.SENS;
      ret.push(sen2Str(sens0));
    }
    return ret;
  })(root.DEF);

  var result = {
    metadata: _metadata,
    basic: {
      speech: 'http://media.engkoo.com:8129/en-us/' + root.AH.$ + '.mp3',
      phonetic: root.PROS.PRO[0].$,
      explains: explains,
    }
  };
  return result;
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