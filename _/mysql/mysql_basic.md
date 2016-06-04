#### 创建数据表的SQL语句模型
DDL
```
CREATE TABLE [IF NOT EXISTS] 表名称(
    字段名1 列类型 [属性] [索引],
    字段名2 列类型 [属性] [索引],
    ...
    字段名n 列类型 [属性] [索引]
) [表类型] [表字符集];
```

表名称和字段名 需要我们自己定义名称
    users
    articles
SQL是不区分大小写的， 但是表就是一个文件名， Windows不区分大小写，Linux区分大小写
>1. 一定要有意义（英文或英文组合和多个单词的缩写）
>2.自己定的名称最好都小写
>3. SQL 语句都大写

#### 数据值和列类型
细分都是按空间大小来区分的
可以存下就可以

1、数值型
    整型（整数）
    非常小的整型     1字节    -128--127      0-- 255（无符号）            TINYINT
    较小的整型       2字节    -32768--32767  0---65535                    SMALLINT
    中等大小的整型   3字节                   0---16777215                 MEDIUMINT
    标准的整数型     4字节                   -2147483648--- 2147483647    INT
    大整数型         8字节                                      BIGINT            
    浮点型（小数）
        float(M,D)            4字节
        double(M,D)           8字节
        定点数
        decimal(M, D)        M+2字节 
        
2、字符型
    “mysql” 'mysql'  \
    char(m)              255  固定长度
    varchar(m)           255  可变长度
    char(4)              varchar(4)
    ''       4           ''       1字节
    'ab'     4           'ab'     3字节
    'abcd'   4           'abcd'   5字节
    'abcdefg'4           'abcdefg'5字节
    text 文本数据(文章)    2的16次方 - 1 字节
        MEDIUMTEXT
        LONGTEXT 
    blob  二进制数据 （相片）
        MEDIUMBLOB
        LONGBLOB  
    ENUM  枚举  1或2字节
    ENUM("one", "two", "three", "four")  ---  65535, 一次只能有一个值
    SET   集合  1，2，3，4，8字节    --- 64       一次可以用多个集合中的值，中间使用”,“分开
    
3、日期型
    DATE          YYYY-MM-DD
    TIME          hh:mm:ss
    DATETIME      YYYY-MM-DD hh:mm:ss
    TIMESTAMP     YYYYMMDDhhmmss  
    YEAR          YYYY
    创建表时最好不要使用这些中的时间格式（PHP中时间戳 1970-1-1 0:0:0）是一整数
    
    用整数保存时间  time();

#### 数据字段属性
1. unsigned 可以让空间增加一倍  -128-127   0-255
   只能用在数值型字段
2. zerofill 
   只能用在数值型字段， 前导0 
   该字段自动应用UNSIGNED
3. AUTO_INCREMENT
   只能是整数， 数据每增加一条就会自动增1， 字段的值是不充许重复
   NULL 0 留空
   每个表都最好有一个ID字段，设置为自动增涨， auto_increment
4. NULL 和 NOT NULL
    默认是空
    NULL 值 
    将来将这个表的数据转为PHP程序的数据时， 整数列有NULL  转成0吗  字符串NULL PHP ''  0.00
    建议： 在创建表时每个字段都不要插入NULL,使用not null限定
5. default 
  设置默认值
  
```sql
# 创建一个用户表
CREATE TABLE users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL DEFAULT '',
    height DOUBLE(10,2) NOT NULL DEFAULT 0.00,
    age INT NOT NULL DEFAULT 0,
    sex CHAR(4) NOT NULL DEFAULT '男'
);

CREATE TABLE users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL DEFAULT '',
    height DOUBLE(10,2) NOT NULL DEFAULT 0.00,
    age INT NOT NULL DEFAULT 0,
    sex CHAR(4) NOT NULL DEFAULT '男',
    PRIMARY KEY(id)
);
```

##### 创建索引
1. 主键索引(提高查询速度)
    主要作用是确定数据库表里一条特定数据记录的位置
    最好为每一张数据表定义一个主键
    一个表只能指定一个主键
    主键的值不能为空
2. 唯一索引(主要防止重复)
    都可以防止创建重复的值
    每个一表都可以有多个唯一索引
    unique
3. 常规索引
    最重要的技术
    提升数据库的性能
    11111111111
    22222222222
    3333333333333
    44444444444444
    55555555555
    .。。。
    101010100101011
    索引顺序  5层  软件  PHP   《细说PHP》  书店
    可以提高查找的速度， 减慢数据列上插入，删除， 修改
    和表一样是独立的数据对象
    可以单独使用
    `create index indexname on users(name, age)` 在表users中的name,age字段创建一个索引名称为indexname
    `drop index indexname on users` 删除创建的索引
    也可以在创建表时指定索引;
    ```
        create table carts(
            id int not null,
            uid int not null,
            sid int not null,
            number int not null,
            primary key(id),    #指定主键
            key cuid(uid),      #创建索引cuid
            index csid(sid));   #创建索引csid

        create table carts(
            id int not null,
            uid int not null,
            sid int not null,
            number int not null,
            primary key(id),    #指定主键
            key cartsIndex(uid, sid)) # 这里也可以合在一起写
    ```
    也可在创建表时创建
    index key 是同义词
    多列都可以，
4. 全文索引
    fulltext类型索引， MyISAM 表类型使用， 只有在varchar char text文本字符串上使用(查找文本)
    也可以多个数据列使用
    ```
        create table books(
            id int,
            bookname varchar(30),
            price double,
            detail text not null,
            fulltext(detail, bookname),  # 只能为文本字段创建全文索引
            index ind(proice),
            primary key(id)
        )

        select * from books where book name like %php% #这样查找效率低
        select bookname, price from books where MATCH(detail) AGAINST('php')#这样查找效率高
        select match(detail) against('php') from books
    ```

六、数据表类型及存储位置
    MySQL和大多数数据库不同， MySQL有一个存储引擎概念。
    MySQL可以针对不同的存储引擎需求可以选择最优的存储引擎
    引擎 数据表类型
    我们只学12中的MyISAM 和 InnoDB两个
    `create table () type InnoDB;`
    `create table () engine InnoDB;`
    MyISAM 表类型是默认的
    选择MyISAM还是选择InnoDB
    注意： 在一个MySQL库中可以（创建表时）指定不同表类型
MyISAM 表类型
    `OPTIMIZE TABLE 表名`
    `强调快速读取操作`
    也有缺点：有一些功能不支持
InnoDB 表类型
    支一些MyISAM所不支技功能
    也有缺点：占用空间大
功能          MyISAM               InnoDB
事务处理        不支持                 支持
数据行锁定      不支持                  支持
外键约束        不支持                 支持
表空间占用      相对小               相对大 最大2倍
全文索引        支持                 不支持
    
七、MySQL默认字符集
ACSII
ISO-8859-1/latin1 
    gb2312-80  不推荐使用
    gb13000    不推荐使用
    GBK        可以用
    GB18030    数据支持还比较少见
    UTF -32
    USC -2
    UTF-16
    `UTF-8 1--4  强烈推荐`
    GBK 2字节 UTF8 3字节
    name varchar(12)  6个汉字  GBK
    name varchar(12)  4个汉字  UTF-8
mySQL服务器， 数据库， 数据表， 字段

数据库中的UTF-8   utf8
mySQL的字符集包括
    字符集： 是用来定义MySQL存储字符串的方式   36
    校对规则：校对规则是定义了比较字符串的方式  70
    一对多的关系： 1 个字集可以对应多个校对规则 
`show collation like 'gbk%'` 显示gbk字符集的校队规则

创建数据库,指定数据库的字符集
`create database t1 default character set gbk collate gbk_chinese_ci;`
客户端与服务器交互时
character_set_client
character_set_connection
character_set_results
`set names 字符集`
同时修改以上三个的值

八、修改表
        Alter table 