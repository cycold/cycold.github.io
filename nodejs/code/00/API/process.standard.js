/*process.stdin.setEncoding('utf8')

process.stdin.on('readable', function() {
  process.stdout.write('readable: ' + process.stdin.read())
})

process.stdin.on('data', function(chunk) {
  process.stdout.write('chunk: ' + chunk.toString())
})

process.stdin.on('end', function() {
  process.stdout.write('end')
})*/

var trans = require('stream').Transform()

trans._transform = function(chunk, encoding, done) {
 /* this.push(chunk.toString().split('').map(function(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1)
  }).join(''))*/

  this.push(Array.prototype.map.call(chunk.toString(),function(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1)
  }).join(''))

  done()
}

process.stdin.pipe(trans).pipe(process.stdout)