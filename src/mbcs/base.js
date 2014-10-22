function iteratedChar(input) {
  this.charValue = 0;             // 1-4 bytes from the raw input data
  this.index = 0;
  this.nextIndex = 0;
  this.error = false;
  this.done = false;

  this.input = input;
  this.inputLength = input.length;
}

iteratedChar.prototype = {
  reset: function() {
    this.charValue = 0;
    this.index = -1;
    this.nextIndex = 0;
    this.error = false;
    this.done = false;
  },
  nextByte: function() {
    if(this.nextIndex >= this.inputLength) {
      this.done = true;
      return -1;
    }
    var byteValue = this.input[this.nextIndex++] & 0x00ff;
    return byteValue;
  }
};

module.exports = function(commonChars, nextChar) {
  return function(input) {
    var singleByteCharCount = 0;  //TODO Do we really need this?
    var doubleByteCharCount = 0;
    var commonCharCount = 0;
    var badCharCount = 0;
    var totalCharCount = 0;
    var confidence = 0;
    var iter = new iteratedChar(input);

    detectBlock: {
      for(iter.reset(); nextChar(iter);) {
        totalCharCount++;
        if(iter.error) {
          badCharCount++;
        } else {
          var cv = iter.charValue & 0xFFFFFFFF;

          if(cv <= 0xff) {
            singleByteCharCount++;
          } else {
            doubleByteCharCount++;
            if(commonChars != null) {
              // NOTE: This assumes that there are no 4-byte common chars.
              if(commonChars.indexOf(cv) >= 0) {
                commonCharCount++;
              }
            }
          }
        }
        if(badCharCount >= 2 && badCharCount * 5 >= doubleByteCharCount) {
          // Bail out early if the byte data is not matching the encoding scheme.
          break detectBlock;
        }
      }

      if(doubleByteCharCount <= 10 && badCharCount == 0) {
        // Not many multi-byte chars.
        if(doubleByteCharCount == 0 && totalCharCount < 10) {
          // There weren't any multibyte sequences, and there was a low density of non-ASCII single bytes.
          // We don't have enough data to have any confidence.
          // Statistical analysis of single byte non-ASCII charcters would probably help here.
          confidence = 0;
        }
        else {
          //   ASCII or ISO file?  It's probably not our encoding,
          //   but is not incompatible with our encoding, so don't give it a zero.
          confidence = 10;
        }

        break detectBlock;
      }

      //
      //  No match if there are too many characters that don't fit the encoding scheme.
      //    (should we have zero tolerance for these?)
      //
      if(doubleByteCharCount < 20 * badCharCount) {
        confidence = 0;
        break detectBlock;
      }

      if(commonChars == null) {
        // We have no statistics on frequently occuring characters.
        //  Assess confidence purely on having a reasonable number of
        //  multi-byte characters (the more the better
        confidence = 30 + doubleByteCharCount - 20 * badCharCount;
        if(confidence > 100) {
          confidence = 100;
        }
      } else {
        //
        // Frequency of occurence statistics exist.
        //
        var maxVal = Math.log(doubleByteCharCount / 4);
        var scaleFactor = 90.0 / maxVal;
        confidence = Math.log(commonCharCount + 1) * scaleFactor + 10;
        confidence = Math.min(confidence, 100);
      }
    }   // end of detectBlock:

    return confidence;
  }
}