https://help.github.com/articles/changing-a-remote-s-url/
更改git的remote url :
`git remote set-url origin git@github.com:USERNAME/OTHERREPOSITORY.git`
提示警告
>warning: remote.origin.url has multiple values

直接编辑配置文件
git config remote.origin.url --replace-all url
git config -e


一般是这样回滚的：
`git branch backup` 先备份到一个新分支
`git log` 找到要回滚的版本
`git reset --hard 版本号`
完成后如果发现有问题，再利用之前的备份分支，没问题就删之

