var ws = new (require('stream').Writable)()

var fib = require('./fib')

var count = 0

ws._write = function(chunk, encoding, next) {
  console.log(chunk.toString())
  // next()
  // setTimeout(next, 100)
  if (count++ < 10) {
    next();
  }
}

fib.pipe(ws)