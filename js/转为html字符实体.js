http://cnodejs.org/topic/519f24bb776b2e7f030e1b2d

//然后在客户端将这个数组遍历，每个数字前加&#,后面加;，将其转为html字符实体：

function ParseChar(char){
  var result = '';
  for (i = 0; i < char.length; i++) {
    result += '&#' + char[i].toString() + ';';
  }
  return result;
}