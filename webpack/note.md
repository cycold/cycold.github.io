```
module.exports = {
    entry: 'main.js',  // 这里一定要写成相对路径,在没有指定上下文的情况下
    output: {
        filename: 'bundle.js'
    }
}
```
`ERROR in Entry module not found: Error: Cannot resolve module 'main.js' in /Users/icewater/Developer/learning/webpack-learning/basic/test02`
以上main.js明明就在test02目录下,为什么这里会报找不到的错误呢? 
原因: `要写成相对路径` `entry: './main.js'`

```
/**
 * Created by cycold on 5/10/16.
 */

// multipe entry point in Object
// 多个入口点,如果是一个对象,那么此时就会打包成多个chunk, 对象的键(key)就是chunk的名称,值(value)就是构成这个chunk代码块的文件数(模块数)
// [一个chunk是可以由多个js文件/模块打包而成的]
// 注意: 此时的js文件路径必须是相对路径,可以省略后缀名.js
module.exports = {
  context: __dirname,  // context must be a absoulte path
  entry: {
    // cats: './cats',
    // page1: './main',
    // page2: ['./entry1', './main'],
    page2: ['./entry1'],
    page3: ['./entry1' ,'./entry2', './main'],
  },
    output: {
        // filename: 'bundle.js'
        // filename: '[name].bundle.js',  // 如果是使用multiple point 那么为了得到多个chunk文件,就必须使用Make sure to use [name] or [id] in output.filename
        filename: '[id].bundle.js',  // 如果是使用multiple point 那么为了得到多个chunk文件,就必须使用Make sure to use [name] or [id] in output.filename
        chunkFilename: '[id].bundle.js', // chunkFilename 表示非入口点的chunk文件名
    path: './built' // write compile file to ./built directory as to be a absolute path(required)
    }
}

// 注意: 以上会报: Module not found: Error: a dependency to an entry point is not allowed
// 也就是当有多个入口时,每个入口就不能包含其他入口的依赖

// filename 和 chunkFilename的区别:
// filename就是入口点的文件名称
// chunkFilename 就是chunk代码块的文件名称, fielname代码块中require时,调用的chunkFilename
// 首先他们都是chunk 代码块, 只是filename是程序的入口, 在filename中又会依赖其他的chunk ,那么这些chunk就是这里的chunkFilename
// chunkFilename 文件可以是任何的静态资源文件(字体,图片,css),但是filename只能是js文件
```

entry: {
    vendor: ["jquery", "lodash"],
    utils: './app/components/utils/index.js',
    app: './app/app.js',
  },
```
如果`utils`被app依赖,那么utils不能作为入口,报错: 
```

```
ERROR in ./app/app.js
Module not found: Error: a dependency to an entry point is not allowed
 @ ./app/app.js 9:12-41

ERROR in ./app/components/home/index.js
Module not found: Error: a dependency to an entry point is not allowed
 @ ./app/components/home/index.js 1:12-31
```

如果要依赖其他的入口,可以:https://github.com/webpack/webpack/issues/300

```
entry: {
  a: "./a", // a requires b
  b: ["./b"] // workaround: "./b" can now be in another bundle
}
```

当找不到loader时 http://webpack.github.io/docs/configuration.html#module-loaders
```
IMPORTANT: The loaders here are resolved relative to the resource which they are applied to. 
This means they are not resolved relative to the configuration file. 
If you have loaders installed from npm and your node_modules folder is not in a parent folder of all source files,
 webpack cannot find the loader. You need to add the node_modules folder as absolute path to the resolveLoader.root option. 
 (resolveLoader: { root: path.join(__dirname, "node_modules") })
```
