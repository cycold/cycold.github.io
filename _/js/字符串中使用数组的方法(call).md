#### 一直想不通为什么字符串可以应用数组的一些方法:

```js
var map = Array.prototype.map;
var a = map.call('Hello World', function(x) {
  console.log(x)
  return x.charCodeAt(0); 
});
// a now equals [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
console.log(a)

// var b = 'Hello World'.map(function(x) {
// var b = new String('Hello World').map(function(x) {
var b = Array.prototype.map.call('Hello World', function(x) {
  console.log(x)
  return x;
});

function Arr(arr) {
  return Array.prototype.slice.call(arguments, 0)
}

Arr.prototype.map = function(callback) {
  for (var i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}

var a = new Arr('a', 'b','c');
console.log(a)
a.map(function(currentValue, index, arr) {
  console.log('currentValue: ', currentValue)
  console.log('index ', index)
})

Arr.prototype.map.call(a, function(currentValue, index, arr) {
  console.log(currentValue)
})

// 这里的call('Hello', function(){}) 
// 并不是去字符串'Hello'的原型下寻找map方法,而是这里的方法就是调用
// Arr.prototype.map方法,只是方法中的this(对象)不同而已
// 之前一直将其等价于 'Hello'.map(function(){}), 这是错的
// 使用call调用的方法,还是原来的方法,仅仅只是方法中的this(对象)不同了而已,
// 这里就可以将每一个函数的中this看做是一个参数,可以随着函数调用传入的参数不同
// 而不同
Arr.prototype.map.call('Hello', function(currentValue, index, arr) {
  console.log('Hello: ', currentValue)
})
```
