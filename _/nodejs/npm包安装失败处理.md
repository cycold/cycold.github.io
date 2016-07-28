1. 使用淘宝源
2. 修改package.json中包的版本号(将~,^这些比较有限制的,改为>=,或者反之)
2. 去掉失败的包(在package.json)中,之后再单独安装失败的包
3. 翻墙

对于数字签名错误: 
http://stackoverflow.com/questions/26309549/npm-install-express-give-me-checksum-error

#### 一般是网络问题,下载的安装包没有下载完全,特别是压缩包, 一般是换一个镜像源或者重新下载 或者手动下载过来安装

`npm config get registry`

```
download the file https://registry.npmjs.org/express/-/express-4.9.7.tgz
then install from the file
npm install ./express-4.9.7.tgz
```

or
```
$ npm cache clean express
$ npm i express
```
