1. 选择版本
   下载地址: [Mongodb官网](http://www.mongodb.org)
   
2. 下载的为taz压缩包,使用命令:`tar -zxvf mongodb-osx-x86_64-3.x.x.tgz`
   解压缩到一个自定义目录(最好是一个专门安装软件的目录,比如/opt)

3. 将Mongodb命令目录(bin目录)添加到系统环境变量中(shell).
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
  - 尝试连接数据库
  `mongo` 
    ```
      MongoDB shell version: 3.0.6
      connecting to: test
      > 
    ```
  - 最后将这个启动命令放到一个启动脚本中
  `echo 'mongod --dbpath data --logpath log/mongod.log --logappend --fork' >> mongod_start.sh`
  在后台运行(--fork)必须启动日志服务
  
  如何退出这个后台进程: `pkill mongod` 或者`killall mongod` 注意不要使用`kill 9`命令,那样会造成进程锁住,下次启动不了
  查找一个进程的pid或者查看一个进程是否运行 `pgrep -lf mongod` 或者 `ps aux | grep mongod` 或者 `ps -ef | grep mongod`
  mogodb shell 操作参考:http://docs.mongodb.org/manual/reference/program/mongo/
  命令: `cls`表示清屏命令或者(CTRL + L) 
  
  
5. mongodb 的图像化管理工具:
   http://docs.mongodb.org/ecosystem/tools/administration-interfaces/


