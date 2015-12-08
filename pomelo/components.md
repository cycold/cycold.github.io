每一个服务器启动的过程也就是组件启动的过程

组将启动经过两个过程: start, afterstart, 每一个过程都会相应的启动组件的start,afterstart方法,
之后在afterstart方法的最后,统计当前服务器的启动时间, 同时打印当前服务器启动完毕,
最后是发送服务器启动事件(此事件在modules/monitoratcher.js中被捕获)
```
var usedTime = Date.now() - self.startTime;
logger.info('%j startup in %s ms', id, usedTime);
self.event.emit(events.START_SERVER, id);
```