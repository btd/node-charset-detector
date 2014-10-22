exports['ISO-8859-1'] = require('./charset-recog-8859-1');

exports['ISO-8859-2'] = require('./charset-recog-8859-2');

exports['ISO-8859-5'] = require('./charset-recog-8859-5')['8859_5_ru'];

exports['ISO-8859-6'] = require('./charset-recog-8859-6')['8859_6_ar'];

exports['ISO-8859-7'] = require('./charset-recog-8859-7')['8859_7_el'];

var iso_8859_8 = require('./charset-recog-8859-8');

exports['ISO-8859-8']   = iso_8859_8['8859_8_he'];

exports['ISO-8859-8-I'] = iso_8859_8['8859_8_I_he'];

exports['ISO-8859-9'] = require('./charset-recog-8859-9')['8859_9_tr'];

var ibm420 = require('./charset-recog-ibm420-ar');

exports['IBM420_rtl'] = ibm420.IBM420_rtl;

exports['IBM420_ltr'] = ibm420.IBM420_ltr;

var ibm424 = require('./charset-recog-ibm424-he');

exports['IBM424_rtl'] = ibm424.IBM424_rtl;

exports['IBM424_ltr'] = ibm424.IBM424_ltr;

exports['windows-1251'] = require('./charset-recog-windows-1251');

exports['windows-1256'] = require('./charset-recog-windows-1256');

exports['KOIR8-R'] = require('./charset-recog-koir8-r');