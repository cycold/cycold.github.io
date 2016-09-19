#### 编译
> 注意: babel-v5 中, babel已经内置了react的jsx转换, 无需其他安装,直接就可以使用babel进行jsx文件的编译
> BUT:
> Beginning with Babel 6, there are no transforms included by default. 
> This means that options must be specified when running the babel command, 
> or a `.babelrc` must specify options. 
> Additional packages must also be installed which bundle together a number of transforms, 
> called `presets`. 
> The most common use when working with React will be to include the es2015 and react presets. 
> More information about the changes to Babel can be found in http://babeljs.io/blog/2015/10/29/6.0.0
> 6.0版本改变:主要就是babel不仅仅是一个es5的转换工具, 他们想用babel做更多的事,使其成为一个babel的ecosystem.
> 将转换器进行了模块化,比如需要es5的转换器就使用es5的转换器,需要coffee 的转换器就是用coffee的转换器, 需要jsx的转换器就使用react的
> 需要typescript就是使用typescript的转换器
> 他们引入了`Plugin Presets`机制
> 官方的`presets`目前只有两个: `babel-preset-es2015` and `babel-preset-react`,
> (The official presets included today are `babel-preset-es2015` and `babel-preset-react`, but we expect there will be many more in the future.)

所以在进行编译之前需要安装相应转换器:
`npm i -D babel-preset-es2015 babel-preset-react`

使用一下命令进行编译:http://babeljs.io/docs/usage/cli/
使用命令行编译: 需要安装: `npm install --save-dev babel-cli`
(不要全局安装 babel-cli, that is a bad idea. )
所以如果没有全局安装,运行babel命令,就需要明确路径了: `./node_modules/.bin/babel -V`
`./node_modules/.bin/babel --presets es2015,react --watch src/ --out-dir lib/`
