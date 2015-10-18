```js
var str = "Hello";  // str 为基本类型
var strObj = new String('World'); // strObj 为对象类型

//但是 str是基本类型,他应该没有属性,并且不能设置属性的?
console.log(str.length);    // 5
str.tt = 'tt';
console.log(str.tt); //undefined

//在js中会对基本类型数据进行包装:
str.length =>>> new String(str).length 
str.tt =>>> new String(str).tt = 'tt'; // 运算玩后,new的临时对象消失,自然属性tt为undefined
```
