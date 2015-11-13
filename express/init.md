```js
app.get('/', fn) -> app.lazyrouter() -> router = new Router() (同时app._router -> router)
(app和路由实例连接的关键就是app._router(this._router) = router)

new Router() 后, 会执行两个初始化中间件
this._router.use(query(this.get('query parser fn')));
this._router.use(middleware.init(this));

router.__proto__ = proto -> proto.handle, proto.param, proto.use ....
router.params = {} // { id: [ [Function] ], age: [ [Function] ] } 初始化时讲参数和回调函数一一对应 等待请求时就可以立马得到执行
router.stack = []
```

请求执行:
app.handle -> router.handle(req, res, done) -> router.stack = [] 执行中间件
// router.stack = [] 执行中间件 在node初始化之前,已经都在程序中定义好了,
// 一旦请求过来 按照内存中的程序执行即可