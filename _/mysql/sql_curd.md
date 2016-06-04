SQL种类

DDL DML DQL DCL

数据定义语言（DDL）： CREATE  DROP    ALTER
	用于定义和管理数据对象（库，表，索引，视图），包括数据库、数据表等。例如：CREATE、DROP、ALTER等语句。 

 INSERT UPDATE DELETE  
数据操作语言（DML）： 和表中的数据记录
	用于操作数据库对象中所包含的数据。例如：INSERT、UPDATE、DELETE语句。
SELECT  60%
数据查询语言（DQL） ：
	用于查询数据库对象中所包含的数据，能够进行单表查询、连接查询、嵌套查询，
	以及集合查询等各种复杂程度不同的数据库查询，并将数据返回到客户机中显示。例如：SELECT语句。 
数据控制语言（DCL）：
	是用来管理数据库的语言，包含管理权限及数据更改。例如：GRANT、REVOKE、COMMIT、ROLLBACK等语句。

对于程序员来说

	创建表（为项目设计表）
	增，删，改、查
	插入表数据insert 
	insert into 表名([字段列表]) values(值列表)，（值列表2），（值列表3）
插入多个值:
	`insert into cats(name, pid)  values('a','1'),('b',2),('c',3);`

特点：
	1. 如果在表名后没有给出字段列表，则值列表必须列出所有字段的值，必须按表中默认的顺序插入
	2. 所有需要写字段名的地方都不加单引号或双引号，但所有值建议都要以字符形式使用
	3. 建议在插入数据时，最好给出字段列表，则值要和字段列表对象即可，可以不按表中字段的顺序

update 表名 set 字段=‘值’［，字段2=值2 ［，/。。。］］[条件]  条件是确定要更改的记录，可以通过条件指定一条也可指定多条
`update users set name='aa', age='10' where id='1';`
`update cats set name='cc' where pid >= 1 && pid <=3;`

delete from 表名 [条件] where 

select 都可以使用 各种运算符号（可以把字段当作一个变量）
	只要你想更新、删除、查找，只要写对条件就能准确找到要管理的一条或多条语句
	SELECT [ALL | DISTINCT] (方括号表示可选)
		{* |table.*|[table.]field1[as alias1][,[table.]field2[as alias2]][.....]}(中括号表示必须选择一个)
	FROM   表名［］
	[WHERE...]
	[GROUP BY....]
	[HAVING...] 
	[ORDER BY ...]
	[LIMIT count] 
使用SELECT查询语言，目的就可以可以按你的想法将数据查出来，将结果返回给你
	

