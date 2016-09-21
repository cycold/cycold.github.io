https://segmentfault.com/a/1190000004931751

有时候我们需要在GIT里面创建一个空分支，该分支不继承任何提交，
没有父节点，完全是一个干净的分支，例如我们需要在某个分支里存放项目文档。
使用传统的git checkout命令创建的分支是有父节点的，意味着新branch包含了历史提交，所以我们无法直接使用该命令。

创建分支
使用 git checkout的--orphan参数:             

`git checkout --orphan doc`

该命令会创建一个名为doc的分支，并且该分支下有前一个分支下的所有文件。查看--orphan的帮助：  

```
Create a new orphan branch, named <new_branch>, started from <start point> and switch to it. 
The first commit made on the new branch will have no parents and 
it will be the root of a new history totally disconnected from all the other branchs and commits.
```

这里的start point指的是你执行git checkout命令时的那个分支，当然新的分支不会指向任何以前的提交，就是它没有历史，
如果你提交当前内容，那么这次提交就是这个分支的首次提交。

删除所有内容
我们不想提交任何内容，所以我们需要把当前创建的分支内容全部删除，用git命令：

`git rm -rf .`

提交分支
使用commit命令来提交分支

`git commit -am "new branch for documentation"`

如果没有任何文件提交的话，分支是看不到的，可以创建一个新文件后再次提交则新创建的branch就会显示出来
使用branch来查看分支是否创建成功


