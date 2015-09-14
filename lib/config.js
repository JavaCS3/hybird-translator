'use strict';

var fs = require('fs');
var _filename = './config.json';
var _config = {};

function _JSONstringify(obj) {
  return JSON.stringify(obj, null, 2);
}

module.exports = function (file) {
  _filename = file || _filename;
  _config = JSON.parse(fs.readFileSync(_filename, 'utf8'));
  return _config;
};

module.exports.save = function (callback) {
  fs.writeFile(_filename, _JSONstringify(_config), callback);
};
