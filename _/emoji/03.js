var redis = require('redis').createClient(6379, '127.0.0.1')
redis.selected_db = 0

var punycode = require('punycode')

// redis.set('smile', '\xf0\x9f\x98\x8a')

redis.get('smile', function(err, result) {
  console.log('result', result)
  console.log('result', result.length)
  console.log('result', punycode.ucs2.decode(result))
  console.log('result', punycode.ucs2.encode(result))
  console.log(result == "\xf0\x9f\x98\x8a")
})



