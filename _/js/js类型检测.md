```js
// type of
typeof 100                  "number" 
typeof true                 "bollean"
typeof undefined            "undefined"
typeof new Object()         "object"
typeof {}                   "object"
typeof []                   "object"
typeof NaN                  "number"
typeof Infinity             "number"
typeof null                 "object"

// instanceof
// obj instanceof Object 
//如左操作符为基本数据类,立即返回false,右边的Object必须为函数对象或者一个构造器,如果不是,抛出异常
// obj中的__proto__属性上是否有引用(指向)Object构造函数的prototype对象

```