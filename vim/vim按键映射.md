#### vim按键映射    
首先考虑使用帮助命令查看:   
`:h key-notation` 帮助命令也支持Tab补全  

使用`:map`命令，可以列出所有键盘映射,其中第一列标明了映射在哪种模式下工作

```
标记          模式
<space>     常规模式，可视化模式，运算符模式
n           常规模式
v           可视化模式
o           运算符模式
!           插入模式，命令行模式
i           插入模式
c           命令模式
```

```
 noremap 和 map的区别 http://vim.wikia.com/wiki/Avoid_the_escape_key
inoremap jj <esc>               "将jj按键映射为esc (只在插入模式下有效,i表示insert)
nnoremap B ^                    "将大写B映射为^键(只在常态模式下有效n表示normal)
nnoremap E $                    "将大写$映射为^键(只在常态模式下有效)
nnoremap $ <nop>                "取消$ 按键(只在常态模式下有效)
nnoremap ^ <nop>                "取消^ 按键(只在常态模式下有效)
nnoremap ff <C-f>               "设置在常态模式下,ff取代 ctrl + f 向下翻页
nnoremap bb <C-b>               "设置在常态模式下,bb取代 ctrl + b 向上翻页
```

```
<Esc>                           代表Escape键
<CR>                            代表Enter键
<F10>                           代表功能键
<D>                             代表Command键
<C>                             代表Ctrl键
<S>                             代表shift键
<A> <M>                         代表alt键
<A-f>                           代表alt + f
<C-b>                           代表ctrl + b 
<C-Esc>                         代表Ctrl + Esc
<S-F1>                          表示Shift + F1
... 以此类推...
```



使用:map!命令，则只列出插入和命令行模式的映射
而:imap，:vmap，:omap，:nmap命令则只是列出相应模式下的映射


取消键盘映射  
如果想要取消一个映射，可以使用以下命令：    
`:unmap <F10>`
注意：必须为:unmap命令指定一个参数。如果未指定任何参数，那么系统将会报错，而不会取消所有的键盘映射。

针对不同模式下的键盘映射，需要使用与其相对应的unmap命令。例如：使用:iunmap命令，取消插入模式下的键盘映射；而取消常规模式下的键盘映射，则需要使用:nunmap命令。

如果想要取消所有映射，可以使用:mapclear命令。请注意，这个命令将会移除所有用户定义和系统默认的键盘映  


