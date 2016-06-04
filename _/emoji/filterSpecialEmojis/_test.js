var filterEmojis = require('./index.js')
var spicalEmojis = require('./_special_emojis.json')

var ts = 'hello', ts2 = 'hello𠮷', ts3 = 'hello🤔', ts4 = '🤔he🤔llo🤔𠮷', ts5 = '🤔he🤔llo🤔𠮷🤔🤔🤔𠮷'
var ts6 = '你好lo🤔𠮷🤔??>🤔🤔✅🤔🤔☁️'

console.log(filterEmojis(ts, spicalEmojis, ['2015']))
console.log(filterEmojis(ts2, spicalEmojis, ['2015']))
console.log(filterEmojis(ts3, spicalEmojis, ['2015']))
console.log(filterEmojis(ts4, spicalEmojis, ['2015']))
console.log(filterEmojis(ts5, spicalEmojis, ['2015']))
console.log(filterEmojis(ts6, spicalEmojis, ['2015']))

console.log('default-------;>\n')

console.log(filterEmojis(ts6))
console.log(filterEmojis(ts3))
console.log(filterEmojis(ts4))
console.log(filterEmojis(ts2))
console.log(filterEmojis(ts5))



// console.log('𠮷'.codePointAt(0))