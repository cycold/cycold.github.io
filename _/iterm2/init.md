Mac中的shell没有linux下的tree命令,可以通过brew安装
`brew install tree`
使用tree注意目录遍历层级.显示第一层
`tree -L 1`
为了防止使用直接使用tree遍历所有目录,将其在.zshrc设置别名,这样默认只遍历当前目录.
使用zsh的一些别名
```
# Set aliases
alias cls="clear"
alias ll="ls -l"
alias la="ls -a"
alias tree="tree -L 1"
```
当使用 `cd d`进入却不是`d`目录,而是其他的目录,这是可能就是`d`被设置了路径别名
使用`alias`命令查看`d`设置了哪些路径别名


#### mac上解决iterm2乱码问题


mac上解决iterm2乱码问题
在mac os上用iterm2作为默认ssh客户端很久了，
但是在ssh远程登录linux服务器中文乱码问题一直困扰着我，
今天终于抽时间搞定了这个乱码问题。
使用iterm2作为ssh客户端要解决中文乱码问题需要修改两个地方。

一是iterm2的Profiles本身要选择Unicode(UTF-8)

二是要修改openssh client的字符集，
`sudo vim /etc/ssh_config`
修改`SendEnv LANG LC_ALL=en.US.UTF-8`

三. OK，然后关闭iterm2重新打开再看下是否还乱码，如果还有问题，
设置下linux服务器的字符集，直接敲如下命令：  `LANG="en_US.UTF-8"`
