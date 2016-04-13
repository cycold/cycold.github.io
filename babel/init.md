http://www.ruanyifeng.com/blog/2016/01/babel.html
Babel的配置文件是`.babelrc`，
存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。
该文件用来设置转码规则和插件，基本格式如下。
```js
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装
```shell
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后，将这些规则加入`.babelrc`
```js
{
   "presets": [
     "es2015",
     "react",
     "stage-2"
   ],
   "plugins": []
 }
```



### 命令行转码babel-cli
Babel提供babel-cli工具，用于命令行转码。
它的安装命令如下: 
`$ npm install --global babel-cli`
基本用法如下: 
```bash
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

上面代码是在全局环境下，进行Babel转码。这意味着，如果项目要运行，全局环境必须有Babel，
也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。
一个解决办法是将babel-cli安装在项目之中。

然后，改写`package.json`
```js
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```

转码的时候，就执行下面的命令
`$ npm run build`

#### babel-node
babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
它不用单独安装，而是随babel-cli一起安装。然后，执行babel-node就进入PEPL环境
```js
$ babel-node
> (x => x * 2)(1)
2
```

babel-node命令可以直接运行ES6脚本。将上面的代码放入脚本文件es6.js，然后直接运行。
babel-node也可以安装在项目中。
`$ npm install --save-dev babel-cli`
然后，改写package.json
```
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```

### babel-register
babel-register模块改写require命令，为它加上一个钩子。
此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。

`$ npm install --save-dev babel-register`
使用时，必须首先加载babel-register。
```js
require("babel-register");
require("./index.js");
```
然后，就不需要手动对index.js转码了。
需要注意的是，babel-register只会对require命令加载的文件转码，
而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

### babel-core
如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。
安装命令如下。
`$ npm install babel-core --save`
然后，在项目中就可以调用babel-core。
```js
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

配置对象options，可以参看官方文档http://babeljs.io/docs/usage/options/。
下面是一个例子。

