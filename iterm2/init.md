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
