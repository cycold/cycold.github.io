注意端口一定要为数字:(socket.io.js listen方法中,判断如果为数字,就require('http').createServer),如果为字符串那么就会出现server.on未定义
具体详见其源码: socket.io.js
```js
"development": {
    "connector": [
      {"id": "connector-server-1", "host": "127.0.0.1", "port": "4050", "clientPort": "3050", "frontend": true}
    ]
  },

port字段一定要为数字,不能为字符串
"development": {
    "connector": [
      {"id": "connector-server-1", "host": "127.0.0.1", "port": 4050, "clientPort": 3050, "frontend": true}
    ]
  },
```