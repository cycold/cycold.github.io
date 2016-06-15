一个正则对象主要有两个方法: 
var reg = new RegExp()

reg.test()  // 执行完后,会给设置原对象的属性(修改, 注意这会影响下面的exec的执行)
reg.exec()  // 每执行一次都会修改原对象reg的属性(比如lastIndex)
