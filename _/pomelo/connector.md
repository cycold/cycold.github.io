connector组件在构造函数中获得底层的connector,默认为sioconnector, 用户通过app.configure配置传入到服务器
```
this.connector = getConnector(app, opts);
```

connector组件start时依赖下面三个组件:
```
  this.server = this.app.components.__server__;
  this.session = this.app.components.__session__;
  this.connection = this.app.components.__connection__;
```

connector 组件开启socket端口监听,是在afterStart时:
```
pro.afterStart = function(cb) {
  this.connector.start(cb);
  this.connector.on('connection', hostFilter.bind(this, bindEvents));
};
```

