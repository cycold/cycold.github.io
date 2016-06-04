首先启动主进程master,此进程即是我们手动启动(node app.js)
> 初始化master(读取config/master.json,设置相应端口),之后启动master相关组件(start, after start)

当master初始化完后,开始启动子进程(通过读取config/servers.json)得到启动子进程相应的端口...

开始初始化(读取config/servers.json),为启动子进程做准备(准备好端口,主机,进程名称,进程id),
只有当servers.json中的进程都初始化之后,才开始依次启动