
`/components/connector.js`
需要依赖session组件,在connector start 时就会将app初始化时的session组件挂载到this.session上
```
this.server = this.app.components.__server__;
this.session = this.app.components.__session__;
this.connection = this.app.components.__connection__;
```

# 监听`connection`事件, 由`hostFilter(bindEvents)`处理,hostFilter函数主要是通过远程的`socket.remoteAddress.ip`过滤ip
```
pro.afterStart = function(cb) {
  this.connector.start(cb);
  this.connector.on('connection', hostFilter.bind(this, bindEvents));
};
```

当hostFilter执行完后,转交给回调函数`bindEvents`(同时将socket传给回调函数)往下处理
各个socket事件('message','disconnect','error'),同时在`bindEvents`中统计
连接数,同时创建此次连接的`session`(调用上面的this.session = this.app.components.__session__;)
```
var bindEvents = function(self, socket) {
    // ....
    //socket connection事件一发生,就创建此 connection session
    var session = getSession(self, socket);

    // 在`message`事件中获得原始socket数据(二进制),同时进行解码
    socket.on('message', function(msg) {
        对msg数据进行解码
        dmsg = self.connector.decode(msg);
        将解码后的数据传给
        handleMessage(self, session, dmsg);
        此时进入handleMessage
    }
}
```

handleMessage中
```
self.server.globalHandle(msg, session.toFrontendSession(), function(err, resp, opts) {
    // ....
}
```
调用`server`组件的globalHandle方法处理msg, session.toFrontendSession()前端session

`server.globalHandle`中开始判断服务器类型,路由到其他服务器通过rpc调用
后端服务使用:doForward(self.app, msg, session, routeRecord,cb)
前端服务使用:doHandle(self, msg, session, routeRecord, cb)

> 如果请求的是前端服务器的Handler，
> 那么CoServer的doHandle中将会发起其filter-handler链，完成请求的处理，最常见的这种请求就是用户登录请求
> 如果请求的路由不是前端服务器的，那么CoServer的`doFoward`将会发起sys rpc给相应的后端rpc。
> 当发起sys rpc调用时，由于同类型的后端服务器一般都有很多，故需要做一个路由选择。这个路由选择策略用户可以配置，
> 通过app.route调用，如果用户不配置的话，pomelo会使用一个默认的路由配置。后端服务器接受到请求后，
> 会执行其CoServer的doHandle，跟前端服务器一样，
> 会使用filter-handler链，对用户的请求进行处理，然后将响应返回给前端服务器，并由前端服务器将响应发送到客户端

```
if(self.app.getServerType() !== routeRecord.serverType) {
      doForward(self.app, msg, session, routeRecord, function(err, resp, opts) {
        //logger.debug('doForward session:>\n');
        //console.log(session);
        response(true, self, err, msg, session, resp, opts, cb);
      });
    } else {
      doHandle(self, msg, session, routeRecord, function(err, resp, opts) {
        response(true, self, err, msg, session, resp, opts, cb);
      });
    }
```

现在前端的请求过来了,那么怎么分配此次请求的具体的处理函数呢(handler)? 
doHandle(self, msg, session, routeRecord, function(err, resp, opts) {}
由doHandle函数来做路由分配根据传过来的msg中的route, 如果路由为`route: connector.entryHandler.enter`
那么就有connector目录下的handler下的entryHandler.js文件中的enter方法

dohandler中首先:`beforeFilter(false, server, msg, session, handle);`
最后调用: 
```
self.handlerService.handle(routeRecord, msg, session, function(err, resp, opts) {
      if(err) {
        //error from handler
        handleError(false, self, err, msg, session, resp, opts, function(err, resp, opts) {
          response(false, self, err, msg, session, resp, opts, cb);
        });
        return;
      }

      response(false, self, err, msg, session, resp, opts, cb);
    });
```

self.handlerService =  new HandlerService(app, opts)

server.js 文件
`var HandlerService = require('../common/service/handlerService');`

```
Service.prototype.handle = function(routeRecord, msg, session, cb) {
  // the request should be processed by current server
  var handler = this.getHandler(routeRecord); // 根据路由 require具体的文件 require('connector/handler/entryHandler.js')
  if(!handler) {
    logger.error('[handleManager]: fail to find handler for %j', msg.__route__);
    utils.invokeCallback(cb, new Error('fail to find handler for ' + msg.__route__));
    return;
  }
  var start = Date.now();

  // require('connector/handler/entryHandler.js') 调用里面具体的方法根据传过来路由
  handler[routeRecord.method](msg, session, function(err, resp, opts) {
    var log = {
      route : msg.__route__,
      args : msg,
      time : utils.format(new Date(start)),
      timeUsed : new Date() - start
    };
    forwardLogger.info(JSON.stringify(log));
    //console.log('resp:>\n');
    //console.dir(resp, {depth:null});
    utils.invokeCallback(cb, err, resp, opts);
  });
  return;
};
```


`connector.js --> server.js --> lib/common/service/handlerService.js`


servers目录下的路由就映射为:`handler[routeRecord.method](msg, session, function(err, resp, opts) {...})`

当底层socket触发message事件时,首先decode(msg)得到路由以及其他的信息(由pomleo底层二进制协议封装(见pomelo-protocol协议))
得到路由后,通过解析路由,将此次事件请求分配到的具体的处理函数(servers目录下文件中)

handler[routeRecord.method] === handler.enter


module.exports = function(app) {
    return new Handler(app);
};
var Handler = function(app) {
    this.app = app;
    this.biz_redis = app.get('biz_redis');
};
handler.enter = function(msg, session, next) {}
中的next回调方法中最终才会调用:  `response(false, self, err, msg, session, resp, opts, cb);` 在server.js文件中

所以最终返回客户端的都是调用`response(false, self, err, msg, session, resp, opts, cb);` 方法, 其中cb是最后的回调函数,如果最后没有什么操作,
那么,cb至少必须为一个空函数,不能省略

``` server.js
var response = function(isGlobal, server, err, msg, session, resp, opts, cb) {
  if(isGlobal) {
    cb(err, resp, opts);
    // after filter should not interfere response
    afterFilter(isGlobal, server, err, msg, session, resp, opts, cb);
  } else {
    afterFilter(isGlobal, server, err, msg, session, resp, opts, cb);
  }
};

```

其中cb是最后的回调函数,在这里执行(connect.js):
self.server.globalHandle(msg, session.toFrontendSession(), function(err, resp, opts) {
    if(resp && !msg.id) {
      logger.warn('try to response to a notify: %j', msg.route);
      return;
    }
    if (!msg.id && !resp) return;
    if (!resp) resp = {};
    if (!!err && !resp.code){
      resp.code = 500;
    }
    opts = {type: 'response', userOptions: opts || {}};
    // for compatiablity
    opts.isResponse = true;

    self.send(msg.id, msg.route, resp, [session.id], opts,
      function() {});
  });

  所以整个流程最终是通过self.send(msg.id, msg.route, resp, [session.id], opts,function() {}); 建行消息送给客户端的.

  send 方法: 发送之前进行 编码encode
  ```
  pro.send = function(reqId, route, msg, recvs, opts, cb) {
  logger.debug('[%s] send message reqId: %s, route: %s, msg: %j, receivers: %j, opts: %j', this.app.serverId, reqId, route, msg, recvs, opts);
  console.log('connector send message:>\n');
  console.dir(msg,{depth:null})
  //console.log('-------------------');
  var emsg = msg;
  if(this.encode) {
    // use costumized encode
    console.log('use costumized encode');
    emsg = this.encode.call(this, reqId, route, msg);
  } else if(this.connector.encode) {
    console.log('use connector default encode');
    // use connector default encode
    emsg = this.connector.encode(reqId, route, msg);
    //console.log('emsg:>\n');
    //console.dir(emsg, {depth: null});
  }

  if(!emsg) {
    process.nextTick(function() {
      utils.invokeCallback(cb, new Error('fail to send message for encode result is empty.'));
      return;
    });
  }

  this.app.components.__pushScheduler__.schedule(reqId, route, emsg,
      recvs, opts, cb);
};
  ```

最终在是没有直接发送,而是保存在:`this.app.components.__pushScheduler__`组件中,有此组件进行调度发送
```
this.app.components.__pushScheduler__.schedule(reqId, route, emsg,recvs, opts, cb);
```
