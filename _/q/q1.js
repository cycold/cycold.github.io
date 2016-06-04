// Also, there are a variety of ways to distinguish a promise from other values.
// The most obvious and strongest distinction is to use prototypical inheritance.

var Pormise = function(){}

var isPromise = function(value) {
  return value instanceof Pormise
}

var defer = function(){
  var pending = [], value
  var promise = new Pormise()
  promise.then = function(callback) {
    if (pending) {
      pending.push(callback)
    } else {
      callback(value)
    }
  }

  return {
    resolve: function(_value) {
      if (pending) {
        value = _value
        for (var i = 0; i < pending.length; i++) {
          pending[i](value)
        }
        pending = undefined
      }
    },
    promise: promise
  }
}

var defer1 = defer()
var defer2 = defer()

// 发起一个异步任务
setTimeout(function(){
  defer1.resolve(1)
}, 1000)

setTimeout(function(){
  defer1.resolve(11)
}, 2000)

// 给我一个承诺(成功或者失败)
defer1.promise.then(function(val) {
  val && console.log('val: ', val)
})
defer1.promise.then(function(val) {
  val && console.log('val: ', val)
})

// using duck-typing style distinguishing promise from the other values
var isPromise = function(value) {
  return value && typeof value.then === 'function'
}

var defer = function() {
  var pending = [], value
  return {
    resolve: function(_value) {
      if (pending) {
        value = _value
        for (var i = 0; i < pending.length; i++) {
          pending[i](value)
        }
        pending = undefined
      }
    }
    promise: {
      then: function(callback){
        if (pending) {
          pending.push(callback)
        } else {
          callback(value)
        }
      }
    }
  }
}


