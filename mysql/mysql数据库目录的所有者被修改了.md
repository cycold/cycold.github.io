在使用brew doctor ，提示我修改／usr／local的所有者权限，结果导致里面数据目录的所有者被修改：
sudo chown -R $(whoami):admin /usr/local

‘mysql／data’ 数据库的目录所有者应该为 ｀mysql｀或者｀_mysql｀

修改为：
sudo chown －R mysql:admin /usr/local/mysql/data


