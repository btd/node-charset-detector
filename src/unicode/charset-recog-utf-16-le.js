var CharsetMatch = require('../charset-match');
var codeUnit16FromBytes = require('./util').codeUnit16FromBytes;
var adjustConfidence = require('./util').adjustConfidence;

var name = "UTF-16LE";


module.exports = function(input) {
  var confidence = 10;

  var bytesToCheck = Math.min(input.length, 30);
  for(var charIndex = 0; charIndex < bytesToCheck - 1; charIndex += 2) {
    var codeUnit = codeUnit16FromBytes(input[charIndex + 1], input[charIndex]);
    if(charIndex == 0 && codeUnit == 0xFEFF) {
      confidence = 100;
      break;
    }
    confidence = adjustConfidence(codeUnit, confidence);
    if(confidence == 0 || confidence == 100) {
      break;
    }
  }
  if(bytesToCheck < 4 && confidence < 100) {
    confidence = 0;
  }
  if(confidence > 0) {
    return new CharsetMatch(confidence, name);
  }
  return null;
}