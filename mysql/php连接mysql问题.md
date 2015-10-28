
####使用PHP的mysql_connect函数连接数据库,报错:
>Warning: No such file or directory 

参考:http://stackoverflow.com/questions/4219970/warning-mysql-connect-2002-no-such-file-or-directory-trying-to-connect-vi

解决:
```
sudo vim /etc/php.ini
# 修改:
mysql.default_socket = /tmp/mysql.sock
mysqli.default_socket = /tmp/mysql.sock
pdo_mysql.default_socket = /tmp/mysql.sock

#重启apache
sudo apachectl restart
```

或者将`localhost` 改为: `127.0.0.1`
