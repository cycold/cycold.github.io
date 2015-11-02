```
mysql 导出数据库表结构 以及全部 数据
 
MySQL 导出数据库在  运行--cmd--环境下。
root:MySQL数据库用户名
-p: 后跟MySQL数据库用户名密码
mydatabses: 数据库名
-h: 后跟远程数据库地址
加 -d为导出表结构, 不加为导出数据
MySQL 只导出数据库的所有数据结构:
导出本地的数据库表结构：mysqldump -uroot -p123456 -d mydatabases > mysql.sql  
导出远程机器（或服务器）的表结构： mysqldump -uroot -p123456 -h192.168.0.1  -d mysqldatabases > mysql.sql
导出本地的某一数据库所有表结构：mysqldump -uroot -p12345  mydatabases > mysql.sql  
导出远程机器（或服务器）的某一数据库所有表结构和数据：mysqldump -uroot -p123456 -h192.168.0.1  mysqldatabase> mysql.sql
导入数据：source E:\mysql.sql

一 只导出表结构
导出整个数据库结构（不包含数据）
mysqldump -h localhost -uroot -p123456  -d database > dump.sql
导出单个数据表结构（不包含数据）
mysqldump -h localhost -uroot -p123456  -d database table > dump.sql
二 只导出表数据
导出整个数据库数据
mysqldump -h localhost -uroot -p123456  -t database > dump.sql
三 导出结构+数据
导出整个数据库结构和数据
mysqldump -h localhost -uroot -p123456 database > dump.sql
导出单个数据表结构和数据
mysqldump -h localhost -uroot -p123456  database table > dump.sql



```