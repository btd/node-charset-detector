var byteMap = [
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67,
  0x68, 0x69, 0x6A, 0x6B, 0x6C, 0x6D, 0x6E, 0x6F,
  0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77,
  0x78, 0x79, 0x7A, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67,
  0x68, 0x69, 0x6A, 0x6B, 0x6C, 0x6D, 0x6E, 0x6F,
  0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77,
  0x78, 0x79, 0x7A, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0xC1, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6, 0xC7,
  0xC8, 0xC9, 0xCA, 0xCB, 0xCC, 0xCD, 0xCE, 0xCF,
  0xD0, 0xD1, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7,
  0xD8, 0xD9, 0xDA, 0x20, 0x20, 0x20, 0x20, 0x20,
  0xE0, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7,
  0xE8, 0xE9, 0xEA, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
  0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20
];

var name = "ISO-8859-6";

var CharsetMatch = require('../charset-match');
var base = require('./base');

var ngrams = [
  0x20C7E4, 0x20C7E6, 0x20C8C7, 0x20D9E4, 0x20E1EA, 0x20E4E4, 0x20E5E6, 0x20E8C7, 0xC720C7, 0xC7C120, 0xC7CA20, 0xC7D120, 0xC7E420, 0xC7E4C3, 0xC7E4C7, 0xC7E4C8,
  0xC7E4CA, 0xC7E4CC, 0xC7E4CD, 0xC7E4CF, 0xC7E4D3, 0xC7E4D9, 0xC7E4E2, 0xC7E4E5, 0xC7E4E8, 0xC7E4EA, 0xC7E520, 0xC7E620, 0xC7E6CA, 0xC820C7, 0xC920C7, 0xC920E1,
  0xC920E4, 0xC920E5, 0xC920E8, 0xCA20C7, 0xCF20C7, 0xCFC920, 0xD120C7, 0xD1C920, 0xD320C7, 0xD920C7, 0xD9E4E9, 0xE1EA20, 0xE420C7, 0xE4C920, 0xE4E920, 0xE4EA20,
  0xE520C7, 0xE5C720, 0xE5C920, 0xE5E620, 0xE620C7, 0xE720C7, 0xE7C720, 0xE8C7E4, 0xE8E620, 0xE920C7, 0xEA20C7, 0xEA20E5, 0xEA20E8, 0xEAC920, 0xEAD120, 0xEAE620
];

module.exports['8859_6_ar'] = function(input) {
  var confidence = base.match(input, ngrams, byteMap);
  return confidence == 0 ? null : new CharsetMatch(confidence, name, 'ar');
}