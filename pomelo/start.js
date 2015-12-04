appUtil.startByType(self, function() {

  appUtil.loadDefaultComponents(self);

      load(name, component, opts)--> this.components[component] //加载组件实例到app.components

      // load函数中才开始真正的new组件的实例到app.components
      // pomelo属性中保存的为组件的工厂函数

      // 加载监视器
      app.load(pomelo.monitor, app.get('monitorConfig'));
  // 组件加载完后,使用appUtil.optComponents(内部调用async.forEachSeries函数逐个执行组件的启动,执行组件的start方法)
  appUtil.optComponents(self.loaded, Constants.RESERVED.START, function(err){} --> async()
  // 内部再self.afterStart(cb);而afterStart中再次递归调用 此时执行某些组件它又after_start方法
  appUtil.optComponents(self.loaded, Constants.RESERVED.AFTER_START, function(err){} --> async()


  // 启动组件的afterStart方法
  afterStart()
}


最新执行的组件为: "components/master.js"的start方法-->"master/master.js"-->"master/start.js"