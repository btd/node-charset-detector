var CharsetMatch = require('../charset-match');

var commonChars =
  // TODO:  This set of data comes from the character frequency-
  //        of-occurence analysis tool.  The data needs to be moved
  //        into a resource and loaded from there.
  [0xa1a1, 0xa1a2, 0xa1a3, 0xa1a4, 0xa1b0, 0xa1b1, 0xa1f1, 0xa1f3, 0xa3a1, 0xa3ac,
    0xa3ba, 0xb1a8, 0xb1b8, 0xb1be, 0xb2bb, 0xb3c9, 0xb3f6, 0xb4f3, 0xb5bd, 0xb5c4,
    0xb5e3, 0xb6af, 0xb6d4, 0xb6e0, 0xb7a2, 0xb7a8, 0xb7bd, 0xb7d6, 0xb7dd, 0xb8b4,
    0xb8df, 0xb8f6, 0xb9ab, 0xb9c9, 0xb9d8, 0xb9fa, 0xb9fd, 0xbacd, 0xbba7, 0xbbd6,
    0xbbe1, 0xbbfa, 0xbcbc, 0xbcdb, 0xbcfe, 0xbdcc, 0xbecd, 0xbedd, 0xbfb4, 0xbfc6,
    0xbfc9, 0xc0b4, 0xc0ed, 0xc1cb, 0xc2db, 0xc3c7, 0xc4dc, 0xc4ea, 0xc5cc, 0xc6f7,
    0xc7f8, 0xc8ab, 0xc8cb, 0xc8d5, 0xc8e7, 0xc9cf, 0xc9fa, 0xcab1, 0xcab5, 0xcac7,
    0xcad0, 0xcad6, 0xcaf5, 0xcafd, 0xccec, 0xcdf8, 0xceaa, 0xcec4, 0xced2, 0xcee5,
    0xcfb5, 0xcfc2, 0xcfd6, 0xd0c2, 0xd0c5, 0xd0d0, 0xd0d4, 0xd1a7, 0xd2aa, 0xd2b2,
    0xd2b5, 0xd2bb, 0xd2d4, 0xd3c3, 0xd3d0, 0xd3fd, 0xd4c2, 0xd4da, 0xd5e2, 0xd6d0];

function nextChar(it) {
  it.index = it.nextIndex;
  it.error = false;
  var firstByte = 0;
  var secondByte = 0;
  var thirdByte = 0;
  var fourthByte = 0;

  buildChar: {
    firstByte = it.charValue = it.nextByte();

    if(firstByte < 0) {
      // Ran off the end of the input data
      it.done = true;
      break buildChar;
    }

    if(firstByte <= 0x80) {
      // single byte char
      break buildChar;
    }

    secondByte = it.nextByte();
    it.charValue = (it.charValue << 8) | secondByte;

    if(firstByte >= 0x81 && firstByte <= 0xFE) {
      // Two byte Char
      if((secondByte >= 0x40 && secondByte <= 0x7E) || (secondByte >= 80 && secondByte <= 0xFE)) {
        break buildChar;
      }

      // Four byte char
      if(secondByte >= 0x30 && secondByte <= 0x39) {
        thirdByte = it.nextByte();

        if(thirdByte >= 0x81 && thirdByte <= 0xFE) {
          fourthByte = it.nextByte();

          if(fourthByte >= 0x30 && fourthByte <= 0x39) {
            it.charValue = (it.charValue << 16) | (thirdByte << 8) | fourthByte;
            break buildChar;
          }
        }
      }

      it.error = true;
      break buildChar;
    }
  }

  return (it.done == false);
}

var match = require('./base')(commonChars, nextChar);

module.exports = function(input) {
  var confidence = match(input);
  return confidence == 0 ? null : new CharsetMatch(confidence, "GB18030", "zh");
}