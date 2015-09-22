'use strict';
window.$   = window.jQuery = require('./js/jquery-2.1.4.min.js');
var ejs    = require('ejs');
var remote = require('remote');

var template = ejs.compile("<%- include('template/translate-result') -%>", {
  filename: 'view/template/'
});

$(function () {
  var translatorAdapter = remote.require('./lib/translator-adapter');
  var loader = remote.require('./lib/translator-loader');

  function TranslateResult(m) {
    var _tmap = (function (m) {
      var tmap = {};
      var i;
      for (i = 0; i < m.length; i++) {
        tmap[m[i].metadata().name] = i;
      }
      return tmap;
    }(m));

    var _result = (function (m) {
      var ret = [];
      var i;
      for (i = 0; i < m.length; i++) {
        ret.push({ name: m[i].metadata().name });
      }
      return ret;
    }(m));

    this.setResult = function (translatorName, err, body) {
      if (Object.keys(_tmap).length === 0) { return; }
      var index = _tmap[translatorName];
      _result[index].error = err;
      _result[index].body = body;
    };

    this.getResult = function () {
      return _result;
    };
  }

  var translatorModules = [];
  var result = new TranslateResult(translatorModules);

  loader.load();
  loader.getTranslatorsAsync(function (t) {
    translatorModules = t;
  });

  // on search event
  $('#search-btn').click(function (e) {
    e.preventDefault();

    var word = $('#search-text').val();
    result = new TranslateResult(translatorModules);

    translatorAdapter(translatorModules).translate(word, function (err, body) {
      result.setResult(body.metadata.name, err, body);
      $('#translate-result').html(template({ result: result.getResult() }));
    });
  });

});