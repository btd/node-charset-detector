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
