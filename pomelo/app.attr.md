```js
  this.loaded = [];       // loaded component list
  this.components = {};   // name -> component map
  this.settings = {};     // collection keep set/get

// current server info
  this.serverId = null;   // current server id
  this.serverType = null; // current server type
  this.curServer = null;  // current server info
  this.startTime = null; // current server start time

  // global server infos
  this.master = null;         // master server info
  this.servers = {};          // current global server info maps, id -> info
  this.serverTypeMaps = {};   // current global type maps, type -> [info]
  this.serverTypes = [];      // current global server type list
  this.lifecycleCbs = {};     // current server custom lifecycle callbacks
  this.clusterSeq = {};       // cluster id seqence
```

以上的这些参数都是在什么时候被赋值的?

在app.init时,首先确定好启动环境(env),他决定读取的master.json, servers.json文件中的字段(是读取'development'字段还是读取'production')
默认为app.env = 'development'
`app.set(Constants.RESERVED.ENV, args.env || process.env.NODE_ENV || Constants.RESERVED.ENV_DEV, true);`

app.master 由 loadMaster(app) 赋值:
`app.master = app.get(Constants.RESERVED.MASTER);`

processArgs(app, args)赋值:
```js
  app.set(Constants.RESERVED.MAIN, args.main, true);   ==> app.main 
  app.set(Constants.RESERVED.SERVER_TYPE, serverType, true); ==> app.serverType
  app.set(Constants.RESERVED.SERVER_ID, serverId, true); ==> app.serverId
  app.set(Constants.RESERVED.MODE, mode, true); ==> app.mode
  app.set(Constants.RESERVED.TYPE, type, true); ==> app.type

  app.set(Constants.RESERVED.CURRENT_SERVER, args, true); ==> app.curServer
```

app.servers 是在 loadServers(app) 中确定的? 此时还没有直接设置到app上,而是设置到了 app.settings中
`app.loadConfigBaseApp(Constants.RESERVED.SERVERS, Constants.FILEPATH.SERVER);`
即 `this.set(key, file); this.set('servers', servers.json['develoment'])`
同时设置:
`app.set(Constants.KEYWORDS.SERVER_MAP, serverMap);`  ==> `this.set('__serverMap__', serverMap)`

其中`app.startTime`不在init时赋值,而是在app.start执行时的第一行赋值
`this.startTime = Date.now();`