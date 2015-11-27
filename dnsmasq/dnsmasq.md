安装:
`brew install dnsmasq`

copy configuration file:
`cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf`

`/usr/local/etc/` 文件夹下新建一个 resolv.dnsmasq.conf 文件:
>  用sublime text，textmate，bbedit等纯文本编辑器打开这个 resolv.dnsmasq.conf 文件，
>  输入以下内容
>  nameserver 114.114.114.114
>  nameserver 8.8.8.8
>  nameserver 8.8.4.4
>  nameserver 42.120.21.30
>  nameserver 168.95.1.1
这些都是你常用的DNS地址，你可以添加更多，比如OpenDNS

用sublime text，textmate，bbedit等纯文本编辑器打开同文件夹下的 dnsmasq.conf 文件，增加以下内容
> resolv-file=/usr/local/etc/resolv.dnsmasq.conf
> strict-order
> no-hosts
> cache-size=32768
> listen-address=127.0.0.1
这就是最简单的配置文件。需要说明的是，listen-address后面的可以是多个IP用英文逗号隔开，
例如你写listen-address=127.0.0.1,192.168.1.102，其中192.168.1.102是你的计算机的内网IP，
就可以实现同一个局域网内的设备，通过设置DNS为这个IP，来实现都通过你的dnsmasq来查询dns，
即局域网范围内的DNS泛解析。

DNSMASQ 泛解析
> 上面只是安装好了dnsmasq，下面来具体介绍DNSMASQ的泛解析功能，来突破墙，
> 实现谷歌服务直连。要添加规则，只需在dnsmasq.conf文件里追加内容即可。
> DNSMASQ的泛解析规则是这样的：
> `address=/baidu.com/1.1.1.1`
> 这意味着，*.baidu.com/*都将被引导至IP为1.1.1.1。

Google 服务泛解析

下面来添加适用于谷歌大多数服务的泛解析规则。
首先需要寻找Google一个可用的IP。它最好是位于美国的服务器，这样能保证大多数服务可用。
已知Google现在一个可用的IP是74.125. 204.166。
追加规则：
address=/google.com/74.125.204.166
address=/googleapis.com/74.125.204.166
这基本上涵盖了绝大多数谷歌服务。把这些规则追加到 dnsmasq.conf 文件里即可。

系统启动时自动启动:
`sudo cp -fv /usr/local/opt/dnsmasq/*.plist /Library/LaunchDaemons`
手动开启dnsmasq服务
`sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist`
手动停止dnsmasq服务
`sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist`
配置文件:
`/usr/local/etc/dnsmasq.conf`
`/usr/local/etc/resolv.dnsmasq.conf`

`pgrep dnsmasq`

在修改之后你不会立即看到效果，因为有缓存效果
`sudo launchctl stop homebrew.mxcl.dnsmasq` (需要执行多次,才能停止)
`sudo launchctl start homebrew.mxcl.dnsmasq`
`sudo killall -HUP mDNSResponder`

或者:
# Reload configuration and clear cache
> $ sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
> $ sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
> $ dscacheutil -flushcache

可以使用`dig baidu.com` 查看此次解析是使用的那个dns地址

# 注意:
当停止`dnsmasq`时,请改变wifi中的dns解析地址,因为使用`dnsmasq`时其解析地址为127.0.0.1,
所以当停止`dnsmasq`时,一定要记得将wifi中的dns解析地址改为114.114.114.114,或者增加即可.
这就是为什么当停止了dnsmasq服务时,访问不了任何网站的原因