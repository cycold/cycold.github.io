var http = require('http')
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('hello world\n')
}).listen(( 1+ Math.random()) * 1000, '127.0.0.1')