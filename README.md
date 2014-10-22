node-charset-detector
=====================

ICU based port of charset detection to javascript

Install
=======

```
npm install --save charset-detector
```

Use
===

```javascript
var detect = require('charset-detector');

/*
  function accept node Buffer, but will work with anything that follow such rules:
  allow indexing by []
  has .length
  each numbered property is byte 0-255
*/
var matches = detect(buffer);

```

Function will return array of matches sorted by most confident first.

Detectable encodings from ICU:

* UTF8 (with and without BOM)
* UTF16-LE, UTF16-BE, UTF32-LE, UTF32-BE
* Big5, EUC-JP, GB18030, Shift_JIS
* ISO-2022-JP, ISO-2022-KR, ISO-2022-CN
* ISO-8859-1, ISO-8859-2, ISO-8859-5, ISO-8859-6, ISO-8859-7, ISO-8859-8, ISO-8859-8-I, ISO-8859-9, windows-1250, windows-1251, windows-1252, windows-1253, windows-1254, windows-1255, windows-1256, koir8-r, IBM420\_ltr(rtl), IBM424\_ltr(rtl)
