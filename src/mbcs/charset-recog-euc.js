var CharsetMatch = require('../charset-match');

function nextChar(it) {
  it.index = it.nextIndex;
  it.error = false;
  var firstByte = 0;
  var secondByte = 0;
  var thirdByte = 0;
  //int fourthByte = 0;

  buildChar: {
    firstByte = it.charValue = it.nextByte();
    if(firstByte < 0) {
      // Ran off the end of the input data
      it.done = true;
      break buildChar;
    }
    if(firstByte <= 0x8d) {
      // single byte char
      break buildChar;
    }

    secondByte = it.nextByte();
    it.charValue = (it.charValue << 8) | secondByte;

    if(firstByte >= 0xA1 && firstByte <= 0xfe) {
      // Two byte Char
      if(secondByte < 0xa1) {
        it.error = true;
      }
      break buildChar;
    }
    if(firstByte == 0x8e) {
      // Code Set 2.
      //   In EUC-JP, total char size is 2 bytes, only one byte of actual char value.
      //   In EUC-TW, total char size is 4 bytes, three bytes contribute to char value.
      // We don't know which we've got.
      // Treat it like EUC-JP.  If the data really was EUC-TW, the following two
      //   bytes will look like a well formed 2 byte char.
      if(secondByte < 0xa1) {
        it.error = true;
      }
      break buildChar;
    }

    if(firstByte == 0x8f) {
      // Code set 3.
      // Three byte total char size, two bytes of actual char value.
      thirdByte = it.nextByte();
      it.charValue = (it.charValue << 8) | thirdByte;
      if(thirdByte < 0xa1) {
        it.error = true;
      }
    }
  }

  return (it.done == false);
}

var base = require('./base');

module.exports = function(commonChars) {
  return base(commonChars, nextChar);
};