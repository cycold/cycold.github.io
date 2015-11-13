关于app.get方法: 当参数为一个时,则返回`app.settings`中的设置值
`lib/appliication.js`
当参数大于1时,处理http的get请求.
这里的get被重载了.注意没有直接定义app.get = function(){},而是将其放在了http方法中统一定义
```js
methods.forEach(function(method){
  app[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});
```


每一次请求都会调用:`app.handle`函数, 
每一次都会先判断是否有回调函数callback,是否有定义路由
```
app.handle(req, res, callback){
  var router = this._router;

  // final handler
  var done = callback || finalhandler(req, res, {
    env: this.get('env'),
    onerror: logerror.bind(this)
  });

  // 如果没有回调函数,可以给finalhandler处理

  // no routes 
  // 在请求前(node初始化前,当node进程启动后,开始接受浏览器请求,node已进入内存后,路由定义已确定)
  // 得定义好路由(app.METHOD,app.use等调用(lazyrouter)都会创建路由对象)
  if (!router) {
    debug('no routes defined on app');
    done();
    return;
  }
  // 请求交给router处理
  router.handle(req, res, done);
}
```

`route/index.js`
```
 // mixin Router class functions router继承proto属性
  router.__proto__ = proto;
```