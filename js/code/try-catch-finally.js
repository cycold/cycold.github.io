var foo = function(callback, errback) {
  var value = 1
  setTimeout(function() {
    //if (Math.random() < .5) return callback(value)
    try {
      console.log('try')
      a.hello('a')
    } catch(e) {
      console.log('catch')
      return errback(e)
    } finally {
      console.log('finally')
      //return
    }
    console.log('hello')
  }, 1000)
}

foo(function(val) {
  val && console.log('foo: ',val)
}, function(err) {
  err && console.log('foo: ', err)
})
