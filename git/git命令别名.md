Git 命令别名
Git 并不会推断你输入的几个字符将会是哪条命令，不过如果想偷懒，
少敲几个命令的字符，可以用 git config 为命令设置别名。
来看看下面的例子：
`--gobal` 表示会写入`~/.gitconfig`文件中
```
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```
现在，如果要输入 git commit 只需键入 git ci 即可。
或者直接写入文件:
```
    [alias]  
      st = status  
      ci = commit  
      br = branch  
      co = checkout  
      df = diff 
```

而随着 Git 使用的深入，会有很多经常要用到的命令，遇到这种情况，不妨建个别名提高效率。

使用这种技术还可以创造出新的命令，比方说取消暂存文件时的输入比较繁琐，可以自己设置一下：
`$ git config --global alias.unstage 'reset HEAD --'`
这样一来，下面的两条命令完全等同：
```
$ git unstage fileA ===>
$ git reset HEAD fileA
```
显然，使用别名的方式看起来更清楚。另外，我们还经常设置 last 命令：
`$ git config --global alias.last 'log -1 HEAD'`

可以看出，实际上 Git 只是简单地在命令中替换了你设置的别名。
不过有时候我们希望运行某个外部命令，而非 Git 的子命令，这个好办，只需要在命令前加上 ! 就行。如果你自己写了些处理 Git 仓库信息的脚本的话
，就可以用这种技术包装起来。作为演示，我们可以设置用 git visual 启动 gitk：
`$ git config --global alias.visual '!gitk'`

