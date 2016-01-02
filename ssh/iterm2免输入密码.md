
http://www.tuijiankan.com/2015/05/15/iterm2-mac-ssh-with-no-password/
iTerm2和Mac自带的Terminal差不多，但是功能更强大，无论透明度、字体、配色、分屏等都可以设置，
除了这些花哨的功能外，最近新学了一招，就是可以通过Profiles的设置打开就执行写好的脚本，让自动免输入密码登录远程服务器。
脚本内容如下：
```sh
#!/usr/bin/expect -f
  set user <用户名>
  set host <ip地址>
  set port <端口>
  set password <密码>
  set timeout -1

  spawn ssh -p $port $user@$host
  expect "*assword:*"
  send "$password\r"
  interact
  expect eof
```

保存到 `~/.ssh/whatevername`
然后打开iTerm2的设置里，点开Profiles，左下角点+号新增一个配置文件，
然后在Genernal->Command下选择 Command，在输入框里填入 
`expect ~/.ssh/whatevername`
下次打开iTerm2就可以选择你自己的配置文件，免密码登录服务器了，极大提升效率。


