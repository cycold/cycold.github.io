#### Mac下MongoDB数据库的安装
1.选择版本
  下载地址: [Mongodb官网](http://www.mongodb.org)

2.下载的为taz压缩包,使用命令:`tar -zxvf mongodb-osx-x86_64-3.x.x.tgz`
  解压缩到一个自定义目录(最好是一个专门安装软件的目录,比如/opt)

3.将Mongodb命令目录(bin目录)添加到系统环境变量中(shell).
  使用的是zsheel,所以将其添加进去:`subl ~  ~/.zshrc`

  ```
    # mongod config
    MONGODB_HOME=/opt/mongodb-osx-x86_64-3.0.6
    PATH=$PATH:$MONGODB_HOME/bin
  ```

  最后使用命令`source ~/.zshrc`使配置文件生效.
  使用命令`mongod -version`测试Mongodb环境变量是否添加成功.

  ```
    db version v3.0.6
    git version: 1ef45a23a4c5e3480ac919b28afcba3c615488f2
  ```

4. 启动数据库服务
  `mongod --dbpath $dbpath --logpath $logpath --logappend --fork`

  其中`--dbpath`后面接的`$dbpath`为要启动的数据库路径,
  其中`--logpath`后面接的参数`$logpath`为要启动的数据库的日志文件路径
  其中`--logappend`表示已追加的方式打开文件
  其中`--fork` 表示将数据库服务放到后台运行
  启动过程:
  - 新建数据库目录
  `mkdir data`

  - 新建日志目录
  `mkdir log`

  - 启动数据库
  `mongod --dbpath data --logpath log/mongod.log --logappend --fork`

  ```
    about to fork child process, waiting until server is ready for connections.
    forked process: 2235
    child process started successfully, parent exiting
  ```

  - 尝试连接数据库`mongo`

  ```
    MongoDB shell version: 3.0.6
    connecting to: test
    >
  ```

  - 最后将这个启动命令放到一个启动脚本中

  ```
  echo 'mongod --dbpath data --logpath log/mongod.log --logappend --fork' >> mongod_start.sh
  ```

在后台运行(--fork)必须启动日志服务
如何退出这个后台进程: `pkill mongod` 或者`killall mongod` 注意不要使用`kill 9`命令,那样会造成进程锁住,下次启动不了
查找一个进程的pid或者查看一个进程是否运行 `pgrep -lf mongod` 或者 `ps aux | grep mongod` 或者 `ps -ef | grep mongod`

5.mongodb 的图像化管理工具:
  http://docs.mongodb.org/ecosystem/tools/administration-interfaces/

#### MongoDB用户授权操作
默认不需要授权,每个匿名用户都是超级管理员
  MongoDB用户主要分为两类:`超级管理员`和`本数据库管理员`.
1.**首先MongoDB必须以--auth参数启动**
  `mongod --auth --dbpath data --logpath dblog.log --logappend --fork`

2.**指定超级管理员**
  启动后,使用`mongo`连接,此时默认进入`test`数据库,此时还没有设置超级管理员,所以还不需要密码.
  切换到`admin`数据库(超级管理员必须在admin数据库中添加)
  切换到admin数据库
  `use admin`
  设置超级管理员和密码
  `db.addUser("root", 123456)`
  设置成功后,退出需要重新登录来认证,此时就需要输入密码和用户名认证了.
  使用超级管理员登录local27017端口的test数据库
  `mongo -u root -p 123456 localhost:27017/test`
  此时提示登录不了,为什么超级管理员不能登录test数据库呢?

  原因是:
  > test数据库有其自己的管理员,超级管理员不能登录test数据库来认证,
  > 他必须登录其所属的admin数据库来认证,通过后,就可以在admin数据库中,通过使用
  > `use test`自由的切换数据库了,甚至删除所有的数据库.
  > 登录admin进行超级管理员认证

  登录
  `mongo -u root -p 123456 localhost:27017/admin`

3.**为数据库添加一般管理员**
  首先你要是一个超级管理员,通过登录admin数据库授权后,然后切换到比如`test`数据库中,
  使用`db.addUser("user1", 123456)` 来给当前的数据库(test)添加一个管理员.
  添加成功后,使用`show collections`就会看到多出了一个集合`system.users`.
  使用`db.system.users.find()`可以查看里面的用户.
  退出超级管理员,使用`user1`登录,注意user1只能登录test数据库.
  `mongo -u root -p 123456 localhost:27017/test`
  `user1`只能操作本数据库.

#### MongoDB数据库的备份恢复,数据导入导出

数据导出导入:只是导出文文件,以字符串形式导出,可以使用编辑器查看
```
mongoexport   导出
       -d 为需要导出的数据库
       -c 为需要导出的集合
       -o 为导出后保存的路径

mongoexport -d test -c user -o /tmp/user.bak

mongoimport   导入
       -d 为需要导入的数据库
       -c 为需要导入的集合
       -o 为需要导入的文件路径

mongoimport -d test -c user -o /tmp/user.bak

```

数据备份恢复:这里导出就是二进制文件了BSON(json二进制文件).
```
mongodump 备份
        -d 为需要进行备份的数据库
        -o 为保存备份文件的路径 如果不指定,就在保存在当前目录`dump`下

mongodump -d test -o /tmp/    # 备份完后,保存在 /tmp/test 目录下

mongorestore 恢复
        -d 指定需要恢复的数据库
        -dir 指定恢复文件的路径

mongorestore -d test -dir /tmp/test


```
