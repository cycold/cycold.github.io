var abc = 'abc,你好,世界!'
var tempestString = 'Oh brave new world that has such people in it.'
var monthString = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'

// 将字符串的单个字符编码转成数组的每一个元素
function toCharCode(str,radix) {
  var radix = parseInt(radix,10)
  var getType = function(type) { return Object.prototype.toString.call(type).slice(8,-1) }

  if (radix && getType(parseInt(radix,10)) != 'Number') throw 'radix参数需为数字'

  if (getType(str) != 'String' ) throw '参数需要为字符串...'

  if(str && str.length == 0) return str

  var arr = new Array()

  for (var i = 0; i < str.length; i++) {
    var cc = String.prototype.charCodeAt.call(str.charAt(i),0)
    if (radix == undefined || radix == 10) {
      arr.push(cc)
    } else {
      arr.push(Number.prototype.toString.call(cc,radix))
    }
  }
  return arr
}

function toCharCode2(str, radix) {
  var radix = parseInt(radix,10)
  var getType = function(type) { return Object.prototype.toString.call(type).slice(8,-1) }

  if (radix && getType(parseInt(radix,10)) != 'Number') throw 'radix参数需为数字'

  if (getType(str) != 'String' ) throw '参数需要为字符串...'

  if(str && str.length == 0) return str

  return Array.prototype.map.call(str, function(currentValue, index, arr) {
    return radix == undefined || radix == 10
            ? currentValue.charCodeAt(0)  //返回的为10进制编码
            : Number.prototype.toString.call(currentValue.charCodeAt(0), radix) //将10进制转化为其他radix进制
  })
}

// 从字符编码转换成字符串(参数可以为编码字符数组,或者单个编码参数)
function fromCharCode(charCode) {
  if (getType(charCode) == 'Array') {
    return String.fromCharCode.apply(String,charCode)
  } else {
    return String.fromCharCode.call(String,charCode)
  }
}

// 字符串重复
function repeatString(str, num) {
  return new Array(num + 1).join(str);
}

console.log(toCharCode(abc,10))
console.log(toCharCode(abc,16))
console.log(toCharCode2(abc,10))
console.log(toCharCode2(abc,16))
//console.log(repeatString('Hello',4))


/*
函数功能：
  字符串按照指定字符串分割转换为数组
参数:
  str :需转换的字符串
  substr:分割字符串
返回值:
  转换后的数组
*/
function StringToArray(str,substr) {
  var arrTmp = new Array()
  if(substr =="" ) { return arrTmp.push(str) }

  var i=0, j=0, len=str.length;
  while(i < len) {

    // 分割字符串index
    j = str.indexOf(substr,i)

    if( j != -1) {
      if(str.substring(i,j) != "") { arrTmp.push(str.substring(i,j)) }
      i = j + 1
    } else {
      if(str.substring(i,k) != "") { arrTmp.push(str.substring(i,len)) }
      i = len
    }
  }
  return arrTmp;
}














exports.toCharCode = toCharCode
exports.fromCharCode = fromCharCode