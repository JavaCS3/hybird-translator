'use strict';
var request = require('request');

var _metadata = {
  name: 'bing',
  version: '1.0'
};
var _option = {};
var _translator = {
  translate: function (word, callback) {
    ;
  }
};

module.exports = function init(option) {
  _option = option || {};
  return _translator;
};