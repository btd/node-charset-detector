var escapeSequences = [
  [0x1b, 0x24, 0x29, 0x41],   // GB 2312-80
  [0x1b, 0x24, 0x29, 0x47],   // CNS 11643-1992 Plane 1
  [0x1b, 0x24, 0x2A, 0x48],   // CNS 11643-1992 Plane 2
  [0x1b, 0x24, 0x29, 0x45],   // ISO-IR-165
  [0x1b, 0x24, 0x2B, 0x49],   // CNS 11643-1992 Plane 3
  [0x1b, 0x24, 0x2B, 0x4A],   // CNS 11643-1992 Plane 4
  [0x1b, 0x24, 0x2B, 0x4B],   // CNS 11643-1992 Plane 5
  [0x1b, 0x24, 0x2B, 0x4C],   // CNS 11643-1992 Plane 6
  [0x1b, 0x24, 0x2B, 0x4D],   // CNS 11643-1992 Plane 7
  [0x1b, 0x4e],               // SS2
  [0x1b, 0x4f],               // SS3
];

var name = "ISO-2022-CN";

var baseMatch = require('./base');
var CharsetMatch = require('../charset-match');

module.exports = function(input) {
  var confidence = baseMatch(input, input.length, escapeSequences);
  return confidence == 0 ? null : new CharsetMatch(confidence, name);
};