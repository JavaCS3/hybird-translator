'use strict';
var request = require('request');

function Translator(translatorImpl) {
  this.translatorImpl = translatorImpl;
}

Translator.prototype.translate = function (word, callback) {
  if (typeof callback !== 'function') {
    return;
  }
  var self = this;
  request.get(self.getQueryUrl(word), function (err, res, body) {
    try {
      if (err || res.statusCode !== 200) {
        throw new Error('network error');
      }
      var jsonObject = JSON.parse(body);
      callback(null, self.parseJSONResponse(jsonObject));
    } catch (ex) {
      console.error(ex);
      callback(ex.message, self.metadata());
    }
  });
};

Translator.prototype.getQueryUrl = function (word) {
  return this.translatorImpl.getQueryUrl(word);
};

Translator.prototype.parseJSONResponse = function (res) {
  return this.translatorImpl.parseJSONResponse(res);
};

Translator.prototype.metadata = function () {
  return this.translatorImpl.metadata;
};

module.exports = Translator;