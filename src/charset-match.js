/**
 * Created by lilya on 19.10.2014.
 */

function CharsetMatch(conf, csName, lang) {
  this.confidence = conf;
  this.charsetName = csName;
  this.lang = lang;
}

module.exports = CharsetMatch;