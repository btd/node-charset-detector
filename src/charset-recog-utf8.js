/**
 * Created by lilya on 19.10.2014.
 */

var CharsetMatch = require('./charset-match');

var name = "UTF-8";
module.exports = function(input) {
  var hasBOM = false, numValid = 0, numInvalid = 0, i, trailBytes = 0, confidence, inputLength = input.length;

  if(inputLength >= 3 &&
    (input[0] & 0xFF) == 0xEF && (input[1] & 0xFF) == 0xBB && (input[2] & 0xFF) == 0xBF) {
    hasBOM = true;
  }

  // Scan for multi-byte sequences
  for(i = 0; i < inputLength; i++) {
    var b = input[i];
    if((b & 0x80) == 0) {
      continue;   // ASCII
    }

    // Hi bit on char found.  Figure out how long the sequence should be
    if((b & 0x0e0) == 0x0c0) {
      trailBytes = 1;
    } else if((b & 0x0f0) == 0x0e0) {
      trailBytes = 2;
    } else if((b & 0x0f8) == 0xf0) {
      trailBytes = 3;
    } else {
      numInvalid++;
      continue;
    }

    // Verify that we've got the right number of trail bytes in the sequence
    for(; ;) {
      i++;
      if(i >= inputLength) {
        break;
      }
      b = input[i];
      if((b & 0xc0) != 0x080) {
        numInvalid++;
        break;
      }
      if(--trailBytes == 0) {
        numValid++;
        break;
      }
    }
  }

  // Cook up some sort of confidence score, based on presense of a BOM
  //    and the existence of valid and/or invalid multi-byte sequences.
  confidence = 0;
  if(hasBOM && numInvalid == 0) {
    confidence = 100;
  } else if(hasBOM && numValid > numInvalid * 10) {
    confidence = 80;
  } else if(numValid > 3 && numInvalid == 0) {
    confidence = 100;
  } else if(numValid > 0 && numInvalid == 0) {
    confidence = 80;
  } else if(numValid == 0 && numInvalid == 0) {
    // Plain ASCII. Confidence must be > 10, it's more likely than UTF-16, which
    //              accepts ASCII with confidence = 10.
    // TODO: add plain ASCII as an explicitly detected type.
    confidence = 15;
  } else if(numValid > numInvalid * 10) {
    // Probably corruput utf-8 data.  Valid sequences aren't likely by chance.
    confidence = 25;
  }
  return confidence == 0 ? null : new CharsetMatch(confidence, name);
};