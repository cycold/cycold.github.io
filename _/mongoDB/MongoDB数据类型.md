#### MongoDB数据类型 - 简介
  BSON可以理解为在JSON的基础上添加了一些新的数据类型,包括Date,正则表达式,
  对数值类型的更进一步划分等.
  
#### MongoDB数据类型 - 基本数据类型
  - null 表示空值或者不存在的字段(值不存在) 例如: `db.conllection.find({"y":null})` 
  - 布尔 true 或 false 例如 {"y": true}
  - 数值类型 支持32-int, 64-int以及64-double 
    ```
      (注:使用MongoDB shell,默认为64位浮点数,因为其shell为javascript shell; javascript只支持64位浮点数)
      例如: {"y": 10} {"y":NumberInt(10)}
      所以当在MongoDB shell中保存{"y": 10}实际保存的是64-double(64位浮点数),所以如果需要在MongoDB shell保存
      32位整数,可以使用NumberInt();
    ```
  - 字符串 使用UTF-8对字符串进行编码
  - 二进制数据 可以保存由任意字节组成的字符串,例如图片,视频
  - 正则表达式类型 主要用于查询,使用正则表达式作为限制条件
    ```
      例如:
        {name: /foo/} name字段含有foo的文档
        {name: /foo/i} name字段含有foo的文档,且不区分大小写
        {name: /^foo/i} name字段以foo开头的文档,且不区分大小写
    ```
  - Javascript代码 文档中可以包含任意的javascript代码
    ```
      例如: {"func": function(console.log(1)){}}
    ```
    
#### MongoDB数据类型 - Date日期类型
  - MongoDB中,日期类型是一个64位的整数,它代表的是距离Unix epoch的毫秒数
  - MongoDB在存储时间时,先转化为UTC时间
    ```
       北京时间(CST) = UTC + 8 小时
    ```
  - MongoDB Shell中可以使用new Date或ISODate创建时间对象,在进行显示时,Shell会根据本地时间
    去设置显示日期对象
    
#### MongoDB数据类型 - Timestamp类型
  - 时间戳类型有两部分组成
     32 bit-Unix epoch + 32 bit-自增序数(同一秒)
  - Timestamp只供MongoDB数据库服务内部使用,用于记录操作的详细时间
  - TimeStamp类型和Date类型是没有关系的,对于我们来说使用更多的是Date类型
  - 相关函数: TimsStamp()
  
#### MongoDB数据类型 - ObjectId类型
  - ObjectId 由24个十六进制字符构成,每个字节存储两位十六进制数字,共需要12字节存储空间
    ```
      例如: { "_id" : ObjectId("560166d538bb567ee518b9b6"), "name" : "tom", "age" : 24 }
    ```
  -  每个字节代表的含义如下:
  - 相关函数: ObjectId(), getTimestamp(), valueOf()
  
#### MongoDB数据类型 - 内嵌文档类型
  文档可以作为键的值,这样的文档称为内嵌文档.内嵌文档可以使数据不用保存成扁平结构的键值对,从而使数据组织方式更加自然
  ```
    例如下面是一个博客管理有关的文档
    {
        _Id: <ObjectId>,
        title: "MongoDB Date Model",
        author: "jike",
        comments: [   //子文档数组 嵌套文档模式
                    {who:"John", comment:"Good"},
                    {who:"Joe", comment:"Excellent"}
                  ]
    }
  ```

#### MongoDB数据类型 - 数组类型
  - 数组是使用方括号来表示的一组值
  - 数组中可以包含不同数据类型的元素(字符串,浮点数)
  - 针对数组,MongoDB提供了许多特定的操作符,例如:$push,$pop,$pull,$slice,$addToSet
  - MongoDb可自动为数组元素建立Multikey索引