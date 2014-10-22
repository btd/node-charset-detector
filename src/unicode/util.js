exports.codeUnit16FromBytes = function codeUnit16FromBytes(hi, lo) {
  return ((hi & 0xff) << 8) | (lo & 0xff);
}

// UTF-16 confidence calculation. Very simple minded, but better than nothing.
//   Any 8 bit non-control characters bump the confidence up. These have a zero high byte,
//     and are very likely to be UTF-16, although they could also be part of a UTF-32 code.
//   NULs are a contra-indication, they will appear commonly if the actual encoding is UTF-32.
//   NULs should be rare in actual text.
exports.adjustConfidence = function adjustConfidence(codeUnit, confidence) {
  if(codeUnit == 0) {
    confidence -= 10;
  } else if((codeUnit >= 0x20 && codeUnit <= 0xff) || codeUnit == 0x0a) {
    confidence += 10;
  }
  if(confidence < 0) {
    confidence = 0;
  } else if(confidence > 100) {
    confidence = 100;
  }
  return confidence;
}