var ref = function(value) {
  if (value && typeof value.then === 'function') return value
  return {
    then: function(callback) {
      return ref(callback(value))
    }
  }
}

var reject = function(reason) {
  return {
    then: function(callback, errback) {
      return ref(errback(reason))
    }
  }
}

// reject("Meh.").then(function (value) {
//     // we never get here
//     console.log('hi')
// }, function (reason) {
//     console.log(reason)
// })


var defer = function() {
  var pending = [], value
  return {
    resolve: function(_value) {
      value = ref(_value)
      if (pending) {
        for (var i = 0; i < pending.length; i++) {
          value.then.apply(then, pending[i])
        }
        pending = undefined
      }
    },
    promise: {
      then: function(_callback, _errback) {
        var result = defer()

        // default callback
        _callback = _callback || function(value) {
          return value
        }

        _errback = _errback || function(reason) {
          return reject(reason)
        }

        var callback = function(value) {
          result.resolve(_callback(value))
        }
        var errback =function(reason) {
          result.resolve(_errback(reason))
        }

        if (pending) {
          pending.push([callback, errback])
        } else {
          value.then(callback, errback)
        }

        return result.promise
      }
    }
  }
}


var de = defer()
de.resolve('*')

//de.promise.then((val) => console.log('val: ', val))

de.promise.then(function(val) {
  console.log(val)
  return 1
}).then(function(val) {
  console.log(val)
  console.log(this == global)
  return de.promise
}).then(function(val) {
  console.log(val)
  return 3
})



if ([]) {
  console.log('continuing...')
}


