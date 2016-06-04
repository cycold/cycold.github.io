babel从6版本起，需要明确指定其`preset`
`babel script.js` 如果没有在配置文件中指定preset，那么babel将不会编译，原样输出script.js内容
或者显示的声明preset
`babel --help`
`babel --presets es2015 script.js` (注意全局调用无效，除非babel-preset-es2015也是全局安装的)

`../node_modules/.bin/babel --presets es2015 test01.js`
最好是配置好`.babelrc`配置文件

查看node支持的es6进程
`node --v8-options | grep "in progress"`