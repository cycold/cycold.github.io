```js
app.param = function param(name, fn) {
  this.lazyrouter();

  if (Array.isArray(name)) {
    for (var i = 0; i < name.length; i++) {
      this.param(name[i], fn); //递归调用 name[i]每一次执行不是数组,调用this._router.param(name,fn)
    }

    return this;
  }
  // app.param本质就是调用router.param();name为数组,就多次调用
  this._router.param(name, fn);

  return this;
};
```
