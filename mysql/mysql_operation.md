SQL: Structured Query Language
SQL种类

DDL DML DQL DCL

数据定义语言（DDL）： 
`CREATE DROP ALTER`
用于定义和管理数据对象（库，表，索引，视图），包括数据库、数据表等。例如：CREATE、DROP、ALTER等语句。 

数据操作语言（DML）： 和表中的数据记录
`INSERT UPDATE DELETE `
用于操作数据库对象中所包含的数据。例如：INSERT、UPDATE、DELETE语句。

数据查询语言（DQL） ：
`SELECT`
用于查询数据库对象中所包含的数据，能够进行单表查询、连接查询、嵌套查询，
以及集合查询等各种复杂程度不同的数据库查询，并将数据返回到客户机中显示。例如：SELECT语句。 

`GRANT、REVOKE、COMMIT、ROLLBACK`
数据控制语言（DCL）：
是用来管理数据库的语言，包含管理权限及数据更改。
例如：GRANT、REVOKE、COMMIT、ROLLBACK等语句。


查看sql命令帮助:
`? create`
`? create table`

DDL 语句:
`create database 库名`
`create database if not exists 库名`
没有选择默认数据库,创建某数据库的表
`create table [数库名.]表名`
`create table if not exists [数库名.]表名`
选择默认库:
`use 库名`
创建当前的数据库的表
`create table 表名`
`create table if not exists 表名`
删除数据库或者表:
`drop database 库名`
`drop database if exists 库名`
`drop table if exists 表名`
清空表
`truncate 表名`

DML 语句:
`insert into users(id, name) values('1', 'zhangsan');`
`update users set name='aa', age='10' where id='1';`
`delete from 表名 where id='2';`

DQL 语句:     
`select * from 表名;`

DCL 语句:    
看状态     
`\s` `status`
终止命令
`\c`
看所有库
`show databases `
看所有表
`show tables`
看表结构
`desc 表名`
查看版本
`select version();`       
配置文件中的变量
`show variables`
查看mysql默认的存储引擎(表类型)
`show engines` (默认为InnoDB类型)
查看mysql的配置变量
`show variables`
`show variables like 'port';`
`show variables like '%engine%';` #like 查询要使用‘%%’模糊查询


显示mysql支持的字符集:
`show character set;`
显示gbk字符集的校队规则
`show collation like 'gbk%'` 
显示服务器的默认字符集(安装时没有指定,那么默认就是西欧latin1字符集)
`show variables like 'character_set_server';`
显示服务器的校队字符集
`show variables like 'collation_server';`

指定默认的数据库字符集
```
CREATE DATABASE mydb
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
```

看你的mysql现在已提供什么存储引擎:
`mysql> show engines;`

看你的mysql当前默认的存储引擎:
`mysql> show variables like '%storage_engine%';`

你要看某个表用了什么引擎(在显示结果里参数engine后面的就表示该表当前用的存储引擎):
`mysql> show create table 表名;`

备份数据库表结构（注意这里仅仅只是备份数据表的结构并没有备份数据文件）的新式导出备份：
（退出mysql到命令行中执行）
`mysqldump –u root –p --default-character-set=gbk –d  test1(库名)  > 目录/backup.sql`
导入备份文件(注意这要导入到新创建的库中):
`mysql –u root –p test4(要导入的库名)  < 目录/backup.sql`

修改表
Alter table 
`alter table t1 add name varchar(30) not null;`
`alter table t1 add age int unsigned not null default 0;`

不按顺序，在name后面age前面添加
`alter table t1 add sex varchar(10) not null after name;`
在第一个添加
`alter table t1 add height double first;`
将类型varchar改为char modify适合改类型
`alter table t1 modify sex char(4);`
类型和字段名都可改变
`alter table t1 change name username char(33); `
更改表名，t1改为t2
`alter table t1 rename as t2;`
删除表中的这段sex；
`alter table t2 drop sex;`
删除整个表
`drop table if exists test7;`
清空整个表数据
`truncate tablename;`

\G使其列表显示，查看不乱*表示查看所有 可以选择具体目标比如：查看mysql的所有用户
`select * from mysql.user \G ;`
`select user from mysql.user;`
查看当前用户（自己）权限：
`show grants;`
查看MySQL用户权限：
`show grants for root@'localhost';`
创建用户被分配库名即所有的针对本库的操作权限
mysql> GRANT ALL PRIVILEGES ON databasename.* TO "wordpressusername"@"hostname"
    -> IDENTIFIED BY "password";    
FLUSH PRIVILEGES;       //刷新权限  


基本查询语句

SELECT * FROM `test` WHERE 1 　　　　　　　　　　　　 　　　　//简单查询
SELECT id,uid FROM newdb.`test` WHERE 1 　　　　　　 　　　　//查询ID、UID等字段
SELECT remark as r FROM `test` WHERE 1 　　　　　　　　 　　 //别名查询
SELECT * FROM `test` WHERE id=1,3 　　　　　　　　　　　 　　//条件查询，相等
SELECT * FROM `test` WHERE id<>2,3 　　　　　　　　　　 　　 //条件按查，不相等
SELECT * FROM `test` WHERE id in (1,2,4) 　　　　　　　　　 　 //in查询，即查询ID为1，2，4的数据
SELECT * FROM `test` WHERE not in (2,3)　　　　　　　　　　    //in查询，查询ID不是2，3的数据
SELECT * FROM `test` WHERE `uid` like '%王%'　　　　　　　　 //like模糊查询，%*%前后匹配
SELECT * FROM `test` WHERE id BETWEEN 1 and 3　　　　　　  //条件查询，中间数据
SELECT * FROM `test` WHERE id NOT BETWEEN 1and3 　　　　 //条件查询
SELECT * FROM `test` WHERE id=1 and `remark`='学生' 　　     //多个条件
SELECT * FROM `test` group by `remark`        　　　　　　        //查询排序
SELECT * FROM `test` order by `regdate` ASC                         //order by升序排序,放到limit之前
SELECT * FROM `test` order by `regdate` ASC,id DESC            //order by按照注册时间升序，ID降序
ASC 升序、DESC降序。

SELECT * FROM `test` limit 0,3                                               //数据条数限制，输出三条
SELECT count(*) FROM `test` WHERE 1                                  //统计查询，可以查询单个统计，例如count(name)
SELECT max(id) FROM `test` WHERE 1                                   //统计ID最大值是多少
以下三个和以上max用法类似
MIN(*)最小值函数
AVG(*)平均值函数
SUM(*)累计值函数

基本插入语句：

insert into test (`id`,`uid`,`regdate`,`remark`) values ('','PHP100','2008-07-26','工人')　　　　//ID自增，
insert into test (`id`,`uid`,`regdate`,`remark`) values ('','PHP100','now()','工人')
insert into test values ('','PHP200','now()','工人')　　　　　　　　　　　　　　　　　　　　　　　　 //简便写法，但不提倡

更新语句：

update test set uid='php200' where id=6 　　　　　　　　　　　　　　　　　　　　　　　　　　　 //set 后是要改后的内容。where 后是更改位置

删除语句：

Delete from dbname.`test` where id=3







