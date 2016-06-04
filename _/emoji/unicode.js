s= 'z'
console.log('\z')
console.log('\172')
console.log('\x7a')
console.log('\u007a')
console.log('\u{7a}')
console.log('------------\n')
console.log(s.length) // 1
console.log(s.charAt(0)) // z
console.log(s.charAt(1)) // ''
console.log(s.charCodeAt(0)) // 122
console.log((s.charCodeAt(0).toString(16))) // 7a
console.log((s.charCodeAt(0).toString(8))) // 172
console.log(('y'.charCodeAt(0).toString(16))) // 79
console.log(s.charCodeAt(1)) // NAN


var s = "𠮷";

console.log(s.length) // 2
console.log(s.charAt(0)) // ''
console.log(s.charAt(1)) // ''
console.log(s.charCodeAt(0)) // 55362
console.log(s.charCodeAt(1)) // 57271

console.log('\x79\x7a\x7a\x7a')

console.log("\xf0\x9f\x98\x8a")
console.log("\uf09f\u988a")

console.log("\uD834\uDF06")
var s = "\uD834\uDF06";
console.log(s)
console.log('\u007a')