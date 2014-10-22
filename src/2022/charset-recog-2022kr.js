var escapeSequences = [
  [0x1b, 0x24, 0x29, 0x43]
];

var name = "ISO-2022-KR";

var baseMatch = require('./base');
var CharsetMatch = require('../charset-match');

module.exports = function(input) {
  var confidence = baseMatch(input, input.length, escapeSequences);
  return confidence == 0 ? null : new CharsetMatch(confidence, name);
}