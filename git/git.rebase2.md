https://segmentfault.com/q/1010000000430041

```
git rebase是对commit history的改写。当你要改写的commit history还没有被提交到远程repo的时候，也就是说，
还没有与他人共享之前，commit history是你私人所有的，那么想怎么改写都可以。

而一旦被提交到远程后，这时如果再改写history，那么势必和他人的history长的就不一样了。
git push的时候，git会比较commit history，
如果不一致，commit动作会被拒绝，唯一的办法就是带上-f参数，强制要求commit，
这时git会以committer的history覆写远程repo，从而完成代码的提交。虽然代码提交上去了，
但是这样可能会造成别人工作成果的丢失，所以使用-f参数要慎重。
```

所以使用`git rebase` 关键是提交历史要一致, 以远程仓库的提交历史为准
所以顺序是: 
所以，在不用-f的前提下，想维持树的整洁，方法就是：在git push之前，先git fetch，再git rebase。
```
git fetch origin master
git rebase origin/master   // 会将当前仓库的提交历史和更新下来的远程分支提交历史进行衍合
git push
```
