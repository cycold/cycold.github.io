http://blog.chinaunix.net/uid-27714502-id-3436696.html
http://blog.chinaunix.net/uid-27714502-id-3436703.html
http://blog.csdn.net/hudashi/article/details/7664631/
> $ git checkout mywork
> $ git rebase origin
> 这些命令会把你的"mywork"分支里的每个 提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中),
> 然后把"mywork"分支更新为最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上。
> 
> 当'mywork'分支更新之后，它会指向这些新创建的提交(commit),而那些`老的提交会被丢弃`。
>  如果运行垃圾收集命令(pruning garbage collection), 这些被丢弃的提交就会删除. （请查看 git gc)


```
二、解决冲突
在rebase的过程中，也许会出现冲突(conflict). 在这种情况，Git会停止rebase并会让你去解决 冲突；
在解决完冲突后，用"git add"命令去更新这些内容的索引(index), 然后，你无需执行 git commit,只要执行:
$ git rebase --continue
这样git会继续应用(apply)余下的补丁。
在任何时候，你可以用--abort参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。
$ git rebase --abort


另外，我们在使用git pull命令的时候，可以使用--rebase参数，即git pull --rebase,
这里表示把你的本地当前分支里的每个提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中),
然后把本地当前分支更新 为最新的"origin"分支，最后把保存的这些补丁应用到本地当前分支上。
```



```
命令格式
我们先来看看git-rebase的命令格式：
git rebase [-i | --interactive] [options] [--onto ]  []
git rebase [-i | --interactive] [options] –onto   –root []
git rebase –continue | –skip | –abort
从命令格式，可以看到git-rebae命令至少需要一个参数，那就是，这个参数可以是一个分支名称，也可以是一次有效的commit。
一个小地方
在你决定学习这个命令，首先有一个小地方你应该注意，那就是如果git-rebase后面加上了参数<branch>，那么 git-rebase会在任何其他动作之前先执行git checkout ，如果没有加参数，那么git-rebase会针对当前分支来做动作。
命令用处
git-rebase命令主要用在从上游分支获取最新commit信息，并有机的将当前分支和上游分支进行合并。
这是只言片语的介绍，可能读者并不能了解它的用途和好处。
还是要用例子说话。我们假设主分支为master，在开发过程中生成一个新分支topic。master称为topic的上游分支。
例子开始：
[rocrocket@abc git-study]$ cd rebase
[rocrocket@abc rebase]$ ls
[rocrocket@abc rebase]$ vi roc.c
[rocrocket@abc rebase]$ cat roc.c
int main()
{
printf(“master:001″);
return 0;
}
[rocrocket@abc rebase]$ git init
Initialized empty Git repository in /rocrocket/career/programming/git-study/rebase/.git/
[rocrocket@abc rebase]$ git add .
[rocrocket@abc rebase]$ git commit -m “master:001″
Created initial commit 2d89602: master:001
1 files changed, 5 insertions(+), 0 deletions(-)
create mode 100644 roc.c
[rocrocket@abc rebase]$ git log
commit 2d89602d0c9955824df0d2c023e447f5d98d863a
Author: rocrocket 
Date:   Mon Nov 17 15:26:40 2008 +0800
master:001
[rocrocket@abc rebase]$
到此，我们已经在master分支完成了一个commit。
[rocrocket@abc rebase]$ vi roc.c
[rocrocket@abc rebase]$ git commit -a -m “master:002″
Created commit 41b3d1c: master:002
1 files changed, 1 insertions(+), 0 deletions(-)
[rocrocket@abc rebase]$ cat roc.c
int main()
{
printf(“master:001″);
printf(“master:002″);
return 0;
}
[rocrocket@abc rebase]$ git log
commit 41b3d1cfaae0184bb8e5f27a165d51cc23867413
Author: rocrocket 
Date:   Mon Nov 17 15:28:01 2008 +0800
master:002
commit 2d89602d0c9955824df0d2c023e447f5d98d863a
Author: rocrocket 
Date:   Mon Nov 17 15:26:40 2008 +0800
master:001
[rocrocket@abc rebase]$
到此为止，我们已经在master分支完成了两次commit的提交。
现在的分支结构是这样的，请读者记清楚：
master:001 — master:002   (master)
好，我们继续要做的事情就是建立一个新的分支topic。
[rocrocket@abc rebase]$ git branch
* master
[rocrocket@abc rebase]$ git branch topic
[rocrocket@abc rebase]$ git branch
* master
topic
[rocrocket@abc rebase]$ git checkout topic
Switched to branch “topic”
[rocrocket@abc rebase]$ git branch
master
* topic
[rocrocket@abc rebase]$
好了，我们已经成功建立了topic分支，并且已经转移到了topic分支。
接下来，topic上面的开发情况如下：
[rocrocket@abc rebase]$ vi roc.c
[rocrocket@abc rebase]$ git commit -a -m “topic:001″
Created commit d599b54: topic:001
1 files changed, 1 insertions(+), 0 deletions(-)
[rocrocket@abc rebase]$ vi roc.c
[rocrocket@abc rebase]$ git commit -a -m “topic:002″
Created commit 3f4b17f: topic:002
1 files changed, 1 insertions(+), 0 deletions(-)
[rocrocket@abc rebase]$ cat roc.c
int main()
{
printf(“topic :002″);
printf(“topic :001″);
printf(“master:001″);
printf(“master:002″);
return 0;
}
[rocrocket@abc rebase]$ git log
commit 3f4b17fe3b5d277771770c0515e75f04e783ad14
Author: rocrocket 
Date:   Mon Nov 17 15:49:24 2008 +0800
topic:002
commit d599b54336ad96b8e09ef92e371a09a25e6d0c11
Author: rocrocket 
Date:   Mon Nov 17 15:48:58 2008 +0800
topic:001
commit 41b3d1cfaae0184bb8e5f27a165d51cc23867413
Author: rocrocket 
Date:   Mon Nov 17 15:28:01 2008 +0800
master:002
commit 2d89602d0c9955824df0d2c023e447f5d98d863a
Author: rocrocket 
Date:   Mon Nov 17 15:26:40 2008 +0800
master:001
[rocrocket@abc rebase]$
可知，自从建立并切换到topic分支后，topic又进行了两次commit提交，每次分别加入了一行代码。
此时，分支结构应该是这样的：
    topic:001 --- topic:002 （topic） / master:001 --- master:002   (master)
这个图已经很清晰了，可以看出分支的走向。
接下来，master分支也有自己的进度，如下：
[rocrocket@abc rebase]$ git checkout master
Switched to branch “master”
[rocrocket@abc rebase]$ git branch
* master
topic
[rocrocket@abc rebase]$ vi roc.c
[rocrocket@abc rebase]$ git commit -a -m “master:003″
Created commit 91a7ffc: master:003
1 files changed, 1 insertions(+), 0 deletions(-)
[rocrocket@abc rebase]$ vi roc.c
[rocrocket@abc rebase]$ git commit -a -m “master:004″
Created commit b81fbc3: master:004
1 files changed, 1 insertions(+), 0 deletions(-)
[rocrocket@abc rebase]$ cat roc.c
int main()
{
printf(“master:001″);
printf(“master:002″);
printf(“master:003″);
printf(“master:004″);
return 0;
}
[rocrocket@abc rebase]$ git log
commit b81fbc3be5c7bd1fdef72820c29e2c67590f4b03
Author: rocrocket 
Date:   Mon Nov 17 15:55:23 2008 +0800
master:004
commit 91a7ffc73e6320a86b10849061efd672f47fd5bd
Author: rocrocket 
Date:   Mon Nov 17 15:55:06 2008 +0800
master:003
commit 41b3d1cfaae0184bb8e5f27a165d51cc23867413
Author: rocrocket 
Date:   Mon Nov 17 15:28:01 2008 +0800
master:002
commit 2d89602d0c9955824df0d2c023e447f5d98d863a
Author: rocrocket 
Date:   Mon Nov 17 15:26:40 2008 +0800
master:001
[rocrocket@abc rebase]$
可以看到，master分支也完成了两次commit提交，每次分别添加了一行代码。
截止此时，分支结构为：
   topic:001 --- topic:002 （topic） / master:001 --- master:002 --- master:003 --- master:004 (master)
在这个时候，我们的实验样本已经基本搭建完毕，git-rebase就要派上用场了！
我们假设topic和master是一个项目的两个分支，master当然是主分支，而topic是旁路分支。在软件开发的大部分情况中，旁路分支是要遵 从主分支的。所以说，现在topic分支想将master分支开发的最新代码导入到topic分支中，而且要求此动作不影响master主分支的开发，也 就是说要暗中完成。git-rebase上场了：
[rocrocket@abc rebase]$ git checkout topic
Switched to branch “topic”
[rocrocket@abc rebase]$ git branch
master
* topic
[rocrocket@abc rebase]$ git rebase master
First, rewinding head to replay your work on top of it…
Applying topic:001
error: patch failed: roc.c:1
error: roc.c: patch does not apply
Using index info to reconstruct a base tree…
Falling back to patching base and 3-way merge…
Auto-merged roc.c
Applying topic:002
[rocrocket@abc rebase]$
我们使用了git rebase master来完成我们的需求。如果你心细的话，你会看到它输出了一些error，意思是说“补丁失败”，这个error没有关系，不影响git-rebase的正常工作的。
让我们来看看git-rebase的魔力吧：
[rocrocket@abc rebase]$ git branch
master
* topic
[rocrocket@abc rebase]$ git log
commit 05de9849078541c86cf5182cd8c15fa22bd00f77
Author: rocrocket 
Date:   Mon Nov 17 15:49:24 2008 +0800
topic:002
commit 7e5a744ef9e0740b4a091e9c8baa859b14800b0b
Author: rocrocket 
Date:   Mon Nov 17 15:48:58 2008 +0800
topic:001
commit b81fbc3be5c7bd1fdef72820c29e2c67590f4b03
Author: rocrocket 
Date:   Mon Nov 17 15:55:23 2008 +0800
master:004
commit 91a7ffc73e6320a86b10849061efd672f47fd5bd
Author: rocrocket 
Date:   Mon Nov 17 15:55:06 2008 +0800
master:003
commit 41b3d1cfaae0184bb8e5f27a165d51cc23867413
Author: rocrocket 
Date:   Mon Nov 17 15:28:01 2008 +0800
master:002
commit 2d89602d0c9955824df0d2c023e447f5d98d863a
Author: rocrocket 
Date:   Mon Nov 17 15:26:40 2008 +0800
master:001
[rocrocket@abc rebase]$ cat roc.c
int main()
{
printf(“topic :002″);
printf(“topic :001″);
printf(“master:001″);
printf(“master:002″);
printf(“master:003″);
printf(“master:004″);
return 0;
}
[rocrocket@abc rebase]$
看到了吧！master分支刚才开发的master:003和master:004也已经悄悄的进入了topic分支的日志里了。而在roc.c文件中也已经有了相应的开发代码。
这下，你是不是有一种豁然开朗的感觉？呵呵 来，看一下分支结构图：
master:001 --- master:002 --- master:003 --- master:004---topic:001 --- topic:002 （topic）
master:001 --- master:002 --- master:003 --- master:004(master)
这就是git-rebase的魔力！看出神奇之处了么？
如果忘了，就对比一下。这是执行git-rebase之前的分支结构图：
      topic:001 --- topic:002 （topic） / master:001 --- master:002 --- master:003 --- master:004 (master)
```
