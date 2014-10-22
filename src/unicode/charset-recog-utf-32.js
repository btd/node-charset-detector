var CharsetMatch = require('../charset-match');

module.exports = function(getChar, name) {
  return function(input) {
    var limit = (input.length / 4) * 4;
    var numValid = 0;
    var numInvalid = 0;
    var hasBOM = false;
    var confidence = 0;

    if(limit == 0) {
      return null;
    }
    if(getChar(input, 0) == 0x0000FEFF) {
      hasBOM = true;
    }

    for(var i = 0; i < limit; i += 4) {
      var ch = getChar(input, i);

      if(ch < 0 || ch >= 0x10FFFF || (ch >= 0xD800 && ch <= 0xDFFF)) {
        numInvalid += 1;
      } else {
        numValid += 1;
      }
    }


    // Cook up some sort of confidence score, based on presence of a BOM
    //    and the existence of valid and/or invalid multi-byte sequences.
    if(hasBOM && numInvalid == 0) {
      confidence = 100;
    } else if(hasBOM && numValid > numInvalid * 10) {
      confidence = 80;
    } else if(numValid > 3 && numInvalid == 0) {
      confidence = 100;
    } else if(numValid > 0 && numInvalid == 0) {
      confidence = 80;
    } else if(numValid > numInvalid * 10) {
      // Probably corrupt UTF-32BE data.  Valid sequences aren't likely by chance.
      confidence = 25;
    }

    return confidence == 0 ? null : new CharsetMatch(confidence, name);
  }
}