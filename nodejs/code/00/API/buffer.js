// buffer类似与js的整形数组,每一个元素为一个字节(8位),buffer大小一旦确定下来就不能再被重新设置大小

// 创建buffer的方法:
// 1 直接设置buffer的大小
var buf1 = new Buffer(5)
// 初始化一个5字节的buffer,每一个元素都是随机的值
console.log(buf1)
console.log(buf1.toString())
// 使用buf.fill() 填充指定的值
console.log(buf1.fill(1))

var buf2 = new Buffer(['1',"hello",3,4,5])
console.log(buf2)
console.log(buf2.toString())

var buf3 = new Buffer('Hello World!','utf8')
console.log(buf3)
console.log(buf3.toString())

// 基于传进来的buffer复制创建一个新的buffer
var buf4 = new Buffer(buf3)
console.log(buf4)
// 注意这里的x非法,只能是0-255或者0x00 - 0xFF
// 因为buffer中的元素保存的都是二进制编码
buf4[0] = 'x'
console.log(buf4.toString())
console.log(buf3.toString())
console.log('write.....charCodeAt')

buf4[0] = 'x'.charCodeAt()
console.log(buf4.toString())
console.log(buf3.toString())
console.log('write.....')

buf4.write('x',0,buf4.length,'utf8') //这里的write放法内部其实是将x字符转成了utf8编码(0x78)
console.log(buf4)
console.log(buf4.toString())
console.log(buf3.toString())

console.log('write.....')
buf4.write('xxxxx',3, 3) // 从第三个位置开始写,写入的长度为3个字符, 所以这里只写入了3个xxx
console.log(buf4.toString())
console.log(buf3.toString())


// 测试一个对象是否是buffer对象
console.log(Buffer.isBuffer(buf4))

// 事实上,new Buffer('Hello world','utf8')
// 等价于:
var tmp = new Buffer('Hello world'.length)
tmp.write('Hello world',0,'Hello world'.length - 0,'utf8')
console.log(tmp.toString())

// 读取buffer
console.log(buf3.toString('utf8',1,buf3.length))

// buffer转json
var buf5 = new Buffer('test')
var json = JSON.stringify(buf5)
console.log(json) //{"type":"Buffer","data":[116,101,115,116]}
console.log(buf5.toJSON()) //{ type: 'Buffer', data: [ 116, 101, 115, 116 ] }
var copy = JSON.parse(json, function(key, value) {
  return value && value.type === 'Buffer'
    ? new Buffer(value.data)
    : value
})
console.log(copy)

var str = 'node.js'
var buf6 = new Buffer(str.length)
for (var i = 0; i < buf6.length; i++) {
  buf6[i] = str.charCodeAt(i);
}
console.log(buf6)
console.log(buf6.toString())

var buf7 = new Buffer('hello')
var buf8 = new Buffer('helol')
console.log(buf7.equals(buf8))
console.log(buf7.compare(buf8))

var arr = [Buffer('1234'), Buffer('0123')];
arr.sort(Buffer.compare);
console.log(arr)

// 合并buffer,第二个参数为合并后的buffer的总长度,可以不传
// 传了第二个参数可以省略内部的一个循环遍历,运行的更快
var sumBuf = Buffer.concat([buf7,buf8],10)
console.log(sumBuf.toString())

// 返回实际的字节长度
str = '\u00bd + \u00bc = \u00be';

console.log(str + ": " + str.length + " characters, " + Buffer.byteLength(str, 'utf8') + " bytes");
// ½ + ¼ = ¾: 9 characters, 12 bytes

str = '你好'
console.log(str + ": " + str.length + " characters, " + Buffer.byteLength(str, 'utf8') + " bytes");
//你好: 2 characters, 6 bytes 可见一个中文字符占用3个字节