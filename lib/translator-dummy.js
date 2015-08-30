'use strict';
var request = require('request');

var _metadata = {
  name: 'dummy',
  version: '1.0'
};
var _option = {};
var _translator = {
  translate: function (word, callback) {
    console.log('translating', word);
    if (!callback) return;
    callback();
  }
};
module.exports = function init(option) {
  _option = option || _option;
  return _translator;
};