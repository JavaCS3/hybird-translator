'use strict';

var assert = require('assert');
var adapter = require('../lib/translator-adapter');
var translatorStub = {
  translate: function (word, callback) {
    callback(null, word);
  },
  metadata: function () {
    return {
      name: 'dummy'
    };
  }
};

describe('translator-adapter', function () {
  describe('#translate', function () {

    it('callback should be invoked when finished', function (done) {
      adapter([translatorStub]).translate('word', function () {
        done();
      });
    });

    it('each translator should be invoked when finished', function (done) {
      var counter = 0;
      var count = function () {
        counter++;
        if (counter === 2) {
          done();
        }
      };
      adapter([translatorStub, translatorStub]).translate('word', function () {
        count();
      });
    });

  });
});