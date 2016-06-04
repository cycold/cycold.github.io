http://www.cnblogs.com/wangkangluo1/archive/2012/04/12/2444948.html


索引

跳转
undo
代码折叠
缓冲区
标签
文件打开与保存
插入
光标移动
复制粘贴删除
缩进
查找替换
bookmarks
ctags
bash
自动补全
分屏
diff
其他
 

跳跃指令 (jumps)
跳跃指令类似于游览器中的<前进><后退>按钮
CTRL-] -> 跟着link/tag转入 (follow link/tag)
CTRL-o -> 回到上一次的jump (go back)
CTRL-i -> 跳回下一个 (go forward)
:ju -> 显示所有的可以跳跃的地方 (print jump list)

 

重做/回复
u -> undo
CTRL-r -> redo
vim的undo是树结构的，你可以回到这个结构中的任何地方
:undo 2 -> undo 到结构的2层 (undo to tree 2)
:undolist -> 显示所有的undo列表 (show undo list)
:earlier 10s -> undo到10秒前的编辑 (undo to 10 seconds ago)
:earlier 10h -> undo到10小时前的编辑 (back to 10 hours ago)
:earlier 1m -> undo到1分钟前 (back to 1 minutes ago)
下面是undo的tree结构的解释
………..one
…………. |
……..change 1
…………. |
………one too
………. /……..\
…..change 2 ……. change 3
………… | ………………… |
…….one two ………. me too
……….. |
….. change 4
………..|
…… not two

 

代码折叠

1. 折叠方式 
可用选项 'foldmethod' 来设定折叠方式：set fdm=*****。
有 6 种方法来选定折叠：
          manual           手工定义折叠
          indent             更多的缩进表示更高级别的折叠
          expr                用表达式来定义折叠
          syntax             用语法高亮来定义折叠
          diff                  对没有更改的文本进行折叠
          marker            对文中的标志折叠
注意，每一种折叠方式不兼容，如不能即用expr又用marker方式，我主要轮流使用indent和marker方式进行折叠。

使用时，用：set fdm=marker 命令来设置成marker折叠方式（fdm是foldmethod的缩写）。
要使每次打开vim时折叠都生效，则在.vimrc文件中添加设置，如添加：set fdm=syntax，就像添加其它的初始化设置一样。

2. 折叠命令
选取了折叠方式后，我们就可以对某些代码实施我们需要的折叠了，由于我使用indent和marker稍微多一些，故以它们的使用为例：
如果使用了indent方式，vim会自动的对大括号的中间部分进行折叠，我们可以直接使用这些现成的折叠成果。
在可折叠处（大括号中间）：
zc      折叠
zC     对所在范围内所有嵌套的折叠点进行折叠 
zo      展开折叠
zO     对所在范围内所有嵌套的折叠点展开
[z       到当前打开的折叠的开始处。
]z       到当前打开的折叠的末尾处。
zj       向下移动。到达下一个折叠的开始处。关闭的折叠也被计入。
zk      向上移动到前一折叠的结束处。关闭的折叠也被计入。

当使用marker方式时，需要用标计来标识代码的折叠，系统默认是{{{和}}}，最好不要改动之：）
我们可以使用下面的命令来创建和删除折叠：
zf      创建折叠，比如在marker方式下：
                   zf56G，创建从当前行起到56行的代码折叠；
                   10zf或10zf+或zf10↓，创建从当前行起到后10行的代码折叠。
                   10zf-或zf10↑，创建从当前行起到之前10行的代码折叠。
                   在括号处zf%，创建从当前行起到对应的匹配的括号上去（（），{}，[]，<>等）。
zd      删除 (delete) 在光标下的折叠。仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
zD     循环删除 (Delete) 光标下的折叠，即嵌套删除折叠。
          仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
zE     除去 (Eliminate) 窗口里“所有”的折叠。
          仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。

关于vim的代码折叠，小弟也是初学，仅做参考。

 

* zo 将当前折叠打开
* zc 折叠光标所在处
* zr 打开所有折叠层次（依层次打开）
* zm 折叠所有层次（依层次折叠）
* zR 打开所有折叠  zn
* zM 折叠所有      zN
* zi 切换折叠与不折叠指令


 

缓冲区

* vim file1 file2 多个文件调入缓冲
* :e filename 在vim中再打开文件
* :ls 列出所有的缓冲区
* :n 编辑下一个文件
* :bp 跳转到上一个缓冲区
* :bn 跳转到下一个缓冲区
* :bN 跳转到指定编号的缓冲区:b3
* :bd1 删除编号为1的缓冲区

 

标签

* :tabnew 打开新标签页.
* :tabe <file> 在新标签页打开文件.
* <ctrl> + PageUp, PageDown 切换标签页.
* :tabnext, tabprev 切换标签页，Putty 下只能用这个.

 

文件打开保存

* :e <file> 打开文件.
* :enew 新文件.
* :w 保存.
* :wa 全部保存.
* :w <file> 另存为.
* :wq 保存并退出.
* :q 退出.
* :qa 全部退出.
* :q! 强制退出.
* ZZ 退出vim并保存文档

 

快捷插入

* esc 切换命令模式 (距离太遥远了，用 Ctrl+C 代替吧).
* i 插入模式.
* I 在当前行开头插入.
* R 替换模式.
* a 在光标后插入.
* A 在当前行尾部插入.
* o 将在光标所在行下面加入一行，并进入编辑模式。
* O 将在光标上面加入一行,注意是大写。
* v Visual 模式按字符选择.
* V Visual 模式按行选择.

 

光标移动

h 左移光标.
j 下移光标.
k 上移光标.
l 右移光标.
gg 将光标移到文件头部.
G 将光标移到文件尾部.
#G 移动光标到指定行#. 例如: 5G
% 跳转到配对的括号去
[[ 跳转到代码块的开头去(但要求代码块中’{‘必须单独占一行)
gD 跳转到局部变量的定义处
” 跳转到光标上次停靠的地方, 是两个’, 而不是一个”
mx 设置书签,x只能是a-z的26个字母
`x 跳转到书签处(“`”是1左边的键)
fx：移动光标到当前行的下一个 x 处。很明显，x 可以是任意一个字母，而且你可以使用 ; 来重复你的上一个 f 命令。
tx：和上面的命令类似，但是是移动到 x 的左边一个位置。（这真的很有用）
Fx：和 fx 类似，不过是往回找。
 

w : 向后词移动　（前面加数字移动多少个词）
b : 向前词移动　（前面加数字移动多少个词）
e : 向后移到词末
ge : 向前移到词末
 

0：移动光标到当前行首。
^：移动光标到当前行的第一个字母位置。
$：移动光标到行尾。
)：移动光标到下一个句子。
( ：移动光标到上一个句子
tx : 向右查找本行的x并移到那儿（大写时向左）
33G : 移到文件的第33行
gg : 文件首行
G : 文件尾行
33% : 文件的33%处
H/M/L : 屏幕的首/中/尾行
zt/zz/zb : 当前行移到屏幕的首/中/底部
 

复制粘贴删除
 yy 拷贝当前行到剪贴板.
nyy 复制从当前行开始的n行
 y^ 从文件头开始拷贝.
 y$ 拷贝到文件尾部.
 :#,&y 拷贝 # 到 & 行. 例如: 4,5y
 p 在光标后粘贴.
 P 粘贴到光标前.
 dd 删除当前行.
 d^ 删除到行首.
 d$ 删除到行尾.
 :#,&d 删除 # 到 & 行. 例如: 3,5d
D 当前光标开始删除到行尾
ndd 从当前行开始向后删除n行
d1G 删除第1行到当前行的数据
dnG 删除第n行到当前行的数据
dG 删除当前行到最后一行的数据
x 向后删除1个字符
nx 向后删除n个字符
X 向前删除1个字符
 


缩进
  >> 增大缩进.
  << 减少缩进.
  == 自动缩进.

 

查找替换

/# 查找 #. 例如: /printf
?# 反向查找 #.
n 查找下一个.
N 反向查找下一个.
:s/old/new/g 当前行无提示替换.
:%s/old/new/g 无提示替换.
:%s/old/new/gc 确认替换.
:#,&s/old/new/g 从 # 到 & 行无提示替换.
*  查找光标所在单词
 

书签跳转

* :marks 查看所有书签, 输入 “:<num>” 可跳转.
* m<name> 定义书签, 如 ma 在当前行定义名为 a 的书签.
* `<name> 跳转到某书签, “`” 为键盘 Tab 上一行第一键.
* :jumps 查看所有跳转记录, 输入 “:<num>” 可跳转.
* <ctrl> + o 返回上一次跳转处.
* <ctrl> + i 和 <ctrl> + o 反向转处.

 

Ctags

* :! ctags -R . 生成 ctags 文件.
* <ctrl> + ] 查看函数定义.
* <ctrl> + T 返回.
* shift + k 查看函数 man 帮助信息.

 

 

cmd

* ! <command> 执行命令.
* :r <file> 插入文件内容.
* :r !<command> 插入命令输出结果.
* :cd <path> 修改默认工作目录.

 

自动补全

Ctrl+X Ctrl+L整行补全

Ctrl+X Ctrl+N 根据当前文件里关键字补全

Ctrl+X Ctrl+K 根据字典补全

Ctrl+X Ctrl+T 根据同义词字典补全

Ctrl+X Ctrl+I 根据头文件内关键字补全

Ctrl+X Ctrl+] 根据标签补全

Ctrl+X Ctrl+F 补全文件名

Ctrl+X Ctrl+D 补全宏定义

Ctrl+X Ctrl+V 补全vim命令

Ctrl+X Ctrl+U 用户自定义补全方式

Ctrl+X Ctrl+S 拼写建议

 

分屏

分屏启动Vim    注释: n是数字，表示分成几个屏。

vim -On file1 file2 …     使用大写的O参数来垂直分屏。

vim -on file1 file2 …   使用小写的o参数来水平分屏。

Ctrl+W c   关闭分屏  关闭当前窗口。

Ctrl+W q    关闭当前窗口，如果只剩最后一个了，则退出Vim

     分屏

Ctrl+W s        上下分割当前打开的文件。

:sp filename    上下分割，并打开一个新的文件。

Ctrl+W v    左右分割当前打开的文件。

:vsp filename    左右分割，并打开一个新的文件。

    移动光标    Vi中的光标键是h, j, k, l，要在各个屏间切换，只需要先按一下Ctrl+W

Ctrl+W l     把光标移到右边的屏。

Ctrl+W h    把光标移到左边的屏中。

Ctrl+W k    把光标移到上边的屏中。

Ctrl+W j    把光标移到下边的屏中。

Ctrl+W w    把光标移到下一个的屏中。.

   移动分屏    这个功能还是使用了Vim的光标键，只不过都是大写。当然了，如果你的分屏很乱很复杂的话，这个功能可能会出现一些非常奇怪的症状。

Ctrl+W L    向右移动。

Ctrl+W H    向左移动

Ctrl+W K    向上移动

Ctrl+W J    向下移动

   屏幕尺寸    下面是改变尺寸的一些操作，主要是高度，对于宽度你可以使用Ctrl+W <或是>，但这可能需要最新的版本才支持。

Ctrl+W =    让所有的屏都有一样的高度。

Ctrl+W +    增加高度。

Ctrl+W -    减少高度。

ctrl+w >    向右扩展

ctrl+w <    向左扩展

 

 diff 模式

  参考

比较 A ， B 文件， vim – d A B 或者这样

或先打开文件 A，然后 :vsp（全名vsplit） 打开 B，然后输入命令 :diffthis

或 vimdiff   FILE_LEFT FILE_RIGHT

]c 跳转到下一差异点

[c 反向跳转

 

上下文折叠 参考

默认情况下，vimdiff会将文件中不同之处上下6行之外的相同文本折叠隐藏，可通过 :set diffopt=context:3 修改显示的上下文行数。

zo 打开折叠

zc 关闭折叠

文件合并

dp 将当前窗口光标位置处的内容复制到另一窗口

do 将另一窗口光标位置处的内容复制到当前窗口

diffupdate 重新比较两个文件，如果手动修改文件的话有时不会自动同步

 

 

 

其他

gg=G 源码格式化

:e! 强行重新编辑
shift insert 从系统拷贝到vim
u 撤销上一步操作.
U 撤销最后编辑的行上的操作
* . 重做.