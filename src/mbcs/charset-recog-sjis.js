var CharsetMatch = require('../charset-match');

var commonChars =
  // TODO:  This set of data comes from the character frequency-
  //        of-occurence analysis tool.  The data needs to be moved
  //        into a resource and loaded from there.
  [0x8140, 0x8141, 0x8142, 0x8145, 0x815b, 0x8169, 0x816a, 0x8175, 0x8176, 0x82a0,
    0x82a2, 0x82a4, 0x82a9, 0x82aa, 0x82ab, 0x82ad, 0x82af, 0x82b1, 0x82b3, 0x82b5,
    0x82b7, 0x82bd, 0x82be, 0x82c1, 0x82c4, 0x82c5, 0x82c6, 0x82c8, 0x82c9, 0x82cc,
    0x82cd, 0x82dc, 0x82e0, 0x82e7, 0x82e8, 0x82e9, 0x82ea, 0x82f0, 0x82f1, 0x8341,
    0x8343, 0x834e, 0x834f, 0x8358, 0x835e, 0x8362, 0x8367, 0x8375, 0x8376, 0x8389,
    0x838a, 0x838b, 0x838d, 0x8393, 0x8e96, 0x93fa, 0x95aa];

function nextChar(it) {
  it.index = it.nextIndex;
  it.error = false;
  var firstByte = it.charValue = it.nextByte();
  if(firstByte < 0) {
    return false;
  }

  if(firstByte <= 0x7f || (firstByte > 0xa0 && firstByte <= 0xdf)) {
    return true;
  }

  var secondByte = it.nextByte();
  if(secondByte < 0) {
    return false;
  }
  it.charValue = (firstByte << 8) | secondByte;
  if(!((secondByte >= 0x40 && secondByte <= 0x7f) || (secondByte >= 0x80 && secondByte <= 0xff))) {
    // Illegal second byte value.
    it.error = true;
  }
  return true;
}

var match = require('./base')(commonChars, nextChar);

module.exports = function(input) {
  var confidence = match(input);
  return confidence == 0 ? null : new CharsetMatch(confidence, "Shift_JIS", "ja");
}