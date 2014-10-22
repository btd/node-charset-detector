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
  0x20, 0xB1, 0x20, 0xB3, 0x20, 0xB5, 0xB6, 0x20,
  0x20, 0xB9, 0xBA, 0xBB, 0xBC, 0x20, 0xBE, 0xBF,
  0x20, 0xB1, 0x20, 0xB3, 0x20, 0xB5, 0xB6, 0xB7,
  0x20, 0xB9, 0xBA, 0xBB, 0xBC, 0x20, 0xBE, 0xBF,
  0xE0, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7,
  0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xEE, 0xEF,
  0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0x20,
  0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0xDF,
  0xE0, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7,
  0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xEE, 0xEF,
  0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0x20,
  0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0x20
];

var base = require('./base');
var NGramsPlusLang = base.NGramsPlusLang;

var ngrams_8859_2 = [
  new NGramsPlusLang(
    "cs",
    [
      0x206120, 0x206279, 0x20646F, 0x206A65, 0x206E61, 0x206E65, 0x206F20, 0x206F64, 0x20706F, 0x207072, 0x2070F8, 0x20726F, 0x207365, 0x20736F, 0x207374, 0x20746F,
      0x207620, 0x207679, 0x207A61, 0x612070, 0x636520, 0x636820, 0x652070, 0x652073, 0x652076, 0x656D20, 0x656EED, 0x686F20, 0x686F64, 0x697374, 0x6A6520, 0x6B7465,
      0x6C6520, 0x6C6920, 0x6E6120, 0x6EE920, 0x6EEC20, 0x6EED20, 0x6F2070, 0x6F646E, 0x6F6A69, 0x6F7374, 0x6F7520, 0x6F7661, 0x706F64, 0x706F6A, 0x70726F, 0x70F865,
      0x736520, 0x736F75, 0x737461, 0x737469, 0x73746E, 0x746572, 0x746EED, 0x746F20, 0x752070, 0xBE6520, 0xE16EED, 0xE9686F, 0xED2070, 0xED2073, 0xED6D20, 0xF86564
    ]),
  new NGramsPlusLang(
    "hu",
    [
      0x206120, 0x20617A, 0x206265, 0x206567, 0x20656C, 0x206665, 0x206861, 0x20686F, 0x206973, 0x206B65, 0x206B69, 0x206BF6, 0x206C65, 0x206D61, 0x206D65, 0x206D69,
      0x206E65, 0x20737A, 0x207465, 0x20E973, 0x612061, 0x61206B, 0x61206D, 0x612073, 0x616B20, 0x616E20, 0x617A20, 0x62616E, 0x62656E, 0x656779, 0x656B20, 0x656C20,
      0x656C65, 0x656D20, 0x656E20, 0x657265, 0x657420, 0x657465, 0x657474, 0x677920, 0x686F67, 0x696E74, 0x697320, 0x6B2061, 0x6BF67A, 0x6D6567, 0x6D696E, 0x6E2061,
      0x6E616B, 0x6E656B, 0x6E656D, 0x6E7420, 0x6F6779, 0x732061, 0x737A65, 0x737A74, 0x737AE1, 0x73E967, 0x742061, 0x747420, 0x74E173, 0x7A6572, 0xE16E20, 0xE97320
    ]),
  new NGramsPlusLang(
    "pl",
    [
      0x20637A, 0x20646F, 0x206920, 0x206A65, 0x206B6F, 0x206D61, 0x206D69, 0x206E61, 0x206E69, 0x206F64, 0x20706F, 0x207072, 0x207369, 0x207720, 0x207769, 0x207779,
      0x207A20, 0x207A61, 0x612070, 0x612077, 0x616E69, 0x636820, 0x637A65, 0x637A79, 0x646F20, 0x647A69, 0x652070, 0x652073, 0x652077, 0x65207A, 0x65676F, 0x656A20,
      0x656D20, 0x656E69, 0x676F20, 0x696120, 0x696520, 0x69656A, 0x6B6120, 0x6B6920, 0x6B6965, 0x6D6965, 0x6E6120, 0x6E6961, 0x6E6965, 0x6F2070, 0x6F7761, 0x6F7769,
      0x706F6C, 0x707261, 0x70726F, 0x70727A, 0x727A65, 0x727A79, 0x7369EA, 0x736B69, 0x737461, 0x776965, 0x796368, 0x796D20, 0x7A6520, 0x7A6965, 0x7A7920, 0xF37720,
    ]),
  new NGramsPlusLang(
    "ro",
    [
      0x206120, 0x206163, 0x206361, 0x206365, 0x20636F, 0x206375, 0x206465, 0x206469, 0x206C61, 0x206D61, 0x207065, 0x207072, 0x207365, 0x2073E3, 0x20756E, 0x20BA69,
      0x20EE6E, 0x612063, 0x612064, 0x617265, 0x617420, 0x617465, 0x617520, 0x636172, 0x636F6E, 0x637520, 0x63E320, 0x646520, 0x652061, 0x652063, 0x652064, 0x652070,
      0x652073, 0x656120, 0x656920, 0x656C65, 0x656E74, 0x657374, 0x692061, 0x692063, 0x692064, 0x692070, 0x696520, 0x696920, 0x696E20, 0x6C6120, 0x6C6520, 0x6C6F72,
      0x6C7569, 0x6E6520, 0x6E7472, 0x6F7220, 0x70656E, 0x726520, 0x726561, 0x727520, 0x73E320, 0x746520, 0x747275, 0x74E320, 0x756920, 0x756C20, 0xBA6920, 0xEE6E20,
    ])
];

var ngrams_8859_2_length = ngrams_8859_2.length;

var CharsetMatch = require('../charset-match');

module.exports = function(input, stats) {
  var name = stats.c1Bytes ? "windows-1250" : "ISO-8859-2";
  var bestConfidenceSoFar = -1;
  var lang = null;
  for(var i = 0, l = ngrams_8859_2_length; i < l; i++) {
    var ngl = ngrams_8859_2[i];
    var confidence = base.match(input, ngl.ngrams, byteMap);
    if(confidence > bestConfidenceSoFar) {
      bestConfidenceSoFar = confidence;
      lang = ngl.lang;
    }
  }
  return bestConfidenceSoFar <= 0 ? null : new CharsetMatch(bestConfidenceSoFar, name, lang);
}