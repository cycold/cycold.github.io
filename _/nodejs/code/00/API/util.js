var util = require('util')

// util调试函数：util.debuglog(section)
// 基于启动nodejs时的环境变量：NODE_DEBUG的设置, 返回值为一个函数
// 当NODE_DEBUG ＝ foo 时，就会执行log这个函数,打印信息，反之就不会打印
var log = util.debuglog('foo')
log('foo, hello')

var log2 = util.debuglog('boo')
log2('boo, hello')

//当执行`NODE_DEBUG=foo,boo node util`打印如下：
// FOO 2281: foo, hello  // FOO为环境变量的值，2281node进程ID
// BOO 2281: boo, hello

var Obj = {
  username: 'eric',
  age: 24
}

// 使用格式化占位符打印 ％s表示字符串 %d表示数字 %j表示json对象
console.log(util.format('%s : %s : %d : %j', 'foo','bar', 3, Obj))

// 输出时间戳
util.log('Timestamped messages.');

// 解析对象
// console.log(util.inspect(util,{colors: true, depth: null}))

// 下面一些类型判断的方法,在nodejs4版本以上已经过时了,不推荐使用
console.log(util.isArray([]))
console.log(util.isArray({}))
console.log(util.isBoolean(true))
console.log(util.isNull(null))

// 原型继承的方法util.inherits
function User() {

}
function Admin() {

}

User.prototype.isSignin = function() {
  return true
}

util.inherits(Admin, User)

console.log(Admin.prototype.prototype === User.prototype) // false
console.log(Admin.super_ === User) // true
console.log(Admin.super_)
var admin = new Admin
console.log(admin.isSignin()) //true

console.log(util.inspect(Admin, {colors: true, showHidden: true, depth: null}))