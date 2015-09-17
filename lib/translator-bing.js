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

  function sen2str(sen) {
    var tmpList = [sen.$POS];
    var senList = util.isArray(sen.SEN) ? sen.SEN : [sen.SEN];
    for (var i in senList) {
      tmpList.push(senList[i].D.$);
    }
    return tmpList.join('. ');
  }

  function sens2list(sens) {
    var ret = [];
    var sensList = util.isArray(sens) ? sens : [sens];
    for (var i in sensList) {
      ret.push(sen2str(sensList[i]));
    }
    return ret;
  }

  var explains = (function (defs) {
    var ret = [];
    for (var i in defs) {
      var eachDef = defs[i];
      if (!eachDef.SENS) continue;
      ret = ret.concat(sens2list(eachDef.SENS));
    }
    return ret;
  })(root.DEF);

  var phonetic = (function (pro) {
    if (!pro) return 'N/A';
    return util.isArray(pro) ? pro[0].$ : pro.$;
  })(root.PROS.PRO);

  var result = {
    metadata: _metadata,
    query: root.$INPUT,
    basic: {
      speech: 'http://media.engkoo.com:8129/en-us/' + root.AH.$ + '.mp3',
      phonetic: phonetic,
      explains: explains,
    }
  };
  return result;
}

var _translator = new Translator({
  metadata: _metadata,
  getQueryUrl: _getQueryUrl,
  parseJSONResponse: _parseJSONResponse
});

module.exports = function init(option) {
  _option = option || _option;
  return _translator;
};