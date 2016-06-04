// 当一个函数不能立即返回一个值时,比如需要1秒钟后才会返回一个值,那么这个函数该怎么写?
// 通常的写法是: 将1秒钟后的返回值传给一个函数的参数(即回调函数)

// 1秒钟后直接返回, 而此时console.log(aoo()) 早已经执行完毕了,可以说主线程上代码已经执行完了
// 那么1秒钟确实返回了一个值,而这个值却没有接受者(没有在主线程上的接收者)
var aoo = function() {
  var value = 1
  setTimeout(function() {
    return value
  },1000)
}
console.log('aoo: ',aoo())

// 我们不在1秒钟后直接返回这个值, 而是等到1秒钟后来运行一个函数fn,由这个函数fn将此时产生的值携带出去
// 那么好: (你是谁?从哪里来?到哪里去?来这里敢睡么?) 我是fn,从调用函数的参数中来(所以一般回调函数都是通过参数传递),回到主线程中去,主要是将此时产生的value运送出去
// 可以说这个函数目前存在的意义就是为了将这个值传出去,这里的这个函数一般叫: 回调函数(主线程代码执行完后然后根据事件触发与否再调用)
// 所以一般,一般情况下回调函数都不是立即执行的
// ok,有没有其他思路: 1秒钟后,不是通过运行一个函数来将此时的值携带出去呢?有没有其他走私这个值的方法呢? 此思路暂时保留
// 如果1秒钟执行的这个函数抛出了异常(错误),如何处理呢?
var boo = function(callback) {
  var value = 1
  setTimeout(function() {
    callback(value)
  }, 1000)
}
boo(function(val) {
  console.log('boo: ', val)
})

//
var coo = function(callback) {
  var value = 1
  setTimeout(function() {
    Math.random() < 0.5
    ? callback(value)
    : new Error('Sorry, I can not, you know...')
  },1000)
}
// 会发现,函数没有输出值,有错误,但是却没能捕获, 此时我们也可以将其作为一个值给携带出来,和之前处理值的方法相同
coo(function(val) {
  console.log('coo: ',val)
})

// nodejs 风格的回调函数错误处理
var doo = function(callback) {
  var value = 1
  setTimeout(function() {
    if (Math.random() < 0.5) {
      return callback(null, value)
    } else {
      return callback(new Error('err'))
    }
  }, 1000)
}

doo(function(err, value){
  if (err) return console.log('doo: ',err)
  console.log('doo: ',value)
})

// 或者将错误处理单独使用一个专门的错误处理函数
var eoo = function(callback, errback) {
  var value = 1
  setTimeout(function() {
    if (Math.random() < .5) return callback(value)
    return errback(new Error('err'))
  }, 1000)
}

eoo(function(val) {
  val && console.log('eoo: ',val)
}, function(err) {
  err && console.log('eoo: ', err)
})


var foo = function(callback, errback) {
  var value = 1
  setTimeout(function() {
    if (Math.random() < .5) return callback(value)
    try {
      a.hello('a')
      // throw "hi"
    } catch(e) {
      return errback(e)
    }
  }, 1000)
}

foo(function(val) {
  val && console.log('foo: ',val)
}, function(err) {
  err && console.log('foo: ', err)
})

// 如果不考虑直接返回一个回调函数呢?(即在某一时刻运行函数), 如果考虑返回一个状态机,或者黑盒子呢,
// 这个黑盒子里面包含需要在某时刻(比如1秒钟后)运行的函数(即回调函数:包括错误处理)
// 此时我们可以试着返回一个对象,这个对象包含着需要在某时刻运行的函数(即回调函数)
// 通常将这个返回的对象(状态机)称作promise.(就是先给你开一张空头支票,这张支票要么可以兑换,要么拒绝兑换,要么在等待兑换就这有限的几种状态)
// 本质其实没有变化: 也就是将回调函数(包括异常处理回调函数)进行封装处理.最终还是在某时刻运行函数(回调函数)来将值传递出去
// 也就是将回调函数从参数传递转变为对象属性方法(通常都是`then`方法)从而可以根据对象属性进行链式调用(来回避金字塔般的调用),属性方法的参数还是回调函数.
// 所以说js是函数式语言,到处都是函数,从参数一般都是函数(回调函数)体现的淋漓尽致

var goo = function() {
  var callback,value = 1

  setTimeout(function() {
    callback(value) // 某一时刻运行此函数, 但是此函数将会是某对象(promise)属性方法的参数传递进来
  }, 1000)

  return {
    then: function(_callback) {
      // var start = Date.now()
      // while (new Date() - start < 2000) {}
      // setTimeout(function(){callback = _callback}, 1500) // 此时就会出现回调函数传递进来,还没有来得及赋给即将触发的事件处理器: callback is not a function
      callback = _callback
    }
  }
}

goo().then(function(val) {
  val && console.log('goo: ',val)
})


// 初始状态的promises处于unresolved, 所有的回调函数都被push到一个挂起状态的数组监视器中(pending=[])
// 一旦promise的state变为resolved, 所有的监视器都将被通知,
// 这个promise被resolved后,新的回调函数立即被调用
// We distinguish the state change by whether the array of pending
// callbacks still exists,and we throw them away after resolution.

var hoo = function() {
  var pending = [], value

  setTimeout(function() {
    value = 1
    for (var i = 0; i < pending.length; i++) {
      var callback = pending[i]
      callback(value)
    } // 运行回调函数(现在是将回调函数作为数组的元素来运行,这和之前的单个函数运行本质上是一样的)
    pending = undefined // 运行完后,设置pending = undefined 这个标志,表明此时已经运行完毕(resoved包括运行成功或者失败)
  }, 1000)

  return {
    then: function(callback) {
      if (pending) {
        pending.push(callback)
      } else {
        callback(value)
      }
    }
  }
}

// 这里执行then函数,会首先将其参数(函数),先压入数组中,当时间到了之后,就会触发执行
hoo().then(function(val) {
  val && console.log('hoo: ', val)
})

// 再进一步抽象 出一个defer对象(函数)
// then 注册回调函数(包括错误处理回调)
// resolve 事件触发时,执行then方法注册的回调函数,主要就是为了将事件数据传出
var defer = function() {
  var pending = [], value
  return {
    resolve: function(_value) { // 调用回调函数
      value = _value
      for(var i = 0; i < pending.length; i++) {
        pending[i](value) // 调用回调函数(主要目的将数据传出)
      }
      pending = undefined
    },
    then: function(callback) {  // 注册回调函数, 事件触发时调用,传出事件中的处理的数据
      if (pending) {  //检查pending是否是数组
        pending.push(callback)
      } else {  //检查pending是否等于undefined
        callback(value)
      }
    }
  }
}
var ioo = function() {
  var result = defer()
  setTimeout(function() {
    result.resolve(2)
  }, 1000)
  return result
}

// ioo中的事件触发后,就是主动调用then参数中回调函数,将事件触发时的数据携带出来
// 也就是事件触发时会运行then参数中的回调函数(本质: 事件触发时运行函数,我么需要明确的就是运行哪个函数)
var io = ioo()
// io.resolve(3) //多次调用
io.then(function(val) {
  val && console.log('ioo: ', val)

})

// --------------------------------------------------------------------------------
var defer = function() {
  var pending = [], value
  return {
    resolve: function(_value) { // 调用回调函数
      value = _value
      if (pending) {
        for(var i = 0; i < pending.length; i++) {
          pending[i](value) // 调用回调函数(主要目的将数据传出)
        }
        pending = undefined
      } else {
        throw new Error("A promise can only be resolved once.")
      }
    },
    then: function(callback) {  // 注册回调函数, 事件触发时调用,传出事件中的处理的数据
      if (pending) {  //检查pending是否是数组
        pending.push(callback)
      } else {  //检查pending是否等于undefined
        callback(value)
      }
    }
  }
}
var joo = function() {
  var result = defer()
  setTimeout(function() {
    result.resolve(3)
  }, 1000)
  return result
}

// ioo中的事件触发后,就是主动调用then参数中回调函数,将事件触发时的数据携带出来
// 也就是事件触发时会运行then参数中的回调函数(本质: 事件触发时运行函数,我么需要明确的就是运行哪个函数)
var jo = joo()
//jo.resolve(3) //throw new Error("A promise can only be resolved once.") promise只能resolve一次
// 通常由事件本省来resolve
jo.then(function(val) {
  val && console.log('joo: ', val)
})






