'use strict';

var config = require('./config');
var _translatorModules = [];

exports.load = function (configPath) {
  _translatorModules = [];
  var translators = config(configPath).translators;
  for (var i = 0; i < translators.length; i++) {
    var eachTranslator = translators[i];
    var translatorName = eachTranslator.name;
    var translatorOption = eachTranslator.option;
    _translatorModules.push(require('./' + translatorName)(translatorOption));
  }
};

exports.getTranslatorsSync = function () {
  return _translatorModules;
}

exports.getTranslatorsAsync = function (callback) {
  callback(_translatorModules);
}