##### redis 的安装启动         
1.官网源码安装(http://redis.io/)              

`tar zxvf redis-3.0.4.tar.gz`           
`cd redis-3.0.4`            
`make`          

进入redis-X.Y.Z文件夹后直接make即可，安装非常简单                           

make成功后会在`src`文件夹下产生一些二进制可执行文件

包括:         

```
$ find . -type f -executable
./redis-benchmark                   //用于进行redis性能测试的工具
./redis-check-dump                  //用于修复出问题的dump.rdb文件
./redis-cli                         //redis的客户端
./redis-server                      //redis的服务端
./redis-check-aof                   //用于修复出问题的AOF文件
./redis-sentinel                    //用于集群管理
....
```

2.使用homebrew安装          
`brew install redis`        

```
==> Downloading https://homebrew.bintray.com/bottles/redis-3.0.3.yosemite.bottle.tar.gz  
######################################################################## 100.0%      
==> Pouring redis-3.0.3.yosemite.bottle.tar.gz      
==> Caveats      

To have launchd start redis at login:      
    ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents       
Then to load redis now:      
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist       
Or, if you don't want/need launchctl, you can just run:        
    redis-server /usr/local/etc/redis.conf    
==> Summary      
```

3.启动redis (brew已将执行路径加入到了坏境path中,所以不需要切到其bin目录下)      
不带配置文件启动     
`redis-server`        
带配置文件启动(配置文件可以指定,这里使用homebrew安装完后的配置文件)    
`redis-server /usr/local/etc/redis.conf`       

> 默认情况下，redis-server会以非daemon(守护进程)的方式来运行，且默认服务端口为**6379**     

一般是设置为以后台进程启动,所以需要在配置文件中指定其守护进程为`yes`即可

```
# By default Redis does not run as a daemon. Use 'yes' if you need it.      
# Note that Redis will write a pid file in /usr/local/var/run/redis.pid when daemonized.
daemonize no  ===> 改为yes    
```

> 注意: /usr/local/var/run/redis.pid 文件将被创造,当radish以daemon进程启动时   

启动redis 后台启动    
`redis-server /usr/local/etc/redis.conf`   

查看redis进程是否启动   
`ps -ef | grep redis` 

关闭后台redis进程
`pkill redis` 或者 `redis-server shutdown`

redis服务器运行后,开始启动redis客户端:
`redis-cli`

```
icewater:~/ $ redis-cli         # 启动redis客户端
127.0.0.1:6379> set name "ice"  # 用set指令来设置key、value
OK
127.0.0.1:6379> get name        # 来获取name的值
"ice"
127.0.0.1:6379> shutdown        # 通过客户端来关闭redis服务端(关掉服务端进程相当于pikll)
not connected>

127.0.0.1:6379> quit            # quit或者exit退出客户端没有关闭redis服务器
127.0.0.1:6379> clear           # 清屏 (mongodb下位cls)
```

#### redis中文文档
http://redisdoc.com/