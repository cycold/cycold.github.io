#### php 在mac下的使用
php已在mac下系统自带安装.
只需要在apache的配置文件中开启即可:
`LoadModule php5_module libexec/apache2/libphp5.so`

php的配置文件(默认没有开启,只有一个配置模板文件:/etc/php.ini.default)
`sudo cp /etc/php.ini.default /etc/php.ini`
`sudo vim /etc/php.ini` 即可编辑配置文件