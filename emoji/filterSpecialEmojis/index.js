var punycode = require('punycode')
var _specialEmojiCodes = require('./_special_emojis.json')

/**
 * 过滤消息msg中的特定的emoji字符
 * @param  {String} msg                    需要过滤的消息字符串
 * @param  {Object} specialEmojiCodes      使用外部json文件定义需要过滤的emoji表情的unicode码范围,使用范围判断,避免循环判断
 * @param  {Array}  years                  json文件中定义的新增加的emoji表情的年份 ['2015']
 * @return {str}                           过滤掉特殊的emoji表情后的返回的字符串
 */
var filterSpecialEmojis = function(msg, specialEmojiCodes, years) {

  var specialEmojiCodes = specialEmojiCodes || _specialEmojiCodes
  var years = years || specialEmojiCodes.years

  if (typeof msg !== 'string') {
    console.log('msg is not string!')
    return
  }

  if (Array.isArray(years) && years.length > 0) {

    var strCodePoints = punycode.ucs2.decode(msg)
    var _strCodePoints = []
    var _isFilterEmoji = false

    for (var j = 0, jj = strCodePoints.length; j < jj; j++ ) {
      _isFilterEmoji = false
      if ( strCodePoints[j] < 65535 ) { //常规字符直接push,不再遍历
        _strCodePoints.push(strCodePoints[j])
      } else {
        years.forEach(function(year) {
          for(var i = 0, ii = specialEmojiCodes[year].length; i < ii; i++) {
            var rangeCode = specialEmojiCodes[year][i].split('..')
            if (rangeCode.length == 2) {
              if (strCodePoints[j] >= parseInt(rangeCode[0], 16) && strCodePoints[j] <= parseInt(rangeCode[1], 16)) {
                _isFilterEmoji = true
              }
            } else {
              if (strCodePoints[j] == parseInt(rangeCode[0], 16)) {
                _isFilterEmoji = true
              }
            }
          }
        })
        if (!_isFilterEmoji) _strCodePoints.push(strCodePoints[j])
      }
    }
    return punycode.ucs2.encode(_strCodePoints)
  } else {
    return msg
  }
}

module.exports = filterSpecialEmojis