创建分支:
`git branch test` 创建test分支
`git checkout test` 切换到test分支 
新建并切换到该分支，运行 git checkout 并加上 -b 参数：
`git checkout -b iss53`
这相当于执行下面这两条命令：
```
$ git branch iss53
$ git checkout iss53
```
删除分支
`git branch -d hotfix`

合并分支,
将hotfix分支合并到主分支
`$ git checkout master`
`$ git merge hotfix`



`git branch` 命令不仅仅能创建和删除分支，如果不加任何参数，它会给出当前所有分支的清单：
```
$ git branch
    iss53
    * master
    testing
```
注意看 master 分支前的 * 字符：它表示当前所在的分支。也就是说，如果现在提交更新，
master 分支将随着开发进度前移。若要查看各个分支最后一个提交对象的信息，运行 
`git branch -v`
```
$ git branch -v
    iss53 93b412c fix javascript issue
    * master 7a98805 Merge branch 'iss53'
    testing 782fd34 add scott to the author list in the readmes
```

要从该清单中筛选出你已经（或尚未）与当前分支合并的分支，可以用 
--merge 和 --no-merged 选项（Git 1.5.6 以上版本）。
比如用 `git branch --merge` 查看哪些分支已被并入当前分支（译注：也就是说哪些分支是当前分支的直接上游。）：
```
$ git branch --merged
    iss53
    * master
```
之前我们已经合并了 iss53，所以在这里会看到它。
一般来说，`git branch --merge`得到的列表中没有 * 的分支通常都可以用 
git branch -d 来删掉。
原因很简单，既然已经把它们所包含的工作整合到了其他分支，删掉也不会损失什么。
另外可以用 `git branch --no-merged` 查看尚未合并的工作：
```
$ git branch --no-merged
    testing
```
它会显示还未合并进来的分支。由于这些分支中还包含着尚未合并进来的工作成果，
所以简单地用 git branch -d 删除该分支会提示错误，因为那样做会丢失数据：
```
$ git branch -d testing
    error: The branch 'testing' is not an ancestor of your current HEAD.
    If you are sure you want to delete it, run 'git branch -D testing'.
```

>不过，如果你确实想要删除该分支上的改动，可以用大写的删除选项 -D 强制执行，就像上面提示信息中给出的那样。

推送本地分支serverfix到远程服务器,同时远程服务器分支也命名为serverfix:
`git push origin serverfix`
可以把本地分支推送到某个命名不同的远程分支：若想把远程分支叫作 awesomebranch，
把本地的分支serverfix推送到服务器上的awesomebranch分支
`git push origin serverfix:awesomebranch` 
来推送数据。

接下来，当你的协作者再次从服务器上获取数据时，
他们将得到一个新的远程分支 origin/serverfix，并指向服务器上 serverfix 所指向的版本：
```
$ git fetch origin
    remote: Counting objects: 20, done.
    remote: Compressing objects: 100% (14/14), done.
    remote: Total 15 (delta 5), reused 0 (delta 0)
    Unpacking objects: 100% (15/15), done.
    From git@github.com:schacon/simplegit
    * [new branch] serverfix -> origin/serverfix
```

值得注意的是，在 fetch 操作下载好新的远程分支之后，
你仍然无法在本地编辑该远程仓库中的分支。换句话说，
在本例中，你不会有一个新的 serverfix 分支，有的只是一个你无法移动的 origin/serverfix 指针。

如果要把该远程分支的内容合并到当前分支，可以运行 `git merge origin/serverfix`。
如果想要一份自己的 `serverfix` 来开发，可以在远程分支的基础上分化出一个新的分支来：
```
$ git checkout -b serverfix origin/serverfix
    Branch serverfix set up to track remote branch refs/remotes/origin/serverfix.
    Switched to a new branch "serverfix"
```

这会切换到新建的 serverfix 本地分支，其内容同远程分支 origin/serverfix 一致，
这样你就可以在里面继续开发了。


跟踪远程分支
从远程分支 checkout 出来的本地分支，称为 跟踪分支 (tracking branch)。
跟踪分支是一种和某个远程分支有直接联系的本地分支。
在跟踪分支里输入 git push，Git 会自行推断应该向哪个服务器的哪个分支推送数据。
同样，在这些分支里运行 git pull 会获取所有远程索引，并把它们的数据都合并到本地分支中来。
在克隆仓库时，Git 通常会自动创建一个名为 master 的分支来跟踪 origin/master。
这正是 git push 和 git pull 一开始就能正常工作的原因。
当然，你可以随心所欲地设定为其它跟踪分支，
比如 origin 上除了 master 之外的其它分支。
刚才我们已经看到了这样的一个例子：
`git checkout -b [分支名] [远程名]/[分支名]`
如果你有 1.6.2 以上版本的 Git，还可以用 --track 选项简化：
```
$ git checkout --track origin/serverfix
    Branch serverfix set up to track remote branch refs/remotes/origin/serverfix.
    Switched to a new branch "serverfix"
```
要为本地分支设定不同于远程分支的名字，只需在第一个版本的命令里换个名字：

```
$ git checkout -b sf origin/serverfix
    Branch sf set up to track remote branch refs/remotes/origin/serverfix.
    Switched to a new branch "sf"
```
现在你的本地分支 sf 会自动将推送和抓取数据的位置定位到 origin/serverfix 了。

删除远程分支:
如果不再需要某个远程分支了，比如搞定了某个特性并把它合并进了远程的 master 分支（或任何其他存放稳定代码的分支），
可以用这个非常无厘头的语法来删除它：
`git push [远程名] :[分支名]`
如果想在服务器上删除 serverfix 分支，运行下面的命令：
```
$ git push origin :serverfix
    To git@github.com:schacon/simplegit.git
    - [deleted] serverfix
```
咚！服务器上的分支没了。你最好特别留心这一页，因为你一定会用到那个命令，而且你很可能会忘掉它的语法。
有种方便记忆这条命令的方法：记住我们不久前见过的 
`git push [远程名] [本地分支]:[远程分支]`
 语法，如果省略 [本地分支]，那就等于是在说“在这里提取空白然后把它变成[远程分支]”。
 




