模拟亲求
GET模式
`curl http://www.yahoo.com/login.cgi?user=nickwolfe&password=12345`
而POST模式的option则是 -d
`curl -d "user=nickwolfe&password=12345" http://www.yahoo.com/login.cgi`

POST模式下的文件上的文件上传
```html
<form method="POST" enctype="multipar/form-data" action="http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi">
    <input type=file name=upload>
    <input type=submit name=nick value="go">
</form>
```
`curl -F upload=@localfile -F nick=go http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi`

直接查看response响应message,上面使用的-D是直接将响应头写入文件（Write the headers to FILE）
`curl -I http://baidu.com` or `curl --head http://baidu.com`

读取cookie从指定文件或者字符串中,加到请求头中
`curl -b cookie0001.txt http://www.yahoo.com`