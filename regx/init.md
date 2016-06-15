http://regexr.com/
http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript

1. `$&` 表示匹配到字符
```
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
function escapeRegex (str) {
  return str.replace(regexEscapeRE, '\\$&')
}

// "/[a-b]/g" ==> "\/\[a\-b\]\/g"
```

2. `+?` lazy 匹配 
```
/b\w+?/

b be beer beeerr

=> be be be
```
问号? 前面如果和 + * ? 搭配,表示尽可能少的匹配 , + * 都是贪婪匹配, 使用`?`来限制贪婪
