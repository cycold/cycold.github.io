#### 常用命令
-----------------------------------------------------------------
查看系统支持的shell
`cat /etc/shells`
根据进程名(pname)获取pid,反之获取进程名
`ps -ef | grep pname`
`ps aux | grep pname`
`pgrep -lf pname`
通过端口号,查看其进程,port为端口,注意端口号前面一半有:
`lsof -i :portnumber`
显示有哪些进程正在监听哪些端口(Good)
`lsof -i | grep LISTEN`
` lsof -i -P | grep -i "listen"`
如果想查看其他用户的 加上sudo
`suod lsof -i | grep LISTEN`
或者写上进程名
`lsof -i | grep mongod`
通过进程名杀死进程
`pkill pname`
`killall pname`
使用!(感叹号)取回命令最近使用的参数
`!ps`
使修改的配置文件马上生效
`source configname`
解压tar.gz文件
`tar zxf *.tar.gz`
`tar zxfv *.tar.gz`
Mac查看日历
`cal`
`cal 10 2015 `
复制文件内容到剪贴板(内存)
`pbcopy < ~/.ssh/id_rsa.pub`
读取剪贴板并显示
`pbpaste`
查看zsh支持的别名
`alias`
切换到最近的目录
`cd -1`,
`cd -2`,
`cd -3`,
......
`cd -4`
这些命令由oh-my-zsh设置了常用别名,如下
```
...=../..
....=../../..
.....=../../../..
......=../../../../..
1='cd -'
2='cd -2'
3='cd -3'
4='cd -4'
5='cd -5'
6='cd -6'
7='cd -7'
8='cd -8'
9='cd -9'
_=sudo
md='mkdir -p'
please=sudo
... ...
更多别名使用alias命令查看
```

查看目录大小的命令
```
＃查看当前目录大小
du -sh *
du -d 0 -s -h
du -shc
# 查看指定目录大小
du -sh 目录名
具体使用参考帮助：man du
```

#### 命令解释
**tar [-cxtzvf] 文件与目录**
参数：
-c : 创建一个压缩文件(create)
-x : 提取一个压缩文件(extract)
-t  : 列出tar包里面的文件(list)
-z : 是否需要用 gzip 压缩
-v : 冗长输出(verbose)
-f  : 读取一个指定的归档文件或者将指定的文件归档为一个tar包
特别注意c/x/t 仅能存在一个不能同时存在,因为不可能同时压缩与解压缩。

范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar
```
[root@linux ~]# tar -cvf /tmp/etc.tar /etc               #仅打包,不压缩
[root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc        #打包后,打包(归档)后再使用gzip进行压缩
````
范例二：查阅上述 /tmp/etc.tar.gz 文件内有哪些文件
```
#由于使用 gzip 压缩，所以列出 tar 包内的文件时,需要加上z参数
[root@linux ~]# tar -ztvf /tmp/etc.tar.gz
```
范例三：将 /tmp/etc.tar.gz 文件解压缩在 /usr/local/src 底下
```
[root@linux ~]# cd /usr/local/src
[root@linux src]# tar -zxvf /tmp/etc.tar.gz
```

**find && grep**
Linux系统中grep命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹 配的行打印出来。grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。
而linux下的find
功能：在目录结构中搜索文件，并执行指定的操作。此命令提供了相当多的查找条件，功能很强大。
语法：find 起始目录 寻找条件 操作
说明：find命令从指定的起始目录开始，递归地搜索其各个子目录，查找满足寻找条件的文件并对之采取相关的操作。
所以简单点说说，**grep是查找匹配条件的行，find是搜索匹配条件的文件.**
```

grep:
```
# 通过管道过滤ls -l输出的内容，只显示以a开头的行
ls -l | grep '^a'
# 显示a.txt文件中包含test的行
grep 'test' a.txt
# 显示在aa，bb，cc文件中匹配test的行
grep 'test' aa bb cc
# 显示所有包含每个字符串至少有5个连续小写字符的字符串的行。
grep '[a-z]' aa
# 不区分大小写地搜索。默认情况区分大小写
grep -i pattern files
# 只列出匹配的文件名
grep -l pattern files
# 列出不匹配的文件名
grep -L pattern files
# 只匹配整个单词，而不是字符串的一部分(如匹配‘magic’，而不是‘magical’)
grep -w pattern files
# 显示匹配 pattern1 或 pattern2 的行
grep pattern1 | pattern2 files
```

find:
```
按照文件名查找文件。
# 在/dir目录及其子目录下面查找名字为filename的文件
find /dir -name filename
# 在当前目录及其子目录中查找任何扩展名为“c”的文件 '-ls'显示详细信息
find . -name "*.c" -ls
注意：-name是大小写敏感，想忽略大小写，使用-iname
按照文件的更改时间来查找文件- n表示文件更改时间距现在n天以内，+ n表示文件更改时间距现在n天以前
# 在系统根目录下查找更改时间在5日以内的文件
find / -mtime -5
# 搜索当前目录中,所有过去10分钟中更新过的普通文件,如果不加-type f参数 则搜索普通文件+特殊文件+目录
find ./ -type f -mmin -10
```

#### 其他
-----------------------------------------------------------------
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