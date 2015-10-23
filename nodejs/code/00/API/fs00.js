var fs = require('fs')

// fs.readFile('fs00.js', function(err, data) {
//   console.log(Buffer.isBuffer(data))
//   console.log(data.toString())
// })

// fs.writeFile('text.txt', 'This is a test...', function(err) {
//   if (err) { throw err }
//   console.log(fs.readFileSync('text.txt').toString())
// })

var readStream = fs.createReadStream('fs00.js')
readStream.pipe(process.stdout)

var writeStream = fs.createWriteStream('fib.txt')
var fib = require('./fib2')

fib.pipe(writeStream)