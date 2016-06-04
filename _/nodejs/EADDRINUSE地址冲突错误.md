当出现如下错误提示时:
```
events.js:141
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3000
    at Object.exports._errnoException (util.js:849:11)
    at exports._exceptionWithHostPort (util.js:872:20)
```
以上提示没有监听error错误处理事件 EADDRINUSE表示端口冲突
一般都是: `同时运行两个node程序,而且端口相同`
或者
```
{ [Error: listen EADDRINUSE :::3000]
  code: 'EADDRINUSE',
  errno: 'EADDRINUSE',
  syscall: 'listen',
  address: '::',
  port: 3000 }
```

