var NGramParser = require('./ngram-parser');


var unshapeMap = [
  /*            -0    -1    -2    -3    -4    -5    -6    -7    -8    -9    -A    -B    -C    -D    -E    -F   */
  /* 0- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 1- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 2- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 3- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 4- */    0x40, 0x40, 0x42, 0x42, 0x44, 0x45, 0x46, 0x47, 0x47, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, 0x4E, 0x4F,
  /* 5- */    0x50, 0x49, 0x52, 0x53, 0x54, 0x55, 0x56, 0x56, 0x58, 0x58, 0x5A, 0x5B, 0x5C, 0x5D, 0x5E, 0x5F,
  /* 6- */    0x60, 0x61, 0x62, 0x63, 0x63, 0x65, 0x65, 0x67, 0x67, 0x69, 0x6A, 0x6B, 0x6C, 0x6D, 0x6E, 0x6F,
  /* 7- */    0x69, 0x71, 0x71, 0x73, 0x74, 0x75, 0x76, 0x77, 0x77, 0x79, 0x7A, 0x7B, 0x7C, 0x7D, 0x7E, 0x7F,
  /* 8- */    0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x80, 0x8B, 0x8B, 0x8D, 0x8D, 0x8F,
  /* 9- */    0x90, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0x9A, 0x9A, 0x9A, 0x9E, 0x9E,
  /* A- */    0x9E, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0x9E, 0xAB, 0xAB, 0xAD, 0xAD, 0xAF,
  /* B- */    0xAF, 0xB1, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xB1, 0xBB, 0xBB, 0xBD, 0xBD, 0xBF,
  /* C- */    0xC0, 0xC1, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6, 0xC7, 0xC8, 0xC9, 0xCA, 0xBF, 0xCC, 0xBF, 0xCE, 0xCF,
  /* D- */    0xD0, 0xD1, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7, 0xD8, 0xD9, 0xDA, 0xDA, 0xDC, 0xDC, 0xDC, 0xDF,
  /* E- */    0xE0, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7, 0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xEE, 0xEF,
  /* F- */    0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0xFF
];

function isLamAlef(b) {
  if(b == 0xb2 || b == 0xb3) {
    return 0x47;
  } else if(b == 0xb4 || b == 0xb5) {
    return 0x49;
  } else if(b == 0xb8 || b == 0xb9) {
    return 0x56;
  } else
    return 0x00;
}

function NGramParser_IBM420(theNgramList, theByteMap) {
  this.alef = 0x00;
  NGramParser.call(this, theNgramList, theByteMap);
}

NGramParser_IBM420.prototype = Object.create(NGramParser.prototype);

NGramParser_IBM420.prototype.nextByte = function(input) {
  if(this.byteIndex >= input.length || input[this.byteIndex] == 0) {
    return -1;
  }
  var next;

  this.alef = isLamAlef(input[this.byteIndex]);
  if(this.alef != 0x00)
    next = 0xB1 & 0xFF;
  else
    next = unshapeMap[input[this.byteIndex] & 0xFF] & 0xFF;

  this.byteIndex++;

  return next;
};

NGramParser_IBM420.prototype.parseCharacters = function(input) {
  var b;
  var ignoreSpace = false;

  while((b = this.nextByte(input)) >= 0) {
    var mb = this.byteMap[b];

    // TODO: 0x20 might not be a space in all character sets...
    if(mb != 0) {
      if(!(mb == this.spaceChar && ignoreSpace)) {
        this.addByte(mb);
      }

      ignoreSpace = (mb == this.spaceChar);
    }
    if(this.alef != 0x00) {
      mb = this.byteMap[this.alef & 0xFF];

      // TODO: 0x20 might not be a space in all character sets...
      if(mb != 0) {
        if(!(mb == this.spaceChar && ignoreSpace)) {
          this.addByte(mb);
        }

        ignoreSpace = (mb == this.spaceChar);
      }

    }
  }
};

module.exports = NGramParser_IBM420;