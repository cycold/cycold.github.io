#### 配置:
相关配置
`/etc/gitconfi` 系统中对所有用户都普遍适用的配置。若使用 git config 时用 --system 选项，读写的就是这个文件。
`~/.giconfig` 用户目录下的配置文件只适用于该用户。若使用 git config 时用 --global 选项，读写的就是这个文件。
`.git/config` 具体项目级别,这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，
所以 .git/config 里的配置会覆盖 /etc/gitconfig 中的同名变量。

查看系统环境配置:
`git config --list`
`git config --global --list` 查看用户配置文件中的所有选项
`git config --global user.name` 查看用户的提交用户名
`git config --system user.name` 查看系统中的的提交用户名(一个系统会有很多用户,如果没有配置项目和用户目录中的config,那么提交时就以这个为提交用户名)
`git config user.name`  首先查看当前项目中的配置文件,没有继续往用户目录中寻找(`~/.gitconfig`)
`git config user.email`
设置:
第一个要配置的是你个人的用户名称和电子邮件地址。
这两条配置很重要，每次 Git 提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录：
`git config --global user.name "John Doe"`
`git config --global user.email johndoe@example.com`
如果用了 `--global` 选项，那么更改的配置文件就是位于你用户主目录下的那个(`~/.gitconfig`)，
以后你所有的项目都会默认使用这里配置的用户信息。如果要在某个特定的项目中使用其他名字或者电邮，
只要去掉 `--global` 选项重新配置即可，新的设定保存在当前项目的 `.git/config` 文件里。

> 有时候会看到重复的变量名，那就说明它们来自不同的配置文件（比如 /etc/gitconfig 和 ~/.gitconfig），
> 不过最终 Git 实际采用的是最后一个。

获取git帮助:
`git help config` `git config --help`

为项目创建git仓库:
进入项目中:
`git init`  初始化后，在当前目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中
此时项目中的文件并没有被git纳入追踪系统中,需要使用命令告诉git该项目中哪些文件需要被git追踪.
`git add *.c` 将所有的c文件都加入到git的文件系统中,之后,git将会对这些文件追踪

或者是通过克隆的命令,创建一个git仓库
使用默认的目录名:
`git clone git://github.com/schacon/grit.git`
指定克隆下来的项目新的项目名
`git clone git://github.com/schacon/grit.git mygrit`
Git 支持许多数据传输协议。之前的例子使用的是 git:// 协议，不过你也可以用 http(s):// 或者 user@server:/path.git 表示的 SSH 传输协议。
我们会在第四章详细介绍所有这些协议在服务器端该如何配置使用，以及各种方式之间的利弊。

`git init` 初始化git

`touch a.js` 创建a.js文件,但是还没有被git 追踪,此时文件状态为:`untracked`

使用 `git add a.js`后, `a.js`状态变为:已追踪缓存 `staged`

使用 `git commit -m "提交a问件"` 此时`a.js`状态变为`unmodify`未修改状态(每一次commit都相当于给整个项目(.git文件系统)做一次快照)

`touch b.js` 创建b.js文件
同时修改a.js文件,
此时: b.js为`untracked` a.js为`修改状态`
那么此时如果使用`git commit -m '提交说明'` 命令,会发现没有任何效果
因为`git commit`命令会从暂存区和之前已经提交的文件快照作用一次差异运算,而此时的暂存区没有改变过.
因为即使这里添加了文件b.js,并且还修改了a.js文件,但是这些修改都没有反应到暂存区中,需要使用命令
`git add`将修改的文间加入到暂存区中,
所以这里如果需要将a.js的修改记录下来,首先需要保存到暂存区中,然后再将再存区中的内容和上次提交的快照做一次差异运算
使用`git commit`,此时将修改的a.js文件记录了下来;
但是b.js文件,依然还是没有被git记录(追踪)同样使用git add b.js追加到缓存区中,更新缓存区,使用git commit 提交缓存区
所以其实git 需要将文文件记录保存下来:每一次的文件的改变(修改,增加,删除) 都需要先更新暂存区,然后,使用git commit
命令,将之前的快照和当前的暂存区中的快照做差异运算,最后才保存到git的文件追踪系统中.
为什么需要使用看似多余的暂存区这一步呢? 
其实是为了对比对.暂存区代表最新的文件修改快照,它需要和上一次提交的文件快照作对比,来生成新的快照.
这一步就使用git commit命令.所以git commit 命令就是生成新的文件快照的.
git 就是通过文文件快照回滚的.

跳过使用暂存区域
尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。
Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，
给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：
`git commit -a -m '提交说明'` 
>注意: 这里最终提交的是都已经被追踪了的文件,如果是新创建的文件是不会被提交的

git文件移除:
直接使用命令删除了文件a.js
`rm a.js`, 
但是a.js已经纳入了git的版本管理中了
所以此时还需要从git版本中移除一下
`git rm a.js`  
`git status`此时告诉我们a.js已经被移除了,需要再次生成一次快照,来记录这一次的提交 
`git commit -m '删除a.js'`, 之后在正式的从git的版系统中删除了这个文件,但是这一次删除的行为已经被记录了下来(通过git commit).
```
n branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    deleted:    a.js
```

> 最后提交的时候，该文件就不再纳入版本管理了。如果删除之前修改过并且已经放到暂存区域的话，
> 则必须要用强制删除选项 -f（译注：即 force 的首字母），以防误删除文件后丢失修改的内容。

以上会把a.js文件从目录中彻底的删除,有时我们只是想从git中删除,并不想实际的删除:
另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。
换句话说，仅是从跟踪清单中删除。比如一些大型日志文件或者一堆 .a 编译文件，
不小心纳入仓库后，要移除跟踪但不删除文件，以便稍后在 .gitignore 文件中补上，用 --cached 选项即可：
`git rm --cached readme.txt`
后面可以列出文件或者目录的名字，也可以使用 glob 模式。比方说：
`$ git rm log/\*.log`
注意到星号 * 之前的反斜杠 \，因为 Git 有它自己的文件模式扩展匹配方式，
所以我们不用 shell 来帮忙展开（译注：实际上不加反斜杠也可以运行，只不过按照 shell 扩展的话，
仅仅删除指定目录下的文件而不会递归匹配。上面的例子本来就指定了目录，所以效果等同，
但下面的例子就会用递归方式匹配，所以必须加反斜杠。）。此命令删除所有 log/ 目录下扩展名为 .log 的文件。类似的比如：
` git rm \*~` 会递归删除当前目录及其子目录中所有 ~ 结尾的文件。

移动文件
不像其他的 VCS 系统，Git 并不跟踪文件移动操作。如果在 Git 中重命名了某个文件，
仓库中存储的元数据并不会体现出这是一次改名操作。不过 Git 非常聪明，它会推断出究竟发生了什么，
至于具体是如何做到的，我们稍后再谈。
既然如此，当你看到 Git 的 mv 命令时一定会困惑不已。要在 Git 中对文件改名，可以这么做：
`$ git mv file_from file_to`
其实，运行 git mv 就相当于运行了下面三条命令：
$ mv README.txt README
$ git rm README.txt
$ git add README
如此分开操作，Git 也会意识到这是一次改名，所以不管何种方式都一样。当然，直接用 git mv 轻便得多，
不过有时候用其他工具批处理改名的话，要记得在提交前删除老的文件名，再添加新的文件名
所以git会自动判断你的重命名动作
