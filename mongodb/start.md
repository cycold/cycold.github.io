各数据库目录统一放在 `~/Documents/db`

`mongod --port 27017 --dbpath ~/Documents/db/MongoDB --logpath ~/Documents/db/MongoDB/dblog.log --logappend --fork`

> --logpath log file to send write to instead of stdout - has to be a file, not directory  logpath必须是一个文件
> --port 端口默认是27017
> --logappend  append to logpath instead of over-writing 以追加方式而不是重写


如何退出这个后台进程:   
`pkill mongod` 或者`killall mongod` 

> 注意不要使用`kill 9`命令,那样会造成进程锁住,下次启动不了

查找一个进程的pid或者查看一个进程是否运行 
`pgrep -lf mongod` 或者 `ps aux | grep mongod` 或者 `ps -ef | grep mongod`
