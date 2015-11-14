
app.use('/user/signin', callback1, callback2);  
--> return app._router.use(path, fn)
- 处理参数
- 设置路由(this.lazyrouter() -> app._router -> app._router.stack, app._router.params... )
- app._router.stack.push(new Layer())
    这里每一个回调函数都会对应一个new Layer()对象,同时这个new Layer对象会保存这个回调函数