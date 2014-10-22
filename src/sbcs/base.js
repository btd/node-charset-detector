var NGramParser = require('./ngram-parser');
var NGramParser_IBM420 = require('./ngram-parser-ibm420');

module.exports.match = function(input, ngrams, byteMap, spaceChar) {
  spaceChar = spaceChar || 0x20;
  var parser = new NGramParser(ngrams, byteMap);
  return parser.parse(input, spaceChar);
};

module.exports.matchIBM420 = function(input, ngrams, byteMap, spaceChar) {
  spaceChar = spaceChar || 0x20;
  var parser = new NGramParser_IBM420(ngrams, byteMap);
  return parser.parse(input, spaceChar);
};

module.exports.NGramsPlusLang = function(la, ng) {
  this.lang   = la;
  this.ngrams = ng;
}