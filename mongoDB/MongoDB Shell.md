#### MongoDB Shell 简介与使用 - 简介
  MongoDB Shell 是MongoD自带的Javascript Shell,随MongoDB一同发布,
  它是MongoDB客户端工具,可以在Shell中使用命令与MongoDB实例交互,
  对数据库的管理操作(CURD, 集群配置, 状态查看等)都可以通过MongoDB Shell来完成.


#### MongoDB Shell 简介与使用 - 使用
  1. 执行javascript命令
  2. MongoDB客户端 -- 基本命令
  
    - 连接/切换数据库  `use jike`;
    - 数据插入        `db.stu.insert(obj)`;
    - 数据查询        `db.stu.find(query)`;
    - 数据更新        `db.stu.update(query, obj)`;
    - 数据删除        `db.stu.remove(query)`;

  相关操作:
  使用`Mongo`连接数据库,默认连接到默认数据库`test`
  使用`db`命令查看当前连接的数据库
  使用`show dbs`显示已有的数据库
  使用`use dataBaseName`切换数据库 如果切换数据库不存在,就创建一个
  
  插入数据: `db.stu.insert({name:"zhangsan",age:24})`
  查找数据: 
      `db.stu.find()` 不加参数默认返回所有的文档
      { "_id" : ObjectId("5601876b2bcf02c0204c941a"), "name" : "zhangsan", "age" : 24 }
  更新数据
      `db.stu.update({name:"zhangsan"},{$set:{age:25}})`
  删除数据:
      `db.stu.remove({name:"zhangsan"});`
      
  直接输入`help`命令可以查看帮助
  执行脚本
    1.直接运行:   mongo [--quiet] script.js
    2.交互运行    load("script.js")
    
    ```
      //script.js
      db = connect("localhost:27017");  // 连接数据库
      db = db.getSiblingDB("jike");     // 选择数据库
      cursor = db.stu.find();           // 查询集合
      
      while( cursor.hasNext() ){        // 迭代输出结果
        printjson( cursor.next() );
      }
 
    ```
    
    3.执行命令行程序   run("ls"), run("pwd");
    4. .mongorc.js 文件使用
      mongoDB Sheel启动时,会自动加载用户主目录下的.mongorc.js文件
      可以将某些频繁使用的功能放入该脚本中
    5.编辑复合变量EDITOR(使用指定的编辑器编辑文档命令)
      设置一个名为EDITOR的环境变量,指向一个编辑器路径(比如我使用vim编辑器)
      sublimeText路径: /usr/bin/vim
      编辑shell配置文件: 
      vim ~/.zshrc; 
      source ~/.zshrc;
      然后将EDITOR变量添加到.mongorc.js文件中
      vim ~/.mongorc.js
      EDITOR="/usr/bin/vim"
      之后使用mongo连接数据库, 使用edit命令编辑文档变量值
      > var mydoc = {name:"zhangsan",age:23}
      > edit mydoc

      
      