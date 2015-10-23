var data = [];
for (var k = 0; k < 3; k++) {
  data[k] = (function _helper(x) {
  return function () {
    console.log(x);
  };
})(k); // pass "k" value
}
// now it is correct
data[0](); // 0
data[1](); // 1
data[2](); // 2

function fun(callback, len) {
  var data = []
  for (var i = 0; i < len; i++) {
     // callback(i)
     callback(i, function(idx) {
       console.log('callback-i: ', i)
       if (idx) i = idx
     }, function(i) {
       console.log('callback-2-i: ', i)
       i = 100
     })
     data.push(function() {
       console.log('i: ',i)
     })
     data[i]()
  }
  return data;
}

function ff(index) {
  console.log('index-ff: ', index)
  index = 7
  console.log('index-ff: ', index)
}

var fff = function(index) {
  console.log('index-fff: ', index)
}

var closures;

var fs = fun(function(index, fn, fn2) {
  console.log('index: ', index)
  // console.log('fn:', fn)
  fn() // 出栈后,改变了父作用域i的值(只要使用了父作用域的变量)
  fn2() //callback-2-i:  undefined 出栈后,和父作用域没有半毛钱关系

  // 保存执行环境,在fun出栈前,将此次运行结果(环境,此次运行的作用域链)保存下来(保存到全局变量中)
  closures = fn;
},3);

//var fs1 = fun(ff,4);
//var fs2 = fun(fff,5);

fs[0]() //i:  3
fs[1]() //i:  3
fs[2]() //i:  3


closures(); //callback-i:  3

// fs 和 closure 共用同一个闭包对象
// 使用 closures(12) 可以更改fs调用后的结果
closures(12);
fs[0]() //i:  12
fs[1]() //i:  12
fs[2]() //i:  12

// 又开始一个新的执行环境(上下文)(一个新的闭包又产生了)
/*var fs2 = fun(function(index,fn) {
  console.log('index: ', index)
  // console.log('fn:', fn)
  fn()

  // 保存执行环境
  closures = fn;
},3);*/
