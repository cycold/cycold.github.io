#### 变量和属性的区别
本质上来说,js中的变量(var关键字定义的)都是其内部实现机制中变量对象(VO)的属性.
比如:`var age = 23` 其实就是`global.age`(浏览器中即: `window.age`)

我们知道,当使用`var` 关键字可以声明全局变量和局部变量,但是当没有使用`var`关键字时,
比如在一个函数中直接使用 `b = 23`(b从未被声明过),那么我们都知道此时`b`赋值后即提升为了
全局的变量.

实际上此时的`b`本质上不是一个变量,因为只有通过`var`关键字的声明,才是js中的变量.
那`b`不是变量,是什么? 其实这里的`b = 23` 只是创造了一个全局对象的属性.
即`window.b = 23` 他和`var b = 32`的
区别: 
> 使用`delete`操作符上的不同.
> 直接声明的对象的属性(没有通过Object.defineProperty方法定义的属性)
> 一般是可以直接通过`delete`操作符删除的,结果返回`true`, 
> 但是通过`var` 关键字声明的变量(本质也是属性,其configurable为`false`),
> 是不可以通过`delete`操作符删除掉得.
> 其实都是属性,只是属性的特征描述符`configurable`不同,一个为true,一个为false

```js
console.log(t)              //Uncaught ReferenceError: t is not defined
// 这里的t报了没有定义的异常,因为js在执行时,首先会从作用域链中查找t这个变量,一直查找到全局的window
// 都没有找到t这个变量,所以就报错了
 
console.log(window.t)      // undefined
// 为什么这里没有报错呢? 而是输出undefined呢? 其实这条语句等于 
// var tmp = window.t
// console.log(tmp)
// js执行时,先对window.t取值,得到undefined

// 直接定义一个全局的属性t
// window.t = 't';     
// 等于: (省略了window)
t = 't';    
// 所以这也就是为什么省略了关键字`var`,就会变成全局的"变量"
// 其实这里不应该称为变量,而是定义了一个全局的属性, 可以被delete删除
console.log(window.hasOwnProperty('t'));    // true

console.log(Object.getOwnPropertyDescriptor(window, t)); 
// Object {value: "t", writable: true, enumerable: true, configurable: true}

console.log(t);   // t
console.log(delete t);  //true

// 下面是使用var 关键字声明变量(真正的js变量)
var t = 'tt';
console.log(window.hasOwnProperty('t')); // true

console.log(Object.getOwnPropertyDescriptor(window, t)); 
// Object {value: "tt", writable: true, enumerable: true, configurable: false}

console.log(t);   // tt
console.log(delete t);  //false
```



```js
function main() {
  var age = 11;
  var sname = 'Tom';


  console.log(delete sname);

  //console.log(b);  //Uncaught ReferenceError: b is not defined
  // 这里为什么会报错? 
  // js函数执行主要可以认为分为两个阶段:
  // 第一个阶段准备好执行环境(创建变量对象,设置this,设置作用域链...)
  // 第二个阶段执行代码
  // 当js执行阶段时,到这里首先会去本地的变量对象中寻找b,
  // 由于js的变量对象只会对 变量声明, 函数声明, 形式参数这几种类型作为其属性(初始化)
  // 所以这里的b就不会在其变量对象中,然后就会去上一级作用域链中寻找,最终到达全局作用域链
  // 也没有找到b, 所以这里就报错了...

  
  b = "haha";
  // 这里这条语句其实等价于 window.b = "haha", 设置了一个全局属性而已,
  // b这里其实不是一个全局变量,而是一个全局的属性
  
  // 也就是js中,对于没有声明过的变量赋值的处理方案就是: 将其设置为一个全局的属性.

  console.log(b); // "haha" === console.log(window.b);
  //甚至这里都不会进过其他的作用域链,直接从全局作用域中寻找b

  console.log(delete b); // true

  function show() {
    age = 22;
  }

  show(age);

  console.log('age: ', age);  //age:  22
}

main();

console.log(b);  //Uncaught ReferenceError: b is not defined


```
