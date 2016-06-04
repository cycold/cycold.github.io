var toCharCode = require('./string').toCharCode
var buf = new Buffer("abc,你好,世界!", 'utf8')
var str = new String('abc,你好,世界!')


console.log('buf:\n', buf)
console.log('str-16:\n',toCharCode(str,16))
console.log('str-10:\n',toCharCode(str,10))
console.log('buf.length:\n', buf.length)  //18 一个中文字符在buffer中占用3个字节
console.log('str.length:\n', str.length)  //10
console.log('buf.toString:\n', buf.toString('utf8'))
//[ 97, 98, 99, 44, 20320, 22909, 44, 19990, 30028, 33 ]
//[ '61', '62', '63', '2c', '4f60', '597d', '2c', '4e16', '754c', '21' ]
//<Buffer 61 62 63 2c e4 bd a0 e5 a5 bd 2c e4 b8 96 e7 95 8c 21>  // buffer中,每一个元素(0-255)都已16进制保存

// 以上的 buf.toString('utf8') 就是将内存中的
// <Buffer 61 62 63 2c e4 bd a0 e5 a5 bd 2c e4 b8 96 e7 95 8c 21>
// 转成: [ '61', '62', '63', '2c', '4f60', '597d', '2c', '4e16', '754c', '21' ]