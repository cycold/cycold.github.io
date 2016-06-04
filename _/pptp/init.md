### 如何在Ubuntu下配置PPTP VPN
参考:
> http://blog.kunyu.li/digitalocean-ubuntu-vps-vpn.html

首先查看`pptpd`服务是否正在运行
`ps -ef | grep pptpd`

然后查看有没有安装`pptp`服务
查看 `/etc/ppp` `etc/pptpd.conf` 是否存在

安装pptpd
`$ sudo apt-get install pptpd`

配置pptpd:
`$ sudo vim /etc/pptpd.conf`
> 找到最下面，修改ip：

```
# (Recommended)
localip 188.166.247.65  # 去掉注释, 188.166.247.65 为远程主机的ip
remoteip 10.0.0.2-100   # 去掉注释, 10.0.0.2-100 为分配给需要连接到此主机的电脑的ip地址(比如我的mac连接到188.166.247.65主机,那么我将分配到 10.0.0.2-100 之间的一个虚拟地址)
                        # 比如当我的mac通过vpn连接到188.166.247.65这台主句,那么在mac的vpn配置(mac network)中可以看到我被分到的ip:10.0.0.2
                        # 那么此时在188.166.247.65上的,就可以ping通10.0.0.2了
# or
#localip 192.168.0.234-238,192.168.0.245
#remoteip 192.168.1.234-238,192.168.1.245
```

设置dns
`$ sudo vim /etc/ppp/pptpd-options`
修改以下部分为google的dns：
```
ms-dns 8.8.8.8
ms-dns 8.8.4.4
```

设置账号(分配登录的账号密码)：
`$ sudo vim /etc/ppp/chap-secrets`
添加一行，依次为：用户名，服务，密码，限制ip：
可以添加多行,每一行表示一个用户(用户名和密码都可以不同)
```
 用户名 服务  密码    限制ip(*表示无限制)
user1 pptpd password1 *
user2 pptpd password1 *
```

重启服务:
`$ sudo /etc/init.d/pptpd restart`

### 设置IP转发
`$ sudo vim /etc/sysctl.conf`
去掉文件中这一行的注释：
```
net.ipv4.ip_forward=1
```
使它立刻生效：
`sudo sysctl -p`

测试有没有安装iptables
`iptables --help` or `iptables -V`
如果没有,安装iptable
`sudo apt-get install iptables`
建立一个 NAT：
`sudo iptables -t nat -A POSTROUTING -s 10.0.0.0/24-o eth0 -j MASQUERADE`
将规则保存，使重启后规则不丢失：
`sudo iptables-save >/etc/iptables-rules`
> 若此处提示：-bash: /etc/iptables-rules: Permission denied 则可使用root用户，命令：su - 进入root用户保存

编辑网卡文件，加载网卡时自动加载规则
`sudo vim  /etc/network/interfaces`
```
# This file describes the network interfaces available on your
# system and how to activate them. For more information, see
# interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet static
        address 188.166.247.65
        netmask 255.255.240.0
        gateway 188.166.240.1
        up ip addr add 10.15.0.5/16 dev eth0
        dns-nameservers 8.8.8.8 8.8.4.4
        pre-up iptables-restore < /etc/iptables-rules 
```
末尾加入：
`pre-up iptables-restore </etc/iptables-rules`

设置MTU，防止包过大：
`sudo iptables -A FORWARD -s 10.0.0.0/24-p tcp -m tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1200`

若设置了上条规则，记得保存：
`sudo iptables-save >/etc/iptables-rules`

最后再次重启pptpd
`$ sudo /etc/init.d/pptpd restart`

### 注意:
mac 能连上，但没有任何收发包的问题，即能连接上VPN，不能上网：
vpn高级里勾选 `发送全部流量(Send all traffic over VPN connection)`

### 附
mac 添加vpn:
系统设置(System Preference) -- Network -- 解锁 -- 点击左边的 加号(+) 
Interface: 选择: VPN
VPN Type: 选择: PPTP
Service Name : 自定义即可

然后即可输入远程的ip地址, 
账户名即上面`$ sudo vim /etc/ppp/chap-secrets`设置的某一个账户名
密码在点击 `Authentication Settings` 对话框中填入

# 注意:
在下面的`Advanced`中勾选: `Send all traffic over VPN connection`, 要不mac能连接vpn,但是不能上网













