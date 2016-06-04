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

console.log('U+1D306')

console.log(punycode.toUnicode('😎'))

console.log(punycode.ucs2.decode('💩'))
console.log('\u1281')
console.log(punycode.ucs2.decode('⌛️'))
