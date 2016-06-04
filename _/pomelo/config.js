配置阶段:
在app初始化之后,在app启动(start)之前

主要调用:
app.configure函数

app.start中,会调用用loadDefaultComponents函数,加载默认组件,同时加载配置文件通过之前的app.configure函数设置的
各配置:

app.load(pomelo.connection, app.get('connectionConfig'));
app.load(pomelo.connector, app.get('connectorConfig'));
app.load(pomelo.session, app.get('sessionConfig'));

app.load(pomelo.pushScheduler, app.get('pushSchedulerConfig'));

app.load(pomelo.remote, app.get('remoteConfig'));

app.load(pomelo.proxy, app.get('proxyConfig'));

app.load(pomelo.master, app.get('masterConfig'));
app.load(pomelo.backendSession, app.get('backendSessionConfig'));
app.load(pomelo.channel, app.get('channelConfig'));
app.load(pomelo.server, app.get('serverConfig'));
app.load(pomelo.monitor, app.get('monitorConfig'));

....


所以在configure函数,在真个app.settings中的各组件的配置字段必须为以上的固定字段值

app.load函数会执行pomelo上的组件函数(工厂函数,返回对象),将其配置选项(可以经过用户自定义)传递进去,得到了各个组件实例
当使用配置后得到了各组件的实例,然后才开始启动各个组件

其中组件server负责将各组件分配到之前由master启动的各个node进程中

