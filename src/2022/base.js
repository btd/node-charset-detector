module.exports = function(text, textLen, escapeSequences) {
  var i, j;
  var escN;
  var hits = 0;
  var misses = 0;
  var shifts = 0;
  var quality;
  scanInput:
    for(i = 0; i < textLen; i++) {
      if(text[i] == 0x1b) {
        checkEscapes:
          for(escN = 0; escN < escapeSequences.length; escN++) {
            var seq = escapeSequences[escN];

            if((textLen - i) < seq.length) {
              continue checkEscapes;
            }

            for(j = 1; j < seq.length; j++) {
              if(seq[j] != text[i + j]) {
                continue checkEscapes;
              }
            }

            hits++;
            i += seq.length - 1;
            continue scanInput;
          }

        misses++;
      }

      if(text[i] == 0x0e || text[i] == 0x0f) {
        // Shift in/out
        shifts++;
      }
    }

  if(hits == 0) {
    return 0;
  }

  //
  // Initial quality is based on relative proportion of recongized vs.
  //   unrecognized escape sequences.
  //   All good:  quality = 100;
  //   half or less good: quality = 0;
  //   linear inbetween.
  quality = (100 * hits - 100 * misses) / (hits + misses);

  // Back off quality if there were too few escape sequences seen.
  //   Include shifts in this computation, so that KR does not get penalized
  //   for having only a single Escape sequence, but many shifts.
  if(hits + shifts < 5) {
    quality -= (5 - (hits + shifts)) * 10;
  }

  if(quality < 0) {
    quality = 0;
  }
  return quality;
}