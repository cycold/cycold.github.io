#### 
1 js的传值策略(Call by Sharing): 通过对值地址的拷贝传递         

> js中的一切本质都是对象的传递,即通过拷贝对象的引用的传递.进行值的传递    
> 函数作为参数传递,就是将函数对象的引用的拷贝的传递,一个函数对象会携带着它的上下文    
> 通过其[[scope]]属性.这就是闭包的概念.将函数返回,保存引用,使其不会回收.    
> 这就在延长闭包的生命周期.其实函数就是闭包.   

2 理解在js的垃圾回收机制中,有一条原则:              
  当一个对象没有了引用时,此时也就成了匿名对象,不能被程序访问,就会被回收.其实不是立即回收             
  但是,对于程序开发者,可以认为是立即释放.即当对象失去所有的引用时,此对象就会消失             

```js
    function A() {}
    A.prototype.x = 10;
     
    var a = new A();
    console.log(a.x); // 10 – by delegation, from the prototype

    // set .prototype property of the
    // function to new object; why explicitly
    // to define the .constructor property,
    // will be described below
    A.prototype = {
      constructor: A,  // 这里为什么要显视的设置这个构造器属性呢??
      y: 100
    };
     
    var b = new A();
    // object "b" has new prototype
    console.log(b.x); // undefined
    console.log(b.y); // 100 – by delegation, from the prototype
     
    // however, prototype of the "a" object
    // is still old (why - we will see below)
    console.log(a.x); // 10 - by delegation, from the prototype

    // ??? 为什么这里还是10 
    function B() {
      this.x = 10;
      return new Array();
    }
     
    // if "B" constructor had not return 如果构造器没有返回子,或者返回this,那么this对象才会被使用,如果返回其他的对象,那么this就没有使用
    // (or was return this), then this-object
    // would be used, but in this case – an array
    var b = new B();
    console.log(b.x); // undefined
    console.log(Object.prototype.toString.call(b)); // [object Array]
```

问题:      
    问什么上面的`a.x`还存在? 不是已经将A.prototype重新赋值了吗?       
    这和js的按地址值拷贝有关     
```js
function A() {}
A.prototype.x = 10;
```
在内存中创建一个对象:`0001`为此对象的地址值.       
A.prototype = 0001;  //A.prototype 只是保存着0001对象的地址值      
```js
var a = new A();
```
在内存中又创建一个对象:`0002`          
a对象中有一些属性:      
{           
    __proto__: 0001, // 这里拷贝A.prototype值, 也保存一份0001对象的地址值       
    ...     
}       

至此,内存的一个对象,引用了两次    

```
        对象0001                   
...........................              
.   x = 10                .      0001
.                         .   <----------变量A.prototype(其实也是一个对象的属性)         
.                         .               ...........................       
.                         .   <-----------. __proto__   : 0001      .       
...........................               .                         .       
                                          .                         .         
                                          ...........................          
                                                  a对象 0002                

当A.prototype.x = 11 时,那么上面的0001对象中的x就会修改,此时a也指向0001,所以a也会得到反馈 a.x 也就是11         
因为此时a和A.prototype指向的是同一个对象      

一旦当A.prototype = {} ,即A.prototype指向了一个新的对象,此时也就和a指向的不是同一个对象了         
此时A.prototype和a之间就没有任何关系了.虽然A.prototype指向了新的对象,但是a对象(通过内部的属性__proto__)        
依然还是保存着对象0001,所以a依然可以访问到a.x 此时这个对象的生命周期就只和a有关了.只要a没有结束,并且一直      
持有其引用,那么0001就不会被垃圾回收.     
这和函数的闭包原理基本一样.闭包也是通过函数对象上的一个属性[[scope]]保持对闭包的引用的     

这就是为什么当A.prototype只是修改属性时,a.x可以得到同步,是因为它们此时共用同一份对象    
A.prototype 设置一个新的对象时,此时开始和a指向不同的对象了,所以 A.prototype的修改    
已经和a无关了     

```

每一个函数对象在创建时都有一个属性:`prototype`,是一个对象(保存对对象的一个引用),这个对象的属性constructor
反过来指向这个函数对象,构成一个首尾相连的循环指向     
```js
function A() {}
// A.prototype.constructor === A

var a = new A();
console.log(a.constructor); // function A() {}, by delegation
console.log(a.constructor === A); // true
```
很多人都以为constructor是对象的属性比如a.constructor,确实,表面上a对象的属性,    
实际上,constructor是从构造函数中prototype属性继承过来的.     
所以a.constructor实际上是到原型链中查找到的 
a.[[prototype]].constructor == a.__proto__.constructor
所以这里既可以得到原构造器的原型对象:
a.constrcutor.prototype
```js
function A() {}
A.prototype.x = new Number(10);
 
var a = new A();
console.log(a.constructor.prototype); // [object Object]
 
console.log(a.x); // 10, via delegation
// the same as a.[[Prototype]].x
console.log(a.constructor.prototype.x); // 10
 
console.log(a.constructor.prototype.x === a.x); // true
```

当完全改变一个函数的原型对象时(指向的对象),需要注意:
```js
function A() {}
A.prototype = {   // 此时这里丢失了构造器属性
  x: 10   
};
 
var a = new A();
console.log(a.x); // 10
console.log(a.constructor === A); // false!
```
所以这构造器属性,应当手动的恢复:
```js
function A() {}
A.prototype = {
  constructor: A,
  x: 10
};
 
var a = new A();
console.log(a.x); // 10
console.log(a.constructor === A); // true
```
但是注意,这里我们手动的恢复了constructor,但是其原有的属性描述符依然还是丢失了,比如`enumerable`就变成了true,
变成了for in 循环可枚举的属性了.所以如果需要彻底的恢复,还需要使用`Object.defineProperty`方法

#### 对象独立于其构造其函数
```js
function A() {}
A.prototype.x = 10;
 
var a = new A();
console.log(a.x); // 10
 
// set "А" to null - explicit
// reference on constructor
A = null;
 
// but, still possible to create
// objects via indirect reference
// from other object if
// .constructor property has not been changed
var b = new a.constructor();
console.log(b.x); // 10
 
// remove both implicit references
delete a.constructor.prototype.constructor;
delete b.constructor.prototype.constructor;

// 这里为什么不使用delete a.constructor而是后面要加上prototype呢?
// delete操作删除本地的属性,而a.constructor不属于a的本地属性,所以就不能删除
// delete删除不是按照原型链查找的
// 而a.constructor.prototype.constructor 中的最后的constructor就是一个本地属性
// 是a.constructor.prototype的本地属性,不许要去作用域链上查找
// 所以这里使用delete a.constructor.prototype.constructor来删除constructor属性
 
// it is not possible to create objects
// of "А" constructor anymore, but still
// there are two such objects which
// still have reference to their prototype
console.log(a.x); // 10
console.log(b.x); // 10

通过构造函数创建的对象之所以能过独立于创造它的构造函数,就是因为在创建对象时,这个对象其实继承
这个构造函数本身.

当使用var o = new Object(); 等价于: o.__proto__ = Object.prototype
发现o没有构造函数这个属性,Object.prototype没有constructor属性
```

至此发现js的构造函数,构造对象就像人类生孩子,每一个对象都保存这一个对构造函数的应用
即使构造函数构造对像后,立即消失.那么也可以从之前构造出的子对象中复活
(因为这些子对象还保存着引用通过继承过来的prototype)[[prototype]] == __proto__
