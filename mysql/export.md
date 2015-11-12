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

1.导出整个数据库 

　　mysqldump -u用户名 -p密码  数据库名 > 导出的文件名 
　　C:\Users\jack> mysqldump -uroot -pmysql sva_rec  > e:\sva_rec.sql 

　　2.导出一个表，包括表结构和数据 

　　mysqldump -u用户名 -p 密码  数据库名 表名> 导出的文件名 
　　C:\Users\jack> mysqldump -uroot -pmysql sva_rec date_rec_drv> e:\date_rec_drv.sql 

　　3.导出一个数据库结构 
　　C:\Users\jack> mysqldump -uroot -pmysql -d sva_rec > e:\sva_rec.sql 

     4.导出一个表，只有表结构 

　　mysqldump -u用户名 -p 密码 -d数据库名  表名> 导出的文件名 
　　C:\Users\jack> mysqldump -uroot -pmysql -d sva_rec date_rec_drv> e:\date_rec_drv.sql 

　　5.导入数据库 

　　常用source 命令 
　　进入mysql数据库控制台， 
　　如mysql -u root -p 
　　mysql>use 数据库 
　　然后使用source命令，后面参数为脚本文件(如这里用到的.sql) 
　　mysql>source d:wcnc_db.sql