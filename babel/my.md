babel从6版本起，需要明确指定其`preset`
`babel script.js` 如果没有在配置文件中指定preset，那么babel将不会编译，原样输出script.js内容
或者显示的声明preset
`babel --help`
`babel --presets es2015 script.js`