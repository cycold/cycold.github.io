查看npm的帮助命令
`npm --help`
查看某条命令的帮助
`npm help list`
查看全局安装的npm包,不显示依赖关系
`npm ls -g -depth=0`
`直接安装本地包`
`npm install lodash`
安装本地包并记录到package.json文件中(此文件必须先存在)
`npm install lodash --save`
安装开发环境下需要的包并记录到package.json文件中(此文件必须先存在)
`npm install lodash --save-dev`
安装包时,显示滚动的安装信息(加一个`-d`参数)
`npm install packageName -d`
卸载本地的包:
`npm uninstall lodash` 不会删除package.json中的包名
`npm uninstall --save lodash` 删除package.json中的包名
卸载全局的包:
`npm uninstall -g jshint`
升级npm
`sudo npm install npm -g`
升级package.json中的所有包
`npm update`
升级具体的包
`npm update packageName`
升级全局的包
`npm install -g jshint`
查看当前使用的包路径
`npm root`
查看全局使用的包路径
`npm root -g`
清除不需要,无关的npm包:
`npm prune 包名`