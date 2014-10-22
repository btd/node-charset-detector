var assert = require('assert');
var fs = require('fs');
var path = require('path');

var detect = require('../src');

function testCharset(csName, expectedConfidence, matchers) {
  var buffer = fs.readFileSync(path.join(__dirname, 'fixtures', csName.toLowerCase() + '.txt'));

  var m = detect(buffer, matchers)[0];

  assert.equal(m.charsetName, csName);
  if(expectedConfidence != null) {
    assert.equal(m.confidence, 100);
  }
}

it('should detect UTF-8', function() {
  testCharset('UTF-8', 100);
});

it('should detect UTF-16LE', function() {
  testCharset('UTF-16LE', 100);
});

it('should detect UTF-16BE', function() {
  testCharset('UTF-16BE', 100);
});

it('should detect c1Bytes', function() {
  testCharset('windows-1252');
  testCharset("ISO-8859-1");
});

it('should work with small inputs', function() {
  var input, m;

  var bytes = [
    [0x0a],
    [0x41, 0x42],
    [0x41, 0x42, 0x43],
    [0x41, 0x42, 0x43, 0x44]
  ];

  bytes.forEach(function(b, idx) {
    input = new Buffer(b);
    m = detect(input);

    assert.ok(m.length > 0);
  });
});

it('should detect charsets', function() {
  var detectionTestsPath = path.join(__dirname, 'fixtures', 'charset-detection');
  var detectionTests = fs.readdirSync(detectionTestsPath);
  detectionTests.forEach(function(dirName) {
    var testDirPath = path.join(detectionTestsPath, dirName);
    var testFilesNames = fs.readdirSync(testDirPath);
    testFilesNames.forEach(function(testFileName) {
      var csName = path.basename(testFileName, '.txt');

      var testFilePath = path.join(testDirPath, testFileName);
      var txt = fs.readFileSync(testFilePath);
      var m = detect(txt);
      assert(m.length > 0);
      assert.equal(csName, m[0].charsetName);
    });
  });
});

it('should detect japanese', function() {
  testCharset('EUC-JP');
});

it('should detect arabic', function() {
  testCharset('windows-1256');

  var m;

  var ibm420_rtl = [
    0xCF, 0x8D, 0x9A, 0x63, 0x40, 0xCF, 0xBD, 0xAB,
    0x74, 0x63, 0x40, 0x58, 0x75, 0x56, 0xBB, 0x67,
    0x40, 0x63, 0x49, 0xBB, 0xDC, 0xBD, 0x40, 0x9A,
    0x73, 0xDC, 0x73, 0x62, 0x40, 0xAB, 0xDC, 0x40,
    0xBB, 0x52, 0x77, 0x77, 0x62, 0x40, 0x56, 0xB1,
    0x63, 0x49, 0xBB, 0xDC, 0xBD, 0x40, 0x56, 0xB1,
    0xCF, 0x8F, 0xBD, 0xDC, 0x6B, 0x40, 0xBB, 0x9A,
    0x40, 0xBB, 0xB1, 0x56, 0x55, 0xBB, 0x63, 0xBF,
    0x56, 0x40, 0x73, 0x56, 0x55, 0xBB, 0x56, 0x40,
    0xB1, 0xB1, 0x56, 0x69, 0x63, 0xDC, 0x56, 0x67,
    0x56, 0x63, 0x40, 0x56, 0xB1, 0xBB, 0x63, 0x9E,
    0xDC, 0x75, 0x62, 0x40, 0xB1, 0xB1, 0xBB, 0x67,
    0x63, 0xBB, 0x9A, 0x40, 0xCF, 0xB1, 0xB1, 0x73,
    0xCF, 0xB1, 0x62, 0x4B, 0x40, 0x63, 0xCF, 0x77,
    0x9A, 0x63, 0x40, 0xCF, 0x63, 0x8F, 0xCF, 0x75,
    0x63, 0x40, 0x56, 0xB1, 0xBB, 0x52, 0x77, 0x77,
    0x62, 0x40, 0x58, 0xBF, 0x73, 0xAB, 0x40, 0x8D,
    0xBB, 0x56, 0xBD, 0x40, 0x80, 0x58, 0xAF, 0x62,
    0x40, 0x49, 0xBB, 0x56, 0xBD, 0x40, 0xB1, 0x77,
    0xAF, 0x56, 0xBD, 0x40, 0x73, 0xCF, 0xB1, 0x62,
    0x40, 0x56, 0x77, 0x75, 0x56, 0x55, 0xDC, 0xB1,
    0x40, 0x58, 0xCF, 0x67, 0xBF, 0x40, 0x56, 0xB1,
    0xBB, 0x71, 0x56, 0x8F, 0x75, 0x40, 0x56, 0xB1,
    0x56, 0xAD, 0x63, 0x8B, 0x56, 0x73, 0xDC, 0x62,
    0x40, 0xCF, 0x56, 0xB1, 0x56, 0x67, 0x63, 0xBB,
    0x56, 0x9A, 0xDC, 0x62, 0x4B
  ];

  m = detect(new Buffer(ibm420_rtl), detect.ALL_CS_RECOGNIZERS);
  assert.equal(m[0].charsetName, 'IBM420_rtl');

  var ibm420_ltr = [
    0x4B, 0x62, 0xDC, 0x9A, 0x56, 0xBB, 0x63, 0x67,
    0x56, 0xB1, 0x56, 0xCF, 0x40, 0x62, 0xDC, 0x73,
    0x56, 0x8B, 0x63, 0xAD, 0x56, 0xB1, 0x56, 0x40,
    0x75, 0x8F, 0x56, 0x71, 0xBB, 0xB1, 0x56, 0x40,
    0xBF, 0x67, 0xCF, 0x58, 0x40, 0xB1, 0xDC, 0x55,
    0x56, 0x75, 0x77, 0x56, 0x40, 0x62, 0xB1, 0xCF,
    0x73, 0x40, 0xBD, 0x56, 0xAF, 0x77, 0xB1, 0x40,
    0xBD, 0x56, 0xBB, 0x49, 0x40, 0x62, 0xAF, 0x58,
    0x80, 0x40, 0xBD, 0x56, 0xBB, 0x8D, 0x40, 0xAB,
    0x73, 0xBF, 0x58, 0x40, 0x62, 0x77, 0x77, 0x52,
    0xBB, 0xB1, 0x56, 0x40, 0x63, 0x75, 0xCF, 0x8F,
    0x63, 0xCF, 0x40, 0x63, 0x9A, 0x77, 0xCF, 0x63,
    0x40, 0x4B, 0x62, 0xB1, 0xCF, 0x73, 0xB1, 0xB1,
    0xCF, 0x40, 0x9A, 0xBB, 0x63, 0x67, 0xBB, 0xB1,
    0xB1, 0x40, 0x62, 0x75, 0xDC, 0x9E, 0x63, 0xBB,
    0xB1, 0x56, 0x40, 0x63, 0x56, 0x67, 0x56, 0xDC,
    0x63, 0x69, 0x56, 0xB1, 0xB1, 0x40, 0x56, 0xBB,
    0x55, 0x56, 0x73, 0x40, 0x56, 0xBF, 0x63, 0xBB,
    0x55, 0x56, 0xB1, 0xBB, 0x40, 0x9A, 0xBB, 0x40,
    0x6B, 0xDC, 0xBD, 0x8F, 0xCF, 0xB1, 0x56, 0x40,
    0xBD, 0xDC, 0xBB, 0x49, 0x63, 0xB1, 0x56, 0x40,
    0x62, 0x77, 0x77, 0x52, 0xBB, 0x40, 0xDC, 0xAB,
    0x40, 0x62, 0x73, 0xDC, 0x73, 0x9A, 0x40, 0xBD,
    0xDC, 0xBB, 0x49, 0x63, 0x40, 0x67, 0xBB, 0x56,
    0x75, 0x58, 0x40, 0x63, 0x74, 0xAB, 0xBD, 0xCF,
    0x40, 0x63, 0x9A, 0x8D, 0xCF
  ];

  m = detect(new Buffer(ibm420_ltr), detect.ALL_CS_RECOGNIZERS);
  assert.equal(m[0].charsetName, 'IBM420_ltr');
});

it('should detect hebrew', function() {
  testCharset('ISO-8859-8');
  testCharset('ISO-8859-8-I');

  testCharset('IBM424_rtl', null, detect.ALL_CS_RECOGNIZERS);
  testCharset('IBM424_ltr', null, detect.ALL_CS_RECOGNIZERS);
});

it('should not throw anything in utf-16-le', function() {
  detect(new Buffer([0x00, 0x00, 0x00, 0x00]));
});

it('should detect gb18030', function() {
  testCharset('GB18030');
});