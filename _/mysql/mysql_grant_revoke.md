#### mysql登录问题:
    mysql在本地有两种登录方式:
        mysql –h localhost –u root –p123456  回车登录 这种方式密码明文
        mysql –h localhost –u root –p   回车登录 密码密文

但是在使用root管理员创建mysql的其他账户如果使用密码明文登录会提示登陆不了:

>ERROR 1045 (28000): Access denied for user 'ericky'@'localhost' (using password: YES)

只能使用非明文密码的方式登录.

##### MySQL中授权(grant)和撤销授权(revoke)
MySQL 赋予用户权限命令的简单格式可概括为：

> `grant 权限 on 数据库对象 to 用户`

一、grant 普通数据用户，查询、插入、更新、删除 数据库中所有表数据的权利
    `grant select on testdb.* to common_user@'%'`  
    `grant insert on testdb.* to common_user@'%'`  
    `grant update on testdb.* to common_user@'%'`  
    `grant delete on testdb.* to common_user@'%'`  
或者，用一条 MySQL 命令来替代：
    `grant select, insert, update, delete on testdb.* to common_user@'%'`

二、grant 数据库开发人员，创建表、索引、视图、存储过程、函数等权限
grant 创建、修改、删除 MySQL 数据表结构权限。
grant create on testdb.* to developer@'192.168.0.%';  
grant alter  on testdb.* to developer@'192.168.0.%';  
grant drop   on testdb.* to developer@'192.168.0.%';  
grant 操作 MySQL 外键权限：
grant references on testdb.* to developer@'192.168.0.%';  
grant 操作 MySQL 临时表权限：
grant create temporary tables on testdb.* to developer@'192.168.0.%';  
grant 操作 MySQL 索引权限：
grant index on testdb.* to developer@'192.168.0.%';  
grant 操作 MySQL 视图、查看视图源代码权限：
grant create view on testdb.* to developer@'192.168.0.%';  
grant show   view on testdb.* to developer@'192.168.0.%';  
grant 操作 MySQL 存储过程、函数权限：
grant create routine on testdb.* to developer@'192.168.0.%'; -- now, can show procedure status  
grant alter  routine on testdb.* to developer@'192.168.0.%'; -- now, you can drop a procedure  
grant execute        on testdb.* to developer@'192.168.0.%';  
三、grant 普通 DBA 管理某个 MySQL 数据库的权限
grant all privileges on testdb to dba@'localhost'  
其中，关键字 “privileges” 可以省略。 
四、grant 高级 DBA 管理 MySQL 中所有数据库的权限：
grant all on *.* to dba@'localhost'  
五、MySQL grant 权限，分别可以作用在多个层次上
1. grant 作用在整个 MySQL 服务器上：
grant select on *.* to dba@localhost; -- dba 可以查询 MySQL 中所有数据库中的表。  
grant all    on *.* to dba@localhost; -- dba 可以管理 MySQL 中的所有数据库  
2. grant 作用在单个数据库上：
grant select on testdb.* to dba@localhost; -- dba 可以查询 testdb 中的表。  
3. grant 作用在单个数据表上： 
grant select, insert, update, delete on testdb.orders to dba@localhost;  
这里在给一个用户授权多张表时，可以多次执行以上语句。例如：
grant select(user_id,username) on smp.users to mo_user@'%' identified by '123345';  
grant select on smp.mo_sms to mo_user@'%' identified by '123345';  
4. grant 作用在表中的列上：
grant select(id, se, rank) on testdb.apache_log to dba@localhost;  
5. grant 作用在存储过程、函数上：
grant execute on procedure testdb.pr_add to 'dba'@'localhost'  
grant execute on function testdb.fn_add to 'dba'@'localhost'  
六、查看 MySQL 用户权限
查看当前用户（自己）权限：
show grants;  
查看其他 MySQL 用户权限：
show grants for dba@localhost;  
七、撤销已经赋予给 MySQL 用户权限的权限。
revoke 跟 grant 的语法差不多，只需要把关键字 “to” 换成 “from” 即可：
grant  all on *.* to   dba@localhost;  
revoke all on *.* from dba@localhost;  
八、MySQL grant、revoke 用户权限注意事项
1. grant, revoke 用户权限后，该用户只有重新连接 MySQL 数据库，权限才能生效。
2. 如果想让授权的用户，也可以将这些权限 grant 给其他用户，需要选项 “grant option“
grant select on testdb.* to dba@localhost with grant option;  
这个特性一般用不到。实际中，数据库权限最好由 DBA 来统一管理。 补充：
mysql授权表共有5个表：user、db、host、tables_priv和columns_priv。
授权表的内容有如下用途： user表 user表列出可以连接服务器的用户及其口令，并且它指定他们有哪种全局（超级用户）权限。在user表启用的任何权限均是全局权限，并适用于所有数据库。例如，如果你启用了DELETE权限，在这里列出的用户可以从任何表中删除记录，所以在你这样做之前要认真考虑。
db表 db表列出数据库，而用户有权限访问它们。在这里指定的权限适用于一个数据库中的所有表。
host表 host表与db表结合使用在一个较好层次上控制特定主机对数据库的访问权限，这可能比单独使用db好些。这个表不受GRANT和REVOKE语句的影响，所以，你可能发觉你根本不是用它。
tables_priv表 tables_priv表指定表级权限，在这里指定的一个权限适用于一个表的所有列。


