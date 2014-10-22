var byteMap = [
  /*            -0    -1    -2    -3    -4    -5    -6    -7    -8    -9    -A    -B    -C    -D    -E    -F   */
  /* 0- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 1- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 2- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 3- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 4- */    0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 5- */    0x40, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 6- */    0x40, 0x40, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 7- */    0x40, 0x71, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x00, 0x40, 0x40,
  /* 8- */    0x40, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* 9- */    0x40, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* A- */    0xA0, 0x40, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* B- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* C- */    0x40, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* D- */    0x40, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* E- */    0x40, 0x40, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  /* F- */    0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40
];

var ngrams = {
  "IBM424_rtl": [
    0x404146, 0x404148, 0x404151, 0x404171, 0x404251, 0x404256, 0x404541, 0x404546, 0x404551, 0x404556, 0x404562, 0x404569, 0x404571, 0x405441, 0x405445, 0x405641,
    0x406254, 0x406954, 0x417140, 0x454041, 0x454042, 0x454045, 0x454054, 0x454056, 0x454069, 0x454641, 0x464140, 0x465540, 0x465740, 0x466840, 0x467140, 0x514045,
    0x514540, 0x514671, 0x515155, 0x515540, 0x515740, 0x516840, 0x517140, 0x544041, 0x544045, 0x544140, 0x544540, 0x554041, 0x554042, 0x554045, 0x554054, 0x554056,
    0x554069, 0x564540, 0x574045, 0x584540, 0x585140, 0x585155, 0x625440, 0x684045, 0x685155, 0x695440, 0x714041, 0x714042, 0x714045, 0x714054, 0x714056, 0x714069
  ],
  "IBM424_ltr": [
    0x404146, 0x404154, 0x404551, 0x404554, 0x404556, 0x404558, 0x405158, 0x405462, 0x405469, 0x405546, 0x405551, 0x405746, 0x405751, 0x406846, 0x406851, 0x407141,
    0x407146, 0x407151, 0x414045, 0x414054, 0x414055, 0x414071, 0x414540, 0x414645, 0x415440, 0x415640, 0x424045, 0x424055, 0x424071, 0x454045, 0x454051, 0x454054,
    0x454055, 0x454057, 0x454068, 0x454071, 0x455440, 0x464140, 0x464540, 0x484140, 0x514140, 0x514240, 0x514540, 0x544045, 0x544055, 0x544071, 0x546240, 0x546940,
    0x555151, 0x555158, 0x555168, 0x564045, 0x564055, 0x564071, 0x564240, 0x564540, 0x624540, 0x694045, 0x694055, 0x694071, 0x694540, 0x714140, 0x714540, 0x714651
  ]
};

var CharsetMatch = require('../charset-match');
var base = require('./base');

function genMatcher(name) {
  var ng = ngrams[name];
  return function(input) {
    var confidence = base.match(input, ng, byteMap, 0x40);
    return confidence == 0 ? null : new CharsetMatch(confidence, name, "he");
  }
}

exports.IBM424_rtl = genMatcher('IBM424_rtl');

exports.IBM424_ltr = genMatcher('IBM424_ltr');