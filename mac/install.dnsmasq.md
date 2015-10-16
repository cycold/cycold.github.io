brew install dnsmasq
```
######################################################################## 100.0%
==> Pouring dnsmasq-2.73.yosemite.bottle.1.tar.gz
==> Caveats
To configure dnsmasq, copy the example configuration to /usr/local/etc/dnsmasq.conf
and edit to taste.

  cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf


To have launchd start dnsmasq at startup:
    sudo cp -fv /usr/local/opt/dnsmasq/*.plist /Library/LaunchDaemons
    sudo chown root /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
Then to load dnsmasq now:
    sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
==> Summary
🍺  /usr/local/Cellar/dnsmasq/2.73: 7 files, 508K
```

具体的参考文档:
http://blog.netsh.org/posts/mac-os-x-dnsmasq_1762.netsh.html

```
查看dnsmasq是否启动运行
ps -ef | grep dnsmasq
```
运行后,记得将mac的DNS改为127.0.0.1
```
在系统设置中,打开Network 里面可以更改wifi的DNS地址,需要输入管理员密码
```

```
使用dig命令测试运行
dig baidu.com 
```

重启dnsmasq来应用
```
sudo launchctl stop homebrew.mxcl.dnsmasq
sudo launchctl start homebrew.mxcl.dnsmasq
sudo killall -HUP mDNSResponder
```