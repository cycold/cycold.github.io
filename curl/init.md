curl详解
http://blog.csdn.net/fudesign2008/article/details/7608619

### CURL
这东西现在已经是苹果机上内置的命令行工具之一了，可见其魅力之一斑

`curl --help`

`curl http://baidu.com`
要想把读过来页面存下来，是不是要这样呢？
`curl http://baidu.com > baidu.html`
当然可以，但不用这么麻烦的！
用curl的内置option就好，存下http的结果，用这个option: -o
`curl -o baidu.txt http://baidu.com` 或者 `curl --output baidu.txt http://baidu.com`
这样，你就可以看到屏幕上出现一个下载页面进度指示。等进展到100%，自然就OK咯

什么什么？！访问不到？肯定是你的proxy没有设定了。
使用curl的时候，用这个option可以指定http访问所使用的proxy服务器及其端口： -x
`curl -x 123.45.67.89:1080 -o page.html http://www.yahoo.com`

访问有些网站的时候比较讨厌，他使用cookie来记录session信息。
像IE/NN这样的浏览器，当然可以轻易处理cookie信息，但我们的curl呢？.....
我们来学习这个option: -D <-- 这个是把http的response里面的cookie信息存到一个特别的文件中去
`curl -x 123.45.67.89:1080 -o page.html -D cookie0001.txt http://www.yahoo.com`

那么，下一次访问的时候，如何继续使用上次留下的cookie信息呢？要知道，很多网站都是靠监视你的cookie信息，
来判断你是不是不按规矩访问他们的网站的。
这次我们使用这个option来把上次的cookie信息追加到http request里面去： -b (-b, --cookie STRING/FILE  Read cookies from STRING/FILE (H))
`curl -x 123.45.67.89:1080 -o page1.html -D cookie0002.txt -b cookie0001.txt http://www.yahoo.com`
-b表示从一个字符串或者文件中读取cookie

有些讨厌的网站总要我们使用某些特定的浏览器去访问他们，有时候更过分的是，还要使用某些特定的版本~~~~
NND，哪里有时间为了它去找这些怪异的浏览器呢！？
好在curl给我们提供了一个有用的option，可以让我们随意指定自己这次访问所宣称的自己的浏览器信息： -A
`curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" -x 123.45.67.89:1080 -o page.html -D cookie0001.txt http://www.yahoo.com`
这样，服务器端接到访问的要求，会认为你是一个运行在Windows 2000上的IE6.0，嘿嘿嘿，其实也许你用的是苹果机呢！
而"Mozilla/4.73 [en] (X11; U; Linux 2.2; 15 i686"则可以告诉对方你是一台PC上跑着的Linux，用的是Netscape 4.73，呵呵呵

另外一个服务器端常用的限制方法，就是检查http访问的referer。比如你先访问首页，再访问里面所指定的下载页，
这第二次访问的referer地址就是第一次访问成功后的页面地址。这样，服务器端只要发现对下载页面某次访问的referer地址不 是首页的地址，
就可以断定那是个盗连了~~~~~
讨厌讨厌我就是要盗连
幸好curl给我们提供了设定referer的option： -e
`curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" -x 123.45.67.89:1080 -e "mail.yahoo.com" -o page.html -D cookie0001.txt http://www.yahoo.com`
这样，就可以骗对方的服务器，你是从mail.yahoo.com点击某个链接过来的了，呵呵呵

刚才讲过了，下载页面到一个文件里，可以使用 -o ，下载文件也是一样。
比如，`curl -o 1.jpg http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG`
这里教大家一个新的option： -O
大写的O，这么用：
`curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG`
这样，就可以按照服务器上的文件名，自动存在本地了！

再来一个更好用的。
如果screen1.JPG以外还有screen2.JPG、screen3.JPG、....、screen10.JPG需要下载，难不成还要让我们写一个script来完成这些操作？
不干！
在curl里面，这么写就可以了：
`curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen[1-10].JPG`

再来，我们继续讲解下载！
`curl -O http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG`
这样产生的下载，就是
~zzh/001.JPG
~zzh/002.JPG
...
~zzh/201.JPG
~nick/001.JPG
~nick/002.JPG
...
~nick/201.JPG
够方便的了吧？哈哈哈
咦？高兴得太早了。
由于zzh/nick下的文件名都是001，002...，201，下载下来的文件重名，后面的把前面的文件都给覆盖掉了~~~
没关系，我们还有更狠的！
`curl -o #2_#1.jpg http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG`
--这是.....自定义文件名的下载？
--对头，呵呵！
#1是变量，指的是{zzh,nick}这部分，第一次取值zzh，第二次取值nick
#2代表的变量，则是第二段可变部分---[001-201]，取值从001逐一加到201
这样，自定义出来下载下来的文件名，就变成了这样：
原来： ~zzh/001.JPG ---> 下载后： 001-zzh.JPG
原来： ~nick/001.JPG ---> 下载后： 001-nick.JPG
这样一来，就不怕文件重名啦，呵呵

继续讲下载
我们平时在windows平台上，flashget这样的工具可以帮我们分块并行下载，还可以断线续传。
curl在这些方面也不输给谁，嘿嘿
比如我们下载screen1.JPG中，突然掉线了，我们就可以这样开始续传
`curl -c -O http://cgi2.tky.3wb.ne.jp/~zzh/screen1.JPG`


分块下载，我们使用这个option就可以了： -r
举例说明
比如我们有一个http://cgi2.tky.3web.ne.jp/~zzh/zhao1.mp3 要下载（赵老师的电话朗诵 :D ）
我们就可以用这样的命令：
curl -r 0-10240 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.mp3 &
curl -r 10241-20480 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.mp3 &
curl -r 20481-40960 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.mp3 &
curl -r 40961- -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.mp3
这样就可以分块下载啦。
不过你需要自己把这些破碎的文件合并起来
如果你用UNIX或苹果，用 cat zhao.part* > zhao.mp3就可以
如果用的是Windows，用copy /b 来解决吧，呵呵
上面讲的都是http协议的下载，其实ftp也一样可以用。
用法嘛，
`curl -u name:passwd ftp://ip:port/path/file`
或者大家熟悉的
`curl ftp://name:passwd@ip:port/path/file`


直接查看response响应message,上面使用的-D是直接将响应头写入文件（Write the headers to FILE）
`curl -I http://baidu.com` or `curl --head http://baidu.com`

说完了下载，接下来自然该讲上传咯
上传的option是 -T
比如我们向ftp传一个文件：
`curl -T localfile -u name:passwd ftp://upload_site:port/path/`
当然，向http服务器上传文件也可以
比如
`curl -T localfile http://cgi2.tky.3web.ne.jp/~zzh/abc.cgi`
注意，这时候，使用的协议是HTTP的PUT method
刚才说到PUT，嘿嘿，自然让老服想起来了其他几种methos还没讲呢！

GET和POST都不能忘哦。
http提交一个表单，比较常用的是POST模式和GET模式
GET模式什么option都不用，只需要把变量写在url里面就可以了
比如：
`curl http://www.yahoo.com/login.cgi?user=nickwolfe&password=12345`
而POST模式的option则是 -d
`curl -d "user=nickwolfe&password=12345" http://www.yahoo.com/login.cgi`

就相当于向这个站点发出一次登陆申请~~~~~
到底该用GET模式还是POST模式，要看对面服务器的程序设定。

一点需要注意的是，POST模式下的文件上的文件上传，比如
<form method="POST" enctype="multipar/form-data" action="http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi">
<input type=file name=upload>
<input type=submit name=nick value="go">
</form>
这样一个HTTP表单，我们要用curl进行模拟，就该是这样的语法：
`curl -F upload=@localfile -F nick=go http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi`
罗罗嗦嗦讲了这么多，其实curl还有很多很多技巧和用法
比如 https的时候使用本地证书，就可以这样
`curl -E localcert.pem https://remote_server`
再比如，你还可以用curl通过dict协议去查字典~~~~~
`curl dict://dict.org/d:computer`
今天就先讲到这里吧，呵呵。疯狂的curl功能，需要你---一起来发掘。






