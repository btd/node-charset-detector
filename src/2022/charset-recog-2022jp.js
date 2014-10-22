var escapeSequences = [
  [0x1b, 0x24, 0x28, 0x43],   // KS X 1001:1992
  [0x1b, 0x24, 0x28, 0x44],   // JIS X 212-1990
  [0x1b, 0x24, 0x40],         // JIS C 6226-1978
  [0x1b, 0x24, 0x41],         // GB 2312-80
  [0x1b, 0x24, 0x42],         // JIS X 208-1983
  [0x1b, 0x26, 0x40],         // JIS X 208 1990, 1997
  [0x1b, 0x28, 0x42],         // ASCII
  [0x1b, 0x28, 0x48],         // JIS-Roman
  [0x1b, 0x28, 0x49],         // Half-width katakana
  [0x1b, 0x28, 0x4a],         // JIS-Roman
  [0x1b, 0x2e, 0x41],         // ISO 8859-1
  [0x1b, 0x2e, 0x46]          // ISO 8859-7
];

var name = "ISO-2022-JP";

var baseMatch = require('./base');
var CharsetMatch = require('../charset-match');

module.exports = function(input) {
  var confidence = baseMatch(input, input.length, escapeSequences);
  return confidence == 0 ? null : new CharsetMatch(confidence, name);
}