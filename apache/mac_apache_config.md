#### 在mac上开启apache
mac 10.10 像之前版本，已经自带apache ，我们只需要将其开启就行
启动apache
`sudo apachectl start`

>关闭 Apache： 
>   `sudo apachectl stop`
>重启 Apache：
>   `sudo apachectl restart`
>查看 Apache 版本：
>   `httpd -v` `apachectl -v`

在浏览器中输入`http://localhost`
显示It works!说明开启apache成功,此时的apache的根目录为`/Library/Webserver/Documents`

在apache中开启相应的模块(将前面的#注释符去掉即可):
`LoadModule userdir_module libexec/apache2/mod_userdir.so`
`LoadModule php5_module libexec/apache2/libphp5.so`

启用相关的配置文件(将前面的#注释符去掉即可):
`Include /private/etc/apache2/extra/httpd-userdir.conf`

编辑`sudo vi /etc/apache2/extra/httpd-userdir.conf` 文件,
开启下面这一行(将前面的#注释符去掉即可,没有就增加这一行)
`Include /private/etc/apache2/users/*.conf`

关于apache的根目录:
OS X 中默认有两个目录可以直接运行你的 Web 程序，
一个是系统级的 Web 根目录，一个是用户级的根目录，大家记下即可。
Apache系统级的根目录及对应网址是：
`/Library/WebServer/Documents/`  `http://localhost`
用户级的根目录及对应网址是：
`~/Sites`  `http://localhost/~icewater/`
~/Sites 也就是你用户目录下面的"站点"目录，在 OS X 中，这个目录可能没有，所以你需要手动建立一个同名目录
建立方式很简单，直接在终端中运行：       
`sudo mkdir ~/Sites`
一般在 /etc/apache2/users 目录下面有你用户配置文件     
```
~/ $ ls /etc/apache2/users                                                                                                                                      [14:20:25]
Guest.conf    icewater.conf
```
如果没有就创建一个(记得使用sudo)
`sudo vi /etc/apache2/users/你的用户名.conf`
`sudo vi /etc/apache2/users/icewater.conf`

在icewater.conf文件中增加:
```
<Directory "/Users/<your short user name>/Sites/">
    AddLanguage en .en
    LanguagePriority en fr de
    ForceLanguagePriority Fallback
    Options Indexes MultiViews
    AllowOverride None
    Order allow,deny
    Allow from localhost
     Require all granted
</Directory>

# <Directory "/Users/icewater/x-dev/">
 14 #     AddLanguage en .en
 15 #     LanguagePriority en fr de
 16 #     ForceLanguagePriority Fallback
 17 #     Options Indexes MultiViews FollowSymLinks
 18 #     AllowOverride All
 19 #     Order allow,deny
 20 #     Allow from all
 21 #     Require all granted
 22 # </Directory>
 23
 24
 25 # # 不同端口访问不同的目录
 26 # Listen 7777
 27 # NameVirtualHost localhost:7777
 28 # <VirtualHost *:7777>
 29 #   DocumentRoot /Users/icewater/x-dev
 30 #   ServerName localhost:7777
 31 # </VirtualHost>
```


##### 启用Apache的虚拟主机
打开Apche的配置文件 ：`sudo vim /etc/apache2/httpd.conf`
在httpd.conf中找到
`#Include /private/etc/apache2/extra/httpd-vhosts.conf`
去掉前面的“＃”，保存并退出，重启后就开启虚拟主机。

配置的虚拟主机
打开配置虚拟主机文件httpd-vhost.conf，使用命令
`sudo vim /etc/apache2/extra/httpd-vhosts.conf`
可以将里面东西全部删除，或者用#注释掉
并添加以下配置
````
Listen 7777
DocumentRoot "/Users/bingyang/Sites"（路径）
ServerName www.nb.com （我用的临时测试域名）
ErrorLog "/private/var/log/apache2/error_log"
CustomLog "/private/var/log/apache2/access_log" common

Options Indexes FollowSymLinks MultiViews
AllowOverride None
Order deny,allow
Allow from all
Require all granted
```
