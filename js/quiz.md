```js
(function(){
    return typeof arguments;
})();
// "object"

var f = function g(){ return 23; };
typeof g();
// "Error"

(function(x){
    delete x;
    return x;
})(1);
// 1

var y = 1, x = y = typeof x;
x;
// "undefined"

(function f(f){
  return typeof f();
})(function(){ return 1; });
// "number"

var foo = {
  bar: function() { return this.baz; },
  baz: 1
};
(function(){
  return typeof arguments[0]();
})(foo.bar);
// "undefined"

var foo = {
    bar: function(){ return this.baz; },
    baz: 1
  }
typeof (f = foo.bar)();
// "undefined"

var f = (function f(){ return "1"; }, function g(){ return 2; })();
typeof f;
// "number"

var x = 1;
  if (function f(){}) {
    x += typeof f;
  }
x;
// "1undefined"

var x = [typeof x, typeof y][1];
typeof typeof x;
// "string"

(function(foo){
    return typeof foo.bar;
})({ foo: { bar: 1 } });
// "undefined"

(function f(){
    function f(){ return 1; }
    return f();
    function f(){ return 2; }
})();
// 2

function f(){ return f; }
new f() instanceof f;
// fasle


```


