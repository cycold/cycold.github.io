初始化:
app.get('/',fn);
var route = this._router.route(path);  //处理路径...
route[method].apply(route, slice.call(arguments, 1)); // 处理回调函数,去掉第一个参数(slice.call(arguments, 1))余下的都为回调函数

接收请求:
app(req, res, next)
app.handle(req, res, next)

// router/index.js
router.handle(req, res, done);

每一路由请求都会通过req上的path在stack中循环遍历匹配:
其中会判处stack中不是route的函数,....

每一次请求都会做一次循环遍历 查找相应的函数来执行 只要第一个函数被确定,
第一个函数会保存所有的回调函数在其自己this.stack中
那么之后就会向多米诺骨牌一样,
会引发一连串的函数(中间件)执行

