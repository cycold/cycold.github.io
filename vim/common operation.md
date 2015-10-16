vim 一些命令字符的单词：
```
d: delete
c: change
y: yank(copy)
i: insert inside
v: visually select
a: append around
e: end
w: word
b: back block
s: sentence
): sentence(another way of doing it)
p: paragraph
}: paragraph(another way of doing it)
t: tag(think html)
```

#### 文件保存／退出
- 保存退出  
    `:w` 保存不退出  
    `:wq` `:x` `ZZ`保存退出
- 退出不保存 
    `:q!`
- 保存文件到某目录  
    `:saveas ~/some/path/`

#### 删除(相当于剪切)
- 对单词的删除    
    删除的是单词的一部分(当光标在单词中间时)或者全部(当光标在单词开头或者结尾)，要看光标所在位置    
    `dw` good book don't hello
    从光标处开始删除字符(包含光标处的字符)一直到下一个单词开头（包含单词后的空白字符）  
    `d3w`   往右删除3个单词(要看光标位置,也是从光标处开始删除) 
    `de`    从光标处删除到本单词末尾    
    `dE`    从光标处删除到本单词末尾包括标点在内  
    `db`    从光标处删除到本单词开头    
    `dB`    从光标处删除到本单词开头包括标点在内  
    删除的是整个单词（）  
    `diw`   删除光标上的单词 (不包括单词后空白字符)   
    `d2iw`  删除2个单词（包括光标所在的单词以及下一个单词,不包括单词后空白字符） 
    `daw`   删除光标上的单词 (包括空白字符)   
    `d2aw`  删除2个单词（包括光标所在的单词以及下一个单词,包括单词后空白字符）  
- 对行的删除 
    `dd`    删除光标当前行 
    `d3j`   向下删除3行 = `3dd`  
    `d3k`   向上删除3行，一共删除4行（包括光标所在行,然后还要再向上3行，所以这个一共是4行）  
    `dG`    删除光标后的所有行（包括光标所在的行） 
    `dgg`   删除光标前的所有行（包括光标所在的行） 
    `d$` `D`   从光标处删除到行末    
    `d0`    从光标处删除到行开头（包括tab缩进） 
    `d^`    从光标处删除到行开头（不包括tab缩进）    
    `d3H`   只保留整个文件前3行，其余行全都删除  
- 对字符的删除    
    `x` `dl` 删除光标所在处字符  
    `X` 删除光标所在前字符   
    `d3h`   向右删除3个字符（不包括光标所在的字符）    
    `d3l`   向左删除3个字符（不包括光标所在的字符）    
    `dfx`   从光标处往右删除到第一个'x'字符间的字符(包括x字符,字符区分大小写) 
    `d2fx`   从光标处往右删除到第一个'x'字符间的字符(包括x字符,字符区分大小写) 
    `dtx`   从光标处往右删除到第一个'x'字符间的字符(不包括x字符,字符区分大小写) 
    `d2tx`   从光标处往右删除到第一个'x'字符间的字符(不包括x字符,字符区分大小写) 
    －－注：F，T大写为向左删除
- 对标点符号之间的字符的删除
    `di` + 标点符号 `di'`,`di"`,`di(`... 对引号，括号之间的字符删除（不包括引号本身） 
    `da` + 标点符号 `da'`,`da"`,`da(`... 对引号，括号之间的字符删除（包括引号本身）  
- 对块的删除
    `dis`    删除内含句子    
    `das`    删除一个句子    
    `dib`    删除内含 '(' ')' 块 
    `dab`    删除一个 '(' ')' 块 
    `dip`    删除内含段落    
    `dap`    删除一个段落    
    `diB`    删除内含 '{ ' ' }' 大块
    `daB`    删除一个 '{ ' ' }' 大
- 按照行号删除
    `d13G` 以当前光标所在行的行号为参考，向上或者向下删除到行号13之间的内容

> **注：** 将以上的删除命令`d` 改为 `c` 就会在删除后自动变为插入模式了，这个是实际使用非常多的操作。

#### 复制（注意一般不在系统的粘贴板中，vim有自己的粘贴内存）
- 对单词的复制    
    `yaw`   复制光标所在的单词（包括单词后面的空白字符）  
    `yiw`   复制光标所在的单词（不包括单词后面的空白字符） 
- 对行的复制 
    `yy`    复制当前行   
    `y3j`   向下复制3行（包含光标所在的行）＝ `3yy` 
    `y3k`   向上复制3行，一共4行（包行所标所在行然后再向上复制3行，所以一共四行）    
- 对字符的复制    
    `y3h`   从光标处开始向左复制3个字符（不包括光标所在的字符）  
    `y3l`   从光标处开始向右复制3个字符（不包括光标所在的字符）  
    `y0`    从光标处开始复制一直到本行的开头（不包括光标所在的字符）    
    `y^`    从光标处开始复制一直到本行的开头（不包括光标所在的字符,也不包括行开头的空白字符）   
    `y$`    从光标处开始复制一直到本行的末尾(包含末尾的空白字符) 
- 对标点符号之间的字符的复制：    
    `yi` + 标点符号 `yi'`,`yi"`,`yi(`... 对引号，括号之间的字符复制（不包括引号本身） 
    `ya` + 标点符号 `ya'`,`ya"`,`ya(`... 对引号，括号之间的字符复制（包括引号本身)    
- 按照行号复制
    `y13G` 以当前光标所在行的行号为参考，向上或者向下复制到行号13之间的内容

#### 移动
- 多行的移动 
    `ctrl + f` `ctrl + b` 向前或者向后滚动  
    `gg` 滚动大首行  
    `G` 滚动到末行   
    `33G` `33gg` 滚动到具体行（33行）    
    `3k` 向上移动3行(不包括当前行) 
    `3j` 向下移动3行（不包括当前行） 
    `0` 移动到行首（包括空白字符，绝对的行首） 
    `^` 移动到行手（不包括空白字符）  
    `$` 移动到行末（包括行末的空白字符）    
    `+` 移动到下一行开头    
    `-` 移动到上一行开头    
- 单词的移动 
    `w` 向右移动一个单词，光标始终位于下一个单词的开头，大写`W`会忽略标点符号    
    `b` 向左移动一个单词，光标始终位于上一个单词的开头 ，大写`B`会忽略标点符号   
    `e` 向左移动一个单词，如果光标处在一个单词的中间，那么就会移动到本单词的末尾，否则会始终移动到单词的末尾，大写`E`会忽略标点符号。    
- 行内的移动 f, t, F, T 
    `fs` 移动到光标右边的第一个's'字符上 
    `Fs` 移动到光标左边的第一个's'字符上 
    `tx` 移动到光标右边第一个'x'字符的前面 
    `Tx` 移动到光标左边第一个'x'字符的前面 
    `3fx` 表示移动到光标右边的第3个'x'字符上 
    `;`  命令重复前一次输入的f, t, F, T命令
    `,`  命令会反方向重复前一次输入的f, t, F, T命令 这两个命令前也可以使用数字来表示倍数
- 屏幕中的移动(High,Middle,Last)  
    `H` 移动到屏幕顶端的行   
    `M` 移动到屏幕中央的行   
    `L` 移动到屏幕底端的行   
    `3H` 移动到屏幕顶端往下的第3行  
    `3L` 移动到屏幕顶端往上的第3行  
- 对字符的移动    
    `h` `j` `k` `l` 
    `3h` `3j` `3k` `3l` 
- 对标点符号内的移动 
    `t + 标点符号` `t"` 移动到下一个双引号   

#### 修改(插入)（对于使用`d`,`y`的命令都可以替换成`c`,然后会自动进入插入模式）    
- 对行的修改 
    `c$` `C`  从光标处(包含光标处)删除到行末，然后进入插入模式(change)     
    `c0` 从光标处(不包含光标处)删除到行首，然后进入插入模式 
    `S` `cc` 删除整行从头修改   
    `s` 删除光标所在位置的字符，然后插入    
    `r` 替换光标处的字符，依然还是命令模式   
    `R` 从光标处开始替换多个字符，依然还是命令模式   
    `A` 从行末开始插入（append） 
    `I` 从行首开始插入（insert before）  

#### 对标点符号间的修改(单引号 双引号 括号 中括号 大括号 尖角号)
- 修改 'giiood boo'k don't hello good good    
    `ci'` `ci"` `ci(` `ci[` `ci{` `ci<`     对这些标点符号间的内容修改   
    `di'` `di"` `di(`或者`dib` `di[` `di{`或`diB` `di<`    分别删除这些配对标点符号中的文本内容  
    `yi'` `yi"` `yi(` `yi[` `yi{` `yi<`     分别复制这些配对标点符号中的文本内容  
    `vi'` `vi"` `vi(` `vi[` `vi{` `vi<`     分别选中这些配对标点符号中的文本内容  

> **注：** 另外如果把上面的`i`改成`a`可以连配对标点符号一起操作