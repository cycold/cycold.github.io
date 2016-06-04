// 强制将一个value转换为promise

var ref = function(value) {
  // 如果是promise
  if (value && typeof value.then === 'function') {
    return value
  }

  return {
    then: function(callback) {
      callback(value)
    }
  }
}
//-------------more complicated...

var ref = function(value) {
  // 如果是promise
  if (value && typeof value.then === 'function') {
    return value
  }
  return {
    then: function(callback) {
      return ref(callback(value))
    }
  }
}

var defer = function() {
  var pending = [], value
  return {
    reslove: function(_value) {
      if (pending) {
        //console.log(_value) 这里传入的_value: 第一次是事件触发时传入的数据,第二次是then参数中回调函数运行完后的返回值
        value = ref(_value) // values wrapped in promise
        for (var i = 0; i < pending.length; i++) {
          var callback = pending[i]
          value.then(callback) // then called instead:
          // 第一次resolve被调用: 执行_callback(value)
          // 紧接着: // result.reslove(_callback的返回值)
        }
      }
    },
    promise: {
      then: function(_callback){
        var result = defer()
        // 封装callback
        var callback = function(value) {
          // 将此次then参数中的回调函数运行结束后返回值赋值给下一个then中的回调函数中的参数
          result.reslove(_callback(value))
        }
        if (pending) {
          pending.push(callback)
        } else {
          // callback(value)
          value.then(callback)
        }
        return result.promise
      }
    }
  }
}

var df = defer()

// 发起一个异步任务
setTimeout(function() {
  df.reslove(1)
}, 2000)


var p = df.promise.then(function(val) {
  console.log(val)
  return 5
}).then(function(val) {
  console.log('should 5: ', val)
})
