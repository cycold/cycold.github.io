#### ECMA-262-3 in detail. Chapter 7.2. OOP: ECMAScript implementation

(http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation)

> by Dmitry Soshnikov

##### ECMAScript OOP implementation
> ECMAScript is an object-oriented programming language supporting delegating
> inheritance based on prototypes.

##### Data types(数据类型)
Though ECMAScript is a dynamic, weekly typed languga with "duck" typing,
and automatic type conversion, it nevertheless has certain data types.
That is ,at one moment, an object belongs to one concrete type.

Standard defines nine types, and only six are directly accessible in an 
ECMAScript program:

- Undefined
- Null
- Boolean
- String
- Number
- Object

> There is no Array.注意这里没有数组类型(数组类型属于Object)

Other three types are accessible only at implementation level(none of 
ECMAScript objects can have such type) and used by the specification for
explaining behavior of some opreations, for storing intermediate values 
other. These are following types:

- Reference
- List
- Completion

Thus, in short view, `Reference` type is used for an explanation of such 
Operators ad `delete`,`typeof`,`this` and other, and consist of a base
objecrt and a property name.`List` type describes behavior of the arguments
list(in the `new` expression and function calls). `Completion` type in turn
is used for an explanation of behavior `break`, `return` and `throw` statement

##### Primitive value types
Coming back to the six types used by ECMAScript programs, first five of them:
`Undefined`, `Null`, `Boolean`, `Number` are types of _primitive values_

Examples of primitive types
```js
var a = undefined;
var b = null;
var c = "hello";
var d = true;
var e = 10;
```

These values are represented in implementations directly on a low level.
They are _not object_ , they do not have neither prototypes nor constructors.

The `typeof` operator can be unintuitive if not properly understood.And
one such example of that is with the value `null`. When `null` is supplied
to the `typeof` operator, the result is "object" regardless of the fact
that the type of `null` is specified as `Null`.

```js
console.log(typeof null); // "object"
```

And the reason is that the `typeof` operator returns the value taken from
standard table which simply says: "for _`null` value string_ should be returned ".

##### Object type
In turn, the `Object` type (do not confuse with `Object` constructor, we're taking
now obly about abstract types!) is the only type that represents ECMAScript objects

> Object is an unorderd collection of key-value pairs.

The keys of objects are called _property_ . Peorperties are containers for
primitive values and other objects. In case when properties contain functions
as their values, they are called _methods_.

Examples:
```js
var x = { // object "x" with three properties: a, b, c
  a: 10, // primitive value
  b: {z: 100}, // object "b" with property z
  c: function () { // function (method)
    alert('method x.c');
  }
};
alert(x.a); // 10
alert(x.b); // [object Object]
alert(x.b.z); // 100
x.c(); // 'method x.c'

```

##### Dynamic nature
As we noted [in chapter 7.1](http://dmitrysoshnikov.com/ecmascript/chapter-7-1-oop-general-theory/#prototype-based-model), objects in ES are fully _dynamic_.
It means that we may add, modify, or remove properties of objects at any
time of program _execution_.

For example:
```js
var foo = {x: 10};

// add new property
foo.y = 20;
console.log(foo); // {x: 10, y: 20}

// change property value to function
foo.x = function () {
  console.log('foo.x');
};

foo.x(); // 'foo.x'

// delete property
delete foo.x;
console.log(foo); // {y: 20}

-----------------------------------------
//Note, ES5 standardize static objects which cannot be extended with new properties and
//none of the properties can be modified or deleted.These are so-called
//frozen objects, which can be gotten by applying Object.freeze(o) method.

var foo = {x: 10};

// get defaut preperty descriptor
var descriptorx = Object.getOwnPropertyDescriptor(foo,"x");
console.dir(descriptorx);
// print:
/* {
    configurable: true,
    enumerable: true,
    value: 10
    writable: true
} */

// freeze the object
Object.freeze(foo);
console.log(Object.isFrozen(foo)); // true
 
// can't modify
foo.x = 100;
 
// can't extend
foo.y = 200;
 
// can't delete
delete foo.x;
 
console.log(foo); // {x: 10}

var descriptorx = Object.getOwnPropertyDescriptor(foo,"x");
console.dir(descriptorx);
// print:
/* {
    configurable: false,
    enumerable: true,
    value: 10
    writable: false
} */

// freeze其实就是改变了所有此对象(相当于批量)的属性描述符的
// configureable writable 属性 设置对象不能再扩展属性

-------------------------------------------
//Also it's possible just to prevent extensions use `Object.preventExtensions(o)`
//method, and to control specific attributes with `Object.defineProperty(o)` method:
var foo = {x: 10};

Object.defineProperty(foo, y, {
    value: 29,
    writable: false, // read-only
    configurable: false //non-figurable (not delete)
});
// 注意,当使用Object.defineProperty时,第三个参数即属性描述符
// 的默认值为.如果没有设置,就采用如下的默认值(只读,不能删除,值为undefined)
// 所以这里没有设置 enumerable的值,那么默认就为false
/* {
    configurable: false,
    enumerable: false,
    value: undefined
    writable: false
} */

//can't modify
foo.y = 200;
//can't delete
delete foo.y;  //false

//prevent extensions
Object.preventExtensions(foo);
console.log(Object.isExtensible(foo)); // false

//can't add new properties
foo.z = 300;
console.log(foo); //{x: 10, y: 20}


```

##### Built-in, native and host objects
It is necessary to notic also that the specification distinguishes 
_native_ object, _built-in_ object, and _host_ objects.

_Built-in_ and _native_ objects are defined by the ECMAScript specification
and the implementation, and a difference between them insignificant.
_Native_ objects are the all object provided by ECMAScript implementation
(some of them cab be _built-in_ , some can be created during the program execution
,for example user-defined objects).

The _built-in_ objects are a subtype of _native_ objects which are _built into_
the ECMAScript _prior_ to the beginning of a program(for example, parseInt,Math etc.).

All _host_ objects are objects provided by the host environment, typically
a browser, and may include , for example, `window`, `alert`, etc.

Notice, that host objects may be implemented using ES itself and compeltely
correspond to the specification's semantics. From this viewpoint, they can
be named(unoffically) as "native-host" objects, though it's mostly a 
theoretical aspect. The specification however does not define any
"native-host" concept.

##### Boolean, String, and Number objects
Also for some primitives the specificatio defines special _wrapper_
objects. These are following objects:
- Boolean-object
- String-object
- Number-object

Such objects are created with corresponding built in constructors and contain
primitive value as one of internal properties.Object erepresentation can be
converted into primitive values and vice-versa.

Examples of the object vaules corresponding to primitive types:
```js
var c = new Boolean(true);
var d = new String('hello');
var e = new Number(10);

// converting to primitive
// conversion: ToPrimitive
// applying as a function, without "new" keyword
с = Boolean(c);
d = String(d);
e = Number(e);

// back to Object
// conversion: ToObject
c = Obejct(c);
d = Obejct(d);
e = Obejct(e);
```

Besides, there are also objects created by special built-in constructor:
- Function(function objects constructor)
- Array(arrys constructor)
- RegExp(regular expressions constructor)
- Math(the mathmatical module)
- Date(the constructor of dates)
,etc. Such objects are also values of type `Object` and their distinction
from each other is mananged by internal properties which we will discuss below.

##### Literal notations
For three object values: _object_, _array_, _regular expression_ there are short
notations which called accordingly an _object initialiser_, an _initialiser_
and a _regular expression literal_:
```js
// equivalent to new Array(1,2,3)
// or array = new Array()
// array[0] = 1;
// array[1] = 2;
// array[2] = 3;
var array = [1,2,3];

//equivalent to
// var obj = new Object()
// obj.a = 1;
// obj.b = 2;
// obj.c = 3;
var obj = {a:1,b:2,c:3};

// equivlent to
// new RegExp("^\\d+$","g")
var re = /^\d+$/g;

```

Notice, that in case of reassigning the name bindings — Object, Array or RegExp to some new objects, the semantics of subsequent using of the literal notations may vary in implementations. For example in the current Rhino implementation or in the old SpiderMonkey 1.7 appropriate literal notation will create an object corresponding to the new value of constructor name. In other implementations (including current Spider/TraceMonkey) semantics of the literal notations is not being changed even if constructor name is rebound to the new object:
```js
var getClass = Object.prototype.toString;

Object = Number;

var foo = new Object;
console.log(foo, getClass.call(foo));

var bar = {};
console.log(bar, getClass.call(bar));

// the same with Array name
Array = Number;
foo = new Array;
console.log(foo, getClass(foo));

bar = [];
console.log(bar, getClass.call(bar));

RegExp = Number;
foo = new RegExp;
console.log(foo, getClass.call(foo));

bar = /(?!)/g;
console.log(bar, getClass.call(bar));

```
