```js
//#1
var foo = function foo() {
    console.log(foo === foo);  //true
};
foo();  
--------------------------------------------------------------------------------------------------------------
console.log(foo); //undefined
var foo = function boo() {
    console.log(foo === boo);  //true
    boo = "Hello";  //warnings:'boo' is a function.
    console.log(foo === boo);  //true   // boo="Hello" 赋值语句无效 jsbin中测试提示警告 why?
    console.log(typeof boo);   //"function"
    foo = "world";
    console.log(foo === boo);  //false
    console.log(foo);          //"world"
};
foo();  

console.log(typeof moo); //"function"
function moo(){
  console.log(typeof moo);   //"function"
  console.log(moo === moo);  //true
  moo = "oom";   // 在jsbin中这一行提示警告:warning: 'moo' is a function.
  console.log(moo);  //"oom"; jsbin中虽然提示警告,但是这里却赋值成功,why?
}
moo();
moo();  //"TypeError: moo is not a function

console.log(foo === boo);   //Uncaught ReferenceError: boo is not defined
boo(); 

--------------------------------------------------------------------------------------------------------------
//#2
function aaa() {
    return          //注意分号，自动添加分号 下面执行不到
    {
        test: 1
    };
}
console.log(typeof aaa()); //undefined
--------------------------------------------------------------------------------------------------------------

//#3
Number("1") - 1 == 0;  // true
--------------------------------------------------------------------------------------------------------------

//#4
(true + false) > 2 + true;  // 1 + 0 > 2 + 1 false
--------------------------------------------------------------------------------------------------------------

//#5
function bar() {
    return foo;
    foo = 10;
    function foo() {}
    var foo = '11';
}
console.log(typeof bar());  //function

--------------------------------------------------------------------------------------------------------------
//#6
"1" - - "1";
// 其中有一个为负号

--------------------------------------------------------------------------------------------------------------
//#7
var x = 3;

--------------------------------------------------------------------------------------------------------------
var foo = {
    x: 2,
    baz: {
        x: 1,
        bar: function() {
            return this.x;
        }
    }
}

var go = foo.baz.bar;

console.log(go());      //3
console.log(foo.baz.bar());  //1

--------------------------------------------------------------------------------------------------------------
//#8
new String("This is a string") instanceof String; //true

--------------------------------------------------------------------------------------------------------------
//#9
[] + [] + 'foo'.split('');  //[].toString() + [].toString + 'foo'.split('');  f,

--------------------------------------------------------------------------------------------------------------
//#10
new Array(5).toString();

--------------------------------------------------------------------------------------------------------------
//#11
var myArr = ['foo', 'bar', 'baz'];
myArr.length = 0;
myArr.push('bin');
console.log(myArr); //['bin']

--------------------------------------------------------------------------------------------------------------
//#12
String('Hello') === 'Hello';  //true

--------------------------------------------------------------------------------------------------------------
//#13
var x = 0;
function foo() {
    x++;
    this.x = x;
    return foo;
}
var bar = new new foo;
console.log(bar.x);     //undefined

--------------------------------------------------------------------------------------------------------------
//#14
"This is a string" instanceof String;  //false

--------------------------------------------------------------------------------------------------------------
//#15
var bar = 1,
    foo = {};

foo: {
    bar: 2;
    baz: ++bar;
};
foo.baz + foo.bar + bar;
 
--------------------------------------------------------------------------------------------------------------
//#16
var myArr = ['foo', 'bar', 'baz'];
myArr[2];
console.log('2' in myArr);  //true

--------------------------------------------------------------------------------------------------------------
//#17
var arr = [];
arr[0]  = 'a';
arr[1]  = 'b';
arr.foo = 'c';
arr["4"] = 'd';
console.dir(arr);
console.dir(arr.length); //5
console.dir(arr[3]);  //undefined
console.dir(arr[2]);  //undefined
console.dir(arr[10]); //undefined

--------------------------------------------------------------------------------------------------------------
//#18
10 > 9 > 8 === true;  //false ((10 > 9) > 8) === true

--------------------------------------------------------------------------------------------------------------
//#19
function foo(a, b) {
    arguments[1] = 2;
    console.log(b); //undefined
    console.dir(arguments);
}
foo(1);

--------------------------------------------------------------------------------------------------------------
function foo2(a, b) {
    console.log(a); // 1
    console.log(arguments[0]); // 1
    console.log(arguments[1]); // undefined
    console.log(arguments.length); // 1
    arguments[0] = "hello";
    arguments[1] = 2;
    console.log(a); //hello
    console.log(b); //undefined
    console.dir(arguments);
}
foo2(3);

--------------------------------------------------------------------------------------------------------------
//#20
NaN === NaN;   //false
 
```
