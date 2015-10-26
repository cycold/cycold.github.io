#### mac下的mysql的安装
下载地址: http://dev.mysql.com/downloads/mysql/
安装向导: http://dev.mysql.com/doc/refman/5.7/en/osx-installation-pkg.html

> 注意:安装完后,会有一个随机生成的密码,记得复制下来,后面修改root密码需要用到
> 在5.7版本之前,默认的root密码为空,5.7之后,安装完后,root会有一个随机的密码
>  
> mysql安装在/usr/local/mysql下,实际安装在 /usr/local/mysql-5.7.9-osx10.9-x86_64下
> /usr/local/mysql 只是 /usr/local/mysql-5.7.9-osx10.9-x86_64的一个符号链接(link)

安装完后,其目录结构为:
```
bin, scripts        mysqld server, client and utility programs
data                Log files, databases
docs                Helper documents, like the Release Notes and build information
include             Include (header) files
lib                 Libraries
man                 Unix manual pages
mysql-test          MySQL test suite
share               Miscellaneous support files, including error messages, sample configuration files, SQL for database installation
sql-bench           Benchmarks
support-files       Scripts and sample configuration files
/tmp/mysql.sock     Location of the MySQL Unix socket

查看数据库文件目录(需要sudo) 每一个目录代表一个数据库
~/ $ ls /usr/local/mysql/data                                                                                                                                   [11:58:52]
ls: data: Permission denied

~/ $ sudo ls /usr/local/mysql/data                                                                                                                              [12:02:12]
Password:
auto.cnf        ib_logfile0     ibdata1         mysql           mysqld.local.pid    sys
ib_buffer_pool      ib_logfile1     ibtmp1          mysqld.local.err    performance_schema

# 注意-p后面如果需要直接输入密码不能有空格,如果有空格表示选择的数据库
~/ $ mysql -h localhost -u root -p dhFMh175kz%;                                                                                                                 [12:07:44]
Enter password:
ERROR 1049 (42000): Unknown database 'dhfmh175kz%'

# 5.7版本已经禁止直接在-p选项后面明文输入密码了.
icewater:~/ $ mysql -h localhost -u root -pdhFMh175kz%;                                                                                                                  [12:09:12]
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)

# 登录进mysql后,第一次执行命令,会提示你修改root的密码
mysql> \s
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.

# 修改用户密码,参考官方文档:http://dev.mysql.com/doc/refman/5.7/en/alter-user.html
# 注意不同版本之间ALTER USER 参数的不同

# 修改密码
mysql> alter user 'root'@'localhost' identified by '123456';
Query OK, 0 rows affected (0.00 sec)

mysql> \s
--------------
mysql  Ver 14.14 Distrib 5.7.9, for osx10.9 (x86_64) using  EditLine wrapper

Connection id:      425
Current database:
Current user:       root@localhost
SSL:                Not in use
Current pager:      less
Using outfile:      ''
Using delimiter:    ;   # 这里的;表示sql语句必须以;(分号)结束
Server version:     5.7.9 MySQL Community Server (GPL)
Protocol version:   10
Connection:     Localhost via UNIX socket
Server characterset:    latin1
Db     characterset:    latin1
Client characterset:    utf8
Conn.  characterset:    utf8
UNIX socket:        /tmp/mysql.sock
Uptime:         53 min 9 sec

Threads: 1  Questions: 13  Slow queries: 0  Opens: 106  Flush tables: 1  Open tables: 99  Queries per second avg: 0.004
--------------
```



启动/停止mysql
>安装完后,并没有启动mysql服务,但是会在系统配置中添加mysql的控制选项
>开启mysql服务:
>第一种方式:
>   需要到系统的控制面板中,开启mysql(system preference -- mysql)
>   参考其官方文档:http://dev.mysql.com/doc/refman/5.7/en/osx-installation-prefpane.html
>第二种方式:
>   使用守护进程的方式启动
>   参考其官方文档:http://dev.mysql.com/doc/refman/5.7/en/osx-installation-launchd.html

使用命令:`ps -ef | grep mysqld`查看进程是否启动, 默认端口为`3306`

添加环境变量:
```bash
~/ $ echo $path                                                                                                                                                 [11:41:51]
/usr/local/bin /usr/bin /bin /usr/sbin /sbin /usr/local/git/bin /opt/mongodb-osx-x86_64-3.0.6/bin

# 这里我将环境变量都放入.zshrc中,因为我使用的是zshell.如果使用bashell,可以放入.bash_profile
~/ $ vim .zshrc
    # mysql
    MYSQL_HOME=/usr/local/mysql
    PATH=$PATH:$MYSQL_HOME/bin

# 一定得更新源文件
~/ $ source .zshrc

~/ $ echo $path                                                                                                                                                 [11:47:14]
/usr/local/bin /usr/bin /bin /usr/sbin /sbin /usr/local/git/bin /opt/mongodb-osx-x86_64-3.0.6/bin /usr/local/mysql/bin
```

更改管理员(root)的密码(安装完mysql后,会有一个随机生成的root密码,将这个密码记录下来)
```
~/ $ mysql                                                                                                                                                      [11:51:50]
ERROR 1045 (28000): Access denied for user 'icewater'@'localhost' (using password: NO)

# 修改密码
mysql> alter user 'root'@'localhost' identified by '123456';
Query OK, 0 rows affected (0.00 sec)
```

关于数据库的字符集设置,参考其官方文档:http://dev.mysql.com/doc/refman/5.7/en/charset-applications.html


