function getChar(input, index) {
  return (input[index + 3] & 0xFF) << 24 | (input[index + 2] & 0xFF) << 16 |
    (input[index + 1] & 0xFF) << 8 | (input[index + 0] & 0xFF);
}

module.exports = require('./charset-recog-utf-32')(getChar, "UTF-32LE");