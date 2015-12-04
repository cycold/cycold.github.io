appUtil.startByType(self, function() {

  appUtil.loadDefaultComponents(self);

  load(name, component, opts)--> this.components[component] //加载组件实例到app.components

  //load函数中才开始真正的new组件的实例到app.components
  // pomelo属性中保存的为组件的工厂函数

  // 加载监视器
  app.load(pomelo.monitor, app.get('monitorConfig'));

  // 启动组件的afterStart方法
  afterStart()
}