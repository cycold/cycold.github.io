创建数据库其中(DATABASE或者SCHEMA)
```sql
CREATE DATABASE IF NOT EXISTS mydb
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

CREATE SCHEMA IF NOT EXISTS mydb
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
```

创建表
```
CREATE TABLE [IF NOT EXISTS] 表名称(
    字段名1 列类型 [属性] [索引],
    字段名2 列类型 [属性] [索引],
    ...
    字段名n 列类型 [属性] [索引]
) [表类型] [表字符集];
```


```sql
CREATE TABLE IF NOT EXISTS users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,            #无符号整型自动增长非空主键
    username VARCHAR(30) NOT NULL UNIQUE DEFAULT '',                #可变字符型(30个字节)非空唯一不准重复默认值为''
    height DOUBLE(10,2) UNSIGNED NOT NULL DEFAULT 0.00,             #双精度型不会超过5位数字，小数点后面带有2位数字,超过四舍五入非空默认值为0.00
    age INT NOT NULL DEFAULT 0,                                     #整型非空默认值为0
    sex CHAR(12) NOT NULL DEFAULT 'male',                           #固定12这个字节长度字符,非空 默认值为male
    fulltext(username, sex),                                        #只能为文本字段创建全文索引
    index aindex(name,age)                                          #将字段name,age设置常规索引
) 
ENGINE MyISAM                                                       #设置表存储引擎(默认为Innodb)
DEFAULT CHARACTER SET utf8                                          #设置字符集
DEFAULT COLLATE utf8_general_ci;                                    #设置校队字符集

CREATE TABLE IF NOT EXISTS users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE DEFAULT '',
    height DOUBLE(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    age INT NOT NULL DEFAULT 0,
    sex CHAR(12) NOT NULL DEFAULT 'male',
    fulltext(username, sex),
    index nindex(name),
    key aindex(age),
    PRIMARY KEY(id)
) 
ENGINE MyISAM 
DEFAULT CHARACTER SET utf8 
DEFAULT COLLATE utf8_general_ci;
```

常规索引也可以在表创建后设置
`create index indexname on users(name, age)` 
在表users中的name,age字段创建一个索引名称为indexname
删除表中创建的索引
`drop index indexname on users` 