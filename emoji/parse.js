var punycode = require('punycode')
var e1 = '😊'
var e2 = '𝌆' // \uD834\uDF06  \u1D306

console.log(String.fromCodePoint(97)) // a
console.log(String.fromCodePoint(65,90)) // AZ
console.log(String.fromCodePoint(0x2F804)) //你
console.log((0x2F804).toString(10)) //194564
console.log(String.fromCodePoint((0x2F804).toString(10))) //你
console.log(String.fromCodePoint(0x1D306, 0x61, 0x1D307)) //𝌆a𝌇

var s = '你'
console.log('获取码点:---------')
console.log('你:>',s.codePointAt(0)) //20320
console.log(String.fromCodePoint(20320)) //你
console.log(String.fromCodePoint(194564)) // 你

var s = '𠮷a';
console.log('𠮷:>', s.codePointAt(0)) // 134071
console.log('𠮷:>', s.codePointAt(1)) // 57271
console.log('𠮷:>', s.codePointAt(2)) // 97

console.log('𠮷:>',String.fromCodePoint(134071))
console.log('𠮷:>',(134071).toString(16)) // 20bb7
console.log('\u{20bb7}') //𠮷

console.log('punycode.ucs2.decode-------');
console.log('𠮷 decode:>', punycode.ucs2.decode('𠮷')) // [ 134071 ]
console.log('𠮷 encode:>', punycode.ucs2.encode([134071])) // 𠮷


