
```js
app.get('/', fn) // app.get调用多少次就创建多少个route和layer对象
--->
//处理路径..
var route = this._router.route(path); // Router.js
// this._router.route(path) 调用创建两个对象 :
// route(当前路由对象,每一个路由都会有一个不同的路由对象,两次调用同一个app.get('/', fn),会创建不同的对象)
// layer 对象(end设为true严格匹配路由)
// 这两个对象通过layer的属性route关联即: layer.route = route 
// 然后将layer推入到this.stack中,只要找到layer就能找到相应的route

proto.route = function route(path) {
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;  // 每一个layer和每一个router通过属性 .route互相关联, 一一对应

  this.stack.push(layer); //保存到全局的this.stack中 this.stack在内存中只会创建一份属于 `app._router` 指向 this.stack中的this
  return route;
};

// 处理回调函数,去掉第一个参数(slice.call(arguments, 1))余下的都为回调函数
route[method].apply(route, slice.call(arguments, 1));
```