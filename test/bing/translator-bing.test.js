'use strict';

var assert = require('assert');
var fs = require('fs');
var request = require('request');
var mock = require('sinon');
var adapter = require('../../lib/translator-adapter');
var bing = require('../../lib/translator-bing');

// response templates
var normalResponse = fs.readFileSync('test/bing/normal.case');
var normalResponse2 = fs.readFileSync('test/bing/normal2.case');
var normalResponse3 = fs.readFileSync('test/bing/normal3.case');

describe('translator-bing', function () {
  describe('#translate (normal case)', function () {
    before(function () {
      mock.stub(request, 'get').yields(null, { statusCode: 200 }, normalResponse);
    });

    after(function () {
      request.get.restore();
    });

    it('response no error', function () {
      adapter([bing()]).translate('hello', function (err) {
        assert.equal(err, null);
      });
    });

    it('response has body', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.notEqual(body, null);
        assert.notEqual(body, undefined);
      });
    });

    it('response has metadata', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('metadata'));
      });
    });

    it('response has basic definition', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('basic'));
        var basic = body.basic;
        assert.ok(basic.hasOwnProperty('speech'), 'should contain speech');
        assert.ok(basic.hasOwnProperty('phonetic'), 'should contain phonetic');
        assert.ok(basic.hasOwnProperty('explains'), 'should contain explains');
        assert.ok(basic.explains.length > 0);
      });
    });

  });

  describe('#translate (normal case 2)', function () {
    before(function () {
      mock.stub(request, 'get').yields(null, { statusCode: 200 }, normalResponse2);
    });

    after(function () {
      request.get.restore();
    });

    it('response no error', function () {
      adapter([bing()]).translate('hello', function (err) {
        assert.equal(err, null);
      });
    });

    it('response has body', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.notEqual(body, null);
        assert.notEqual(body, undefined);
      });
    });

    it('response has metadata', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('metadata'));
      });
    });

    it('response has basic definition', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('basic'));
        var basic = body.basic;
        assert.ok(basic.hasOwnProperty('speech'), 'should contain speech');
        assert.ok(basic.hasOwnProperty('phonetic'), 'should contain phonetic');
        assert.ok(basic.hasOwnProperty('explains'), 'should contain explains');
        assert.ok(basic.explains.length > 0);
      });
    });

  });

  describe('#translate (normal case 3)', function () {
    before(function () {
      mock.stub(request, 'get').yields(null, { statusCode: 200 }, normalResponse3);
    });

    after(function () {
      request.get.restore();
    });

    it('response no error', function () {
      adapter([bing()]).translate('hello', function (err) {
        assert.equal(err, null);
      });
    });

    it('response has body', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.notEqual(body, null);
        assert.notEqual(body, undefined);
      });
    });

    it('response has metadata', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('metadata'));
      });
    });

    it('response has basic definition', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('basic'));
        var basic = body.basic;
        assert.ok(basic.hasOwnProperty('speech'), 'should contain speech');
        assert.ok(basic.hasOwnProperty('phonetic'), 'should contain phonetic');
        assert.ok(basic.hasOwnProperty('explains'), 'should contain explains');
        assert.ok(basic.explains.length > 0);
      });
    });

  });

  describe('#translate (network error)', function () {
    before(function () {
      mock.stub(request, 'get').yields(new Error('network error'), { statusCode: 200 }, null);
    });

    after(function () {
      request.get.restore();
    });

    it('should get error object when network error', function () {
      adapter([bing()]).translate('hello', function (err) {
        assert.notEqual(err, null);
      });
    });

    it('should get metadata when network error', function () {
      adapter([bing()]).translate('hello', function (err, body) {
        assert.ok(body.hasOwnProperty('metadata'));
      });
    });
  });

  describe('#translator itself', function () {
    it('every translator is the same', function () {
      assert.equal(bing(), bing());
    });
  });
});