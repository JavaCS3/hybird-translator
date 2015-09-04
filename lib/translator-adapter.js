'use strict';
var _translatorImplements = [];
var _translator = {
  translate: function (word, callback) {
    for (var i in _translatorImplements) {
      var eachTranslator = _translatorImplements[i];
      if (!eachTranslator.translate) continue;
      eachTranslator.translate(word, callback);
    }
  }
};
module.exports = function init(translators) {
  _translatorImplements = translators || [];
  return _translator;
};