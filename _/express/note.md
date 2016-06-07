关于express核心: 函数即对象. 
当回调函数执行时,本身就是对象,携带着对象的属性方法,以便在执行时直接调用
var app = express(); // 返回的就是一个函数(同时即对象)
app就是顶层的一个回调函数(同时又是对象), 当请求开始时,最新执行app(req, res, next)函数
所以整个express的框架的入口函数就是app,即: 当请求开始时,首先处理这个请求的就是从app函数入口
即:
```
http.createServer(app);
```
app(req, res, next) 中调用: app.handle(req, res, next) 中调用: router.handle(req, res, next) 








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


每一次请求都会调用:`app.handle`函数 负责处理为进来的请求分配(dispatch router)路由
```
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  app.request = { __proto__: req, app: app };
  app.response = { __proto__: res, app: app };
  app.init();
  return app;
}
```

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
