①创建数据库:

create database if not exists wordpress3_6;

②为数据库wordpress3_6创建用户

grant all privileges on wordpress3_6.* to ericky@localhost identified by “123456”;

注意:

create database if not exists wordpress3_6; 中的wordpress3_6如果写为wordpress3.6会出错.不支持一小数点来表示版本.如果你想表示数据库版本的话.

如果将grant all privileges on wordpress3_6.* to ericky@localhost identified by “123456”;

写为: grant all privileges on wordpress3_6 to ericky@localhost identified by “123456”;即wordpress3_6.*中的星号没有写,那么这个用户ericky

只有这个数据库中的一个表的所有权限,这个表名和数据库名一致.

grant all privileges on wordpress3_6 to ericky@localhost identified by “123456”;执行后, 使用:show grants for ericky@localhost查看权限:

| GRANT ALL PRIVILEGES ON `wordpress3_6`.`wordpress3_6` TO ‘ericky’@'localhost’

grant all privileges on wordpress3_6.* to icewater@localhost identified by “123456”;执行后, 使用:show grants for icewater@localhost查看权限:

GRANT ALL PRIVILEGES ON `wordpress`.* TO ‘icewater’@'localhost’

如果执行了grant all privileges on wordpress3_6 to ericky@localhost identified by “123456”;语句,可以使用撤销授权命令:

revoke all privileges on wordpress3_6 form ericky@localhost; 即可.

然后可以再次正确授权:grant all privileges on wordpress3_6.* to ericky@localhost; 当然这次不需要再次赋予密码了,因为已经创建了用户ericky,它有了密码.

可能还需要用到的sql语句:

flush privileges //刷新权限

select * from mysql.user \G \G使其列表显示，查看不乱 *表示查看所有 可以选择具体目标比如：查看mysql的所有用户 user

select user from mysql.user;

show grants [for ericky@localhost]; //show grants 就是查看当前用户的权限

drop database wordpress3_6 if exists; //删除wordpress3_6 数据库

drop table books –删除当前数据库的表 books

drop table text,wordpress3_6; –删除当前数据库的多个表用逗号隔开

revoke all privileges on wordpress3_6 from ericky@localhost; //撤销授权