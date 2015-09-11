'use strict';
window.$   = window.jQuery = require('./js/jquery-2.1.4.min.js');
var ejs    = require('ejs');
var remote = require('remote');

var template = ejs.compile("<%- include('template/translate-result') -%>", {
  filename: 'view/template/'
});

$(function () {
  var translatorAdapter = remote.require('./lib/translator-adapter');
  var bing = remote.require('./lib/translator-bing');
  // var youdao = remote.require('./lib/translator-youdao');
  var resultSet = {
    result: {}
  };

  // on search event
  $('#search-btn').click(function (e) {
    e.preventDefault();
    var word = $('#search-text').val();
    translatorAdapter([bing()]).translate(word, function (err, body) {
      resultSet.result[body.metadata.name] = {
        error: err,
        body: body
      };
      $('#translate-result').html(template(resultSet));
    });
  });

});