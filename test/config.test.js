'use strict';

var assert = require('assert');
var fs = require('fs');
var config = require('../lib/config');

describe('config', function () {
  describe('#config', function () {

    before(function () {
      fs.readFileSync = function () {
        return "{}";
      };

      fs.writeFile = function (filename, data, callback) {
        callback(null);
      };
    });

    it('get config success', function () {
      assert.deepEqual(config(), {});
    });

    it('save config', function () {
      config.save(function (err) {
        assert(!err);
      });
    });

  });
});