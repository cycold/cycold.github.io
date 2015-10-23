var arr = [1,2,3]
var arr2 = new Array(1,2,3,4)
var num = 100
var str = "Hello"
var obj = {'age':12}

console.log(arr2)

console.log(arr.toString()) // 1,2,3
console.log(Array.prototype.toString.call(arr)) // 1,2,3
console.log(toString.call(arr)) // [object Array]
console.log(Object.prototype.toString.call(arr)) // [object Array]

console.log(arr2.toString()) // 1,2,3,4
console.log(Array.prototype.toString.call(arr2)) // 1,2,3,4
console.log(toString.call(arr2)) // [object Array]
console.log(toString.call(new Array(1,2,3,4))) // [object Array]
console.log(toString.call(Array)) // [object Function]
console.log(Object.prototype.toString.call(arr2)) // [object Array]

console.log(num.toString()) // 100
console.log(Number.prototype.toString.call(num)) // 100
console.log(toString.call(num)) // [object Number]
console.log(toString.call(new Number(7))) // [object Number]
console.log(Object.prototype.toString.call(num)) // [object Number]

console.log(str.toString()) // hello
console.log(String.prototype.toString.call(str)) // hello
console.log(toString.call(str)) //[object String]
console.log(toString.call(new String("hi"))) //[object String]
console.log(Object.prototype.toString.call(str)) //[object String]

console.log(obj.toString()) //[object Object]
console.log(toString.call(obj)) //[object Object]
console.log(Object.prototype.toString.call(obj)) //[object Object]

// toString最开始是在: Object.prototype.toString中
// 数组对象继承自Object.prototype,也就继承了toString方法,但是,js数组Array.prototype.toString覆写了
// Object.prototype上的toString方法.
console.log('------------------------------')

delete arr.__proto__.toString
console.log(arr.toString()) //[object Array]
console.log(arr2.toString()) //[object Array]

// 使用toString.call(null) 和使用Object.prototype.toString.call(null) 在浏览器中结果是不同的
console.log(toString.call(null))  // 浏览器中为 [object Window] nodejs中为[object Null]
console.log(toString.call(undefined)) // 浏览器中为 [object Window] nodejs中为[object Undefined]

