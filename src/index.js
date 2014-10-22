var unicodeMatchers = require('./unicode');
var multiByteCharsetMatchers = require('./mbcs');
var iso2022 = require('./2022');

var singleByteCharsetMatchers = require('./sbcs');

var DEFAULT_CS_RECOGNIZERS = [
  require('./charset-recog-utf8'),
  unicodeMatchers['UTF-16BE'],
  unicodeMatchers['UTF-16LE'],
  unicodeMatchers['UTF-32BE'],
  unicodeMatchers['UTF-32LE'],

  multiByteCharsetMatchers.Shift_JIS,
  iso2022["ISO-2022-JP"],
  iso2022["ISO-2022-CN"],
  iso2022["ISO-2022-KR"],
  multiByteCharsetMatchers.GB18030,
  multiByteCharsetMatchers['EUC-JP'],
  multiByteCharsetMatchers['EUC-KR'],
  multiByteCharsetMatchers.Big5,

  singleByteCharsetMatchers['ISO-8859-1'],
  singleByteCharsetMatchers['ISO-8859-2'],
  singleByteCharsetMatchers['ISO-8859-5'],
  singleByteCharsetMatchers['ISO-8859-6'],
  singleByteCharsetMatchers['ISO-8859-7'],
  singleByteCharsetMatchers['ISO-8859-8-I'],
  singleByteCharsetMatchers['ISO-8859-8'],
  singleByteCharsetMatchers['windows-1251'],
  singleByteCharsetMatchers['windows-1256'],
  singleByteCharsetMatchers['KOIR8-R'],
  singleByteCharsetMatchers['ISO-8859-9']

  //ibm matchers not used
];


var ALL_CS_RECOGNIZERS = DEFAULT_CS_RECOGNIZERS.concat([
  singleByteCharsetMatchers.IBM420_ltr,
  singleByteCharsetMatchers.IBM420_rtl,
  singleByteCharsetMatchers.IBM424_ltr,
  singleByteCharsetMatchers.IBM424_rtl
]);

function collectInputStats(input) {
  var inputLength = input.length;
  var byteStats = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ];


  //
  // Tally up the byte occurence statistics.
  //   These are available for use by the various detectors.
  //
  for(var srci = 0; srci < inputLength; srci++) {
    var val = input[srci] & 0x00ff;
    byteStats[val]++;
  }

  var c1Bytes = false;
  for(var i = 0x80; i <= 0x9F; i += 1) {
    if(byteStats[i] != 0) {
      c1Bytes = true;
      break;
    }
  }

  return {c1Bytes: c1Bytes, byteStats: byteStats};
}

/**
 * Return all detectable charset for given input with confidence level
 * @param {Buffer} input
 * @returns {Array<CharsetMatch>}
 */
module.exports = function detect(input, matchers) {
  matchers = matchers || DEFAULT_CS_RECOGNIZERS;
  var matchersLength = matchers.length;

  var stat = collectInputStats(input);//collect byte stats.

  var matches = [];

  //  Iterate over all possible charsets, remember all that
  //    give a match quality > 0.
  for(var i = 0; i < matchersLength; i++) {
    var matcher = matchers[i];
    var m = matcher(input, stat);
    if(m != null) {
      matches.push(m);
    }
  }

  matches.sort(function(a, b) {
    return b.confidence - a.confidence;
  });

  return matches;
};

module.exports.ALL_CS_RECOGNIZERS = ALL_CS_RECOGNIZERS;
module.exports.DEFAULT_CS_RECOGNIZERS = DEFAULT_CS_RECOGNIZERS;