http://ruby-china.org/topics/15729

`git pull [remote] [branch]`

拉取远程源(remote)下的分支(branch) 到本地,
然后和当前的分支进行合并(merge)

首先当前分支需要和远程分支建立关系 查看本地分支和远程(origin)分支的关系:
`git remote show origin`

那我怎么知道 tracking 了没有？
```
如果你曾经这么推过：`git push -u origin master`，
那么你执行这条命令时所在的分支就已经 tracking to origin/master 了，-u 的用处就在这里
如果你记不清了：cat .git/config，给你一张截图，
注意红色方框标示的地方（上半部分是 tracking 的，下半部分是 untracking 的），
由此可见，tracking 的本质就是指明 pull 的 merge 动作来源。别忘了：pull = fetch + merge。
```

```
git pull = git fetch + merge
git fetch 拿到了远程所有分支的更新，我用 cat .git/FETCH_HEAD 可以看到其状态，若都是 not-for-merge 则不会有接下来的 merge 动作
merge 动作的默认目标是当前分支，若要切换目标，可以直接切换分支
merge 动作的来源则取决于你是否有 tracking，若有则读取配置自动完成，若无则请指明【来源】
```

`git fetch origin` // 拿到远程仓库更新的数据 这里包括origin仓库中所有数据

`git merge origin/dev` 合并远程分支到当前分支. (上面的`git fetch origin`拿到的远程分支数据会保存在本地的origin/dev中)

> git merge  可以使用tab键补全,看有哪些分支
> 分支的合并都是在本地进行的. 如果需要和远程数据进行合并,必须先将远程仓库的数据拉取到本地(这就是fetch的作用);
> 只有将远程数据拉取到了本地后, 然后才可以执行 merge合并操作 git分支合并属于三方合并
> 而 `git pull origin dev` 是 先`git fetch origin dev`, 后 `git merge origin/dev` 两步放到一步做了
> 
> 总之: 记住一个原则: 一定是现将远程的仓库数据拉取到本地的远程分支, 然后在进行三方合并的
> 所以: 总是先 `git fetch`

git本地仓库中总是保存着两份数据: 一份是当前的仓库数据(通过不断写代码跟新数据), 一份是远程的仓库数据(通过不断fetch更新此数据)
所以就会出现这两份数据不同步. 那怎么同步呢? 将两份数据进行一次合并不就同步了吗. 具体也就是两份仓库中的分支进行合并
当然合并也可以是本地仓库中不同分支合并, 也可以是本地仓库和远程仓库的分支进行合并
我们经常使用的`git pull` 就是本地仓库分支和远程仓库分支的合并
当然本地分支的合并: `git merge fixbug`  
git 将每一次合并操作也记录成一次提交
当然这些合并都是在本地进行,根本不会影响到远程的仓库的.
合并完后,需要提交, 然后推送到远程服务器. 别人才会看到你的修改
