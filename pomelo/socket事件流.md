
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





