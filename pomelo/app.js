
var pomelo = require('pomelo'); //挂载组件(以getter形式挂载)

var app = pomelo.createApp(); //加载组件(将实例化的组件加载到app.components,app.loaded中,同时设置好配置选项)

// 组件启动前开始配置各组件
// configure...

// 配置各服务器可运行的环境,当启动node app.js时会判断此服务器类型(type)以及此服务器运行环境
// 然后在回调函数中进行当前启动的服务器类型进行配置(因为回到函数中已经设置好this) 因为app.js会运行多次,而每一次运行的服务器类型有可能是不同的
// 所以需要判断到具体某一类型的服务器

// 当启动(node app.js)时为,gate服务器,并且是在开发环境下 那么就是设置当前的gate服务器的connector为pomelo.connectors.hybridconnector
app.configure('development', 'gate', function() {
  app.set('connectorConfig', {
    connector: pomelo.connectors.hybridconnector
  })
})


app.configure('development', 'connector', function() {
  app.set('connectorConfig', {
    connector: pomelo.connectors.hybridconnector,
    heartbeat: 3
  })
})

app.start(); // 运行组件 (启动各node服务器(子进程))

process.on('uncaughtException', function(err) {
  console.error(' Caught exception: ' + err.stack);
});


// 所以说整个就是组件生命周期的管理



