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

#### 应对ISP的DNS劫持
当我输入一个不存在的域名时,比如点击了这个链接:http://yura.thinkweb2.com/named-function-expressions/
我这边的使用的联通宽带就劫持了我的域名,引导到了另外一个页面:
使用`nslookup` 获取其域名IP地址
```
nslookup baidu-shit.com.cn                                  [17:11:39]
Server:     127.0.0.1
Address:    127.0.0.1#53

Non-authoritative answer:
Name:   baidu-shit.com.cn
Address: 125.211.213.133
```

编辑/etc/dnsmasq.conf文件，将：bogus-nxdomain=125.211.213.133
加入进去，后面的IP是刚刚查询到的DNS劫持IP地址。

重启dnsmasq，再尝试打开不存在的域名，这时浏览器就会显示正常的无法连接页面了