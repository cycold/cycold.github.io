执行下面的sql语句
```
create table cats(
    id int not null auto_increment,
    pid int not null default '0',
    name varchar(60) not null default '',
    desn text not null default '',
    primary key(id),
    index name(name,pid)
);
```
得到错误
`ERROR 1101 (42000): BLOB/TEXT column 'desn' can't have a default value`

解决:http://blog.csdn.net/gxk9933/article/details/6210132
```
Create table的时候，报错BLOB/TEXT column 'xxxxxx( 表名称)' can't have a default value query ，意思是TEXT类型的表字段不能够有默认值。

搜索到很多解决方案都是将

description TEXT DEFAULT 'www.sharkuo.com', 改为 description TEXT,

原因在于：

1、  MYSQL5.x是不允许BLOB/TEXT类型的字段拥有默认值的。

2、  由于MYSQL是在‘strict mode’严格模式下工作的，如果改为非严格模式，上面的语句就可以执行成功

3、  MYSQL5.x在windows下是默认以‘strict mode’工作的，当执行上面的语句时，会给你一个错误或者警告信息

解决方法：

1、  找到mysql安装根目录下的my.ini文件

2、  找到这样一行：
sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"

3、  在其前面加‘#’将其注释掉：

#sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"

4、  重启mysql服务

5、  重新执行你的mysql语句
```