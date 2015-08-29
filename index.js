var translatorAdapter = require('./lib/translator-adapter.js');
var youdao = require('./lib/translator-youdao.js')();
translatorAdapter([youdao]).translate('fuck', function (err, body) {
    console.log('translate finished!');
    console.log(body);
});