app.init();
    |
appUtil.defaultConfiguration(app);
    |
  setupEnv(app, args); ->app.set('env', args.env || process.env.NODE_ENV || 'development', true);->app.env='development';
      |
  loadMaster(app);-> app.loadConfigBaseApp('master', '/config/master.json')->this.set('master', require('/config/master.json')[env]);
      |
  loadServers(app);
    -> app.loadConfigBaseApp('servers', '/config/servers.json')->this.set('servers', require('/config/servers.json')[env]);
    -> app.set('__serverMap__', serverMap)
