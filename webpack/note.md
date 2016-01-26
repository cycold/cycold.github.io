```
entry: {
    vendor: ["jquery", "lodash"],
    utils: './app/components/utils/index.js',
    app: './app/app.js',
  },
```

如果`utils`被app依赖,那么utils不能作为入口,报错: 
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
