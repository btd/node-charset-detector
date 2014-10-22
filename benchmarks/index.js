var detect = require('../');
var jschardet = require("jschardet")

var fs = require('fs');
var path = require('path');

function readFixture(csName) {
  return fs.readFileSync(path.join(__dirname, '..', 'tests', 'fixtures', csName.toLowerCase() + '.txt'));
}

var utf8 = readFixture('UTF-8');
var gb18030 = readFixture('gb18030');

suite('detection', function() {
  bench('UTF-8 detect', function() {
    detect(utf8);
  });
  bench('UTF-8 jschardet', function() {
    jschardet.detect(utf8);
  });
  bench('gb18030 detect', function() {
    detect(gb18030);
  });
  bench('gb18030 jschardet', function() {
    jschardet.detect(gb18030);
  });
});