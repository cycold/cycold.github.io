#### this

```js
function foo() {
  function bar() {
    console.log(this); // global 
  }
  bar(); // the same as AO.bar()
}
// 我们知道函数内的变量保存在一个对象中VO/AO, 所以在函数内调用方法
// bar(),即相当于AO.bar(); 那么此时bar函数中的this就应该指向AO,可为什么最终指向了 global呢?
// 没错,调用bar(),确实调用了 AO.bar(); 但是ECMA中规定:
// See [10.1.6 Activation Object](http://bclary.com/2004/11/07/#a-10.1.6). The last sentence:
// When the call operation is applied to a Reference value whose base object is an activation object, 
// **null** is used as the **this** value of the call.
// 即当AO.bar中的引用类型为当前函数关联的变量对象时,就将this的值设置为null, this值为null,没有任何意义
// 所以js中就隐式的将this指向了global

```