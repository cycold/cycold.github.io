var emoji = require('emoji')
var emojis = require('./emoji')
var punycode = require('punycode')

// console.log('\xf0\x9f\x98\x8a')
// console.log("\xf0\x9f\x98\x80")

console.log(emojis.beer)
console.log(emojis.beer)

console.log(emoji.unifiedToHTML('😎'))

console.log('\u231b')
console.log('\u263D')
console.log('\u2747')
console.log('\u2650')
console.log('\uFE0F')
console.log('\u597D')


var s = '"text":"3🤔"';

console.log('\u1D306');
console.log('\u{1D306}');
console.log('\uD834DF06');
console.log('\uD834\uDF06');

console.log(String.prototype.codePointAt('😎'))
// console.log(String.fromCodePoint('\u1D30'))

var h = '😊'; //xf0\x9f\x98\x8a\

console.log('hsdfsdsdfsd\u2650')
console.log(punycode.ucs2.decode('😊')) // [ 128522 ]
console.log(punycode.ucs2.decode('\uD834\uDF06')); // [0x1D306] [119558]

console.log('\uD834\uDF06')
console.log(punycode.ucs2.encode([0x1D306]));

console.log((128522).toString(16))





console.log('\u231A')
console.log('\u1F34')