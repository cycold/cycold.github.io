安装babel `npm i -D babel-cli`
依赖: `npm list -depth=1`
```
├─┬ babel-cli@6.11.4
│ ├── babel-core@6.13.2
│ ├── babel-polyfill@6.13.0
│ ├── babel-register@6.11.6
│ ├── bin-version-check@2.1.0
│ ├── chalk@1.1.1
│ ├── chokidar@1.6.0
│ ├── commander@2.9.0
│ ├── convert-source-map@1.3.0
│ ├── fs-readdir-recursive@0.1.2
│ ├── glob@5.0.15
│ ├── lodash@4.14.2
│ ├── log-symbols@1.0.2
│ ├── output-file-sync@1.1.2
│ ├── path-exists@1.0.0
│ ├── path-is-absolute@1.0.0
│ ├── request@2.74.0
│ ├── slash@1.0.0
│ ├── source-map@0.5.6
│ └── v8flags@2.0.11
```

编译: 
```package.json
"scripts": {
    "build": "babel src -d babel_build"
  },
```

配置文件-0`.babelrc`
```
{
    "presets": [],
    "plugins": []
}
```

```js
// src/index.js
const print = str => console.log(str)
print('hello')

function addAll() {
  return Array.from(arguments).reduce((a, b) => a + b);
}
console.log("addAll: ", addAll(1,1))

var str = 'To be, or not to be, that is the question.';

console.log('String.includes To be: ', String.includes('To be, or not to be, that is the question.', 'To be')); // true

console.log('To be: ', str.includes('To be'));       // true

let arr = [1, 2, 3, 4, 5]
let includes = arr.includes(2)
console.log("includes: ", includes)

console.log("Promise: ", Promise)
let p = Promise.resolve("hhhh")
p.then(result => console.log('promise.resolve: ', result))

class Foo {
  boo() {
    console.log('boo')
  }
}
```

此时如果执行`npm run build` 
```
首先babel会读取配置文件, 主要是确定需要转换成哪种版本的js, 由于以上没有配置需要转换的版本,所以这里只是简单的文件复制.并没有发生实际编译
```

配置文件-1`.babelrc`
```
{
    "presets": ['es2015'],
    "plugins": []
}
```

安装需要转换的js版本
`npm i -D babel-preset-es2015`

此时再编译 `npm run build`

```js
// 编译后的文件
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// src/index.js
var print = function print(str) {
  return console.log(str);
};
print('hello');

function addAll() {
  return Array.from(arguments).reduce(function (a, b) {
    return a + b;
  });
}
console.log("addAll: ", addAll(1, 1));

var str = 'To be, or not to be, that is the question.';

console.log('String.includes To be: ', String.includes('To be, or not to be, that is the question.', 'To be')); // true

console.log('To be: ', str.includes('To be')); // true

var arr = [1, 2, 3, 4, 5];
var includes = arr.includes(2);
console.log("includes: ", includes);

console.log("Promise: ", Promise);
var p = Promise.resolve("hhhh");
p.then(function (result) {
  return console.log('promise.resolve: ', result);
});

var Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: 'boo',
    value: function boo() {
      console.log('boo');
    }
  }]);

  return Foo;
}();
```
发现箭头函数被转成了es5函数,增加了严格模式, `const` 被转成了 `var`
类`class`被构造函数替换掉了. 
多了下面几段代码: 
```js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
```
主要是为了转换`class`辅助用的.  

### 这里也就产生了问题: 
1. 如果有多个文件,每个文件中都有定义class,那么每个文件都会包含重复的代码.
2. 有些浏览器目前还没有`Promise`, `Array.from()` `String.prototype.includes` `Array.prototype.includes`方法 上面并没有转换`includes`, `Promise`, `Array.from`方法
3. 注意上面的 `Stirng.includes()` 在原生js中是错误的, 但是只要后面配置插件`babel-plugin-transform-runtim`就能做转换的

---> 解决这几个问题: babel引入了插件`babel-plugin-transform-runtim` 解决这个问题 
```
注意: 此插件依赖于: `babel-runtime` 确保babel-runtime已安装 (上面的npm i -D babel-cli 已安装了babel-runtime)
```

配置文件-2`.babelrc`
```
{
    "presets": ['es2015'],
    "plugins": ['transform-runtime']
}
```

此时编译后文件: 
```js
// 编译后的文件
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _includes = require('babel-runtime/core-js/string/includes');

var _includes2 = _interopRequireDefault(_includes);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src/index.js
var print = function print(str) {
  return console.log(str);
};
print('hello');

function addAll() {
  return (0, _from2.default)(arguments).reduce(function (a, b) {
    return a + b;
  });
}
console.log("addAll: ", addAll(1, 1));

var str = 'To be, or not to be, that is the question.';
console.log('String.includes To be: ', (0, _includes2.default)('To be, or not to be, that is the question.', 'To be')); // true
console.log('To be: ', str.includes('To be')); // true

var arr = [1, 2, 3, 4, 5];
var includes = arr.includes(2);
console.log("includes: ", includes);

console.log("Promise: ", _promise2.default);
var p = _promise2.default.resolve("hhhh");
p.then(function (result) {
  return console.log('promise.resolve: ', result);
});

var Foo = function () {
  function Foo() {
    (0, _classCallCheck3.default)(this, Foo);
  }

  (0, _createClass3.default)(Foo, [{
    key: 'boo',
    value: function boo() {
      console.log('boo');
    }
  }]);
  return Foo;
}();
```

https://babeljs.io/docs/plugins/transform-runtime/

此时`transform-runtime`插件解决了以上的几个问题,但是依然有一个问题没有解决(后面讨论)
1.将共有的函数从共有的库(就是`babel-runtime`)中引入 (比如转换class的代码)
2.将一些浏览器还没有的功能(比如Promise, includes...)这里就进行了补丁(使用共有的库`babel-runtime`).
这里的`babel-runtime` 其实就包含了所有的es6->es5的shim/polyfill(补丁).

而在 `babel-runtime` 内部其实引用的是 `core-js`  https://github.com/zloirock/core-js#commonjs
(The transformer will alias these built-ins to core-js so you can use them seamlessly without having to require the polyfill.)


`transform-runtime`插件 本身的问题: 
1. 转换后,变成的common.js风格代码, 不能在浏览器中执行. 需要使用其他打包工具
2. 对于`实例方法`无法shim/转换 (比如上面的 [1, 2, 3, 4, 5].includes(2), str.includes('To be'))
   (对于静态方法是可以转换的 比如上面的 `String.inlcudes("abc", "a")`  `Array.from`)
   这也就是说如果需要使用某些方法,比如`[].includes()`, 在`transform-runtime`就只能通过静态调用的方式: `Array.includes()`


## 那对于实例方法该怎么解决呢? 
1. 使用`babel-ployfill`插件(此时就不再需要`transform-runtime`插件), 此插件需要在文件头部引入. 并且是注入到全局
2. 直接按需引用, 完全不使用`transform-runtime`. 因为`transform-runtime`插件本质上就是使用`core-js`
   那么就直接使用`core-js`即可. 具体使用见 https://github.com/zloirock/core-js#commonjs
```js
// 按需加载
// import "babel-polyfill"  //这里全部加载过于庞大


// 按需加载:  https://github.com/zloirock/core-js#commonjs

// 加载所有的ES6数组方法
// require('core-js/es6/array');
// require('core-js/es7/array');

// 加载具体的方法
require('core-js/fn/array/from');
require('core-js/fn/array/includes');
require('core-js/fn/string/includes');

console.log('core-js/fn/**/includes')

// console.log('process: ', process)

// 只加载promise
require('core-js/es6/promise')

class Foo {
  method() {}
}

const print = str => console.log(str)

print('hello')

function addAll() {
  return Array.from(arguments).reduce((a, b) => a + b);
}

console.log("addAll: ", addAll(1,1))


var str = 'To be, or not to be, that is the question.';
console.log('To be: ', str.includes('To be'));       // true

let arr = [1, 2, 3, 4, 5]
let includes = arr.includes(2)
console.log("includes: ", includes)

console.log("Promise: ", Promise)
let p = Promise.resolve("hhhh")
p.then(result => console.log('promise.resolve: ', result))



```





