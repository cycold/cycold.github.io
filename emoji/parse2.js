var punycode = require('punycode')
var utf8 = require('utf8')
var wtf8 = require('wtf-8')
var e1 = '😊' // \xf0\x9f\x98\x8a 1f60a 128522
var e2 = '𝌆' // \uD834\uDF06  \u1D306

// by codePointAt
console.log('e2:> 10进制', e2.codePointAt(0)) //119558
console.log('e2:> 16进制', (e2.codePointAt(0)).toString(16)) // 1d306

// by punycode
console.log('e2:> 10进制', punycode.ucs2.decode(e2)) //[ 119558 ]
console.log('e2:> 16进制', punycode.ucs2.encode([119558]))

// by codePointAt
console.log('e1:> 10进制', e1.codePointAt(0)) //128522
console.log('e1:> 16进制', (e1.codePointAt(0)).toString(16)) // 1f60a

// by punycode
console.log('e1:> 10进制', punycode.ucs2.decode(e1)) //[ 128522 ]
console.log('e1:> 16进制', punycode.ucs2.encode([128522]))

console.log(utf8.encode('a'))
console.log(utf8.encode(e1))
// console.log(wtf8.encode('\u{1f60a}'))
// console.log(wtf8.encode('\uD834\uDF06'))
// console.log(wtf8.encode('\uD800\uDC01'))

console.log(wtf8.decode('\xf0\x9f\x98\x8a'))
console.log(wtf8.decode('\xf0\x9f\xa4\x94'))

console.log(wtf8.decode('\xf0\x9f\x98\x8a').codePointAt(0))
console.log(wtf8.decode('\xf0\x9f\xa4\x94').codePointAt(0))
console.log((129300).toString(16)) //1f914




