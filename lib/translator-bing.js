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
  var root = res.ROOT;

  var explains = (function (defs) {
    var ret = [];
    for (var i in defs) {
      var eachDef = defs[i];
      var sens0 = eachDef.SENS[0] || eachDef.SENS;
      var pos = sens0.$POS;

      var sen = sens0.SEN;
      var senList = [];
      senList.push(pos);
      for (var i in sen) {
        senList.push(sen[i].D.$);
      }
      ret.push(senList.join('. '));

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
        callback(ex, {
          metadata: _metadata
        });
      }
    });
  }
};

module.exports = function init(option) {
  _option = option || _option;
  return _translator;
};