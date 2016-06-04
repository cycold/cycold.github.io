var path = require('path')

var resolve = path.resolve

var str = "signin.html"

console.log('resolve:\n', resolve(str))
///Users/icewater/x-dev/TT/icewaters.github.io/nodejs/code/00/API/signin.html

console.log('resolve:\n', resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile'))
console.log('resolve:\n', resolve())

