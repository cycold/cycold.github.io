`mongoimport --db test --collection restaurants --drop --file primer-dataset.json`
> 导入primer-dataset.json 到数据库test中的restaurant集合中,如果restaurant集合已经存在,则先删除,后导入
> 注意这里默认导入的是localhost中的mogond实例,同时默认端口是27017,如果端口不是默认的27017则需要指定--port 参数指定其端口
> 使用--host 指定连接地址
> 