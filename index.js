var translatorAdapter = require('./lib/translator-adapter.js');
var dummyTranslator = require('./lib/translator-dummy.js')();
translatorAdapter([dummyTranslator]).translate('shit', function (argument) {
    console.log('translate finished!');
});