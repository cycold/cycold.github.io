wbstorm快速切换主题和代码颜色高亮主题:   
`View>Quick Switch Scheme` 快捷键 ctrl+`

改变光标所在行的背景色: 
`Preferences > Editor > Colors & Fonts > General > Caret Row`      
改变光标的背景色:
`Preferences > Editor > Colors & Fonts > General > Caret`
参考; http://stackoverflow.com/questions/9210494/where-to-change-colors-of-the-cursor-and-the-current-line

设置webstorm的代码高亮:   
有时不想要过多的代码高亮显示.一般的代码出现高亮显示就是错误,警告提示.  
这些都可以在一下这些设置项找到:  
`File->Settings>Editor>Colors & Fonts>General`(设置代码风格的高亮)

`File->Settings>Editor>inspections`(设置语法错误提示的显示颜色,一般都是波浪线)

在写angular的指令时,指令右边的expression即在引号里面的代码总是高亮的显示.  
为了去掉这个高亮的背景,设置了好长时间.最后发现这个是webstorm的   
`File->Settings` 中的 `Intentions` 中的 `Language Injection`功能.    
(有时代码的左边会出现一个小灯泡的图标,估计就是这个Language Injection)  
禁止掉`Language Injection`功能后,这个高亮的背景也就没有了.但是这禁止掉了这个功能.可不可以不禁止,从而去掉高亮的背景色呢??     
 
可以, 去`File->Settings>Editor>Colors & Fonts>General`中 搜索`Injected language fragment`,
将其右边的background的勾去掉即可    


webstrom 从路径中创建没有的文件:
`<script src="./lib/ionic/aa.js"></script>`
比如路径中没有aa.js文件,一般webstorm会报错提示,此时可以使用按键alt+enter,在弹出的对话框中选择创建这个文件:
参考:http://stackoverflow.com/questions/20771774/webstorm-shortcut-to-create-new-file-from-src     


webstorm自动补全:
https://www.jetbrains.com/webstorm/help/auto-completing-code.html     
由于基本的补全按键Ctrl + space与系统的输入法切换冲突.      
于是改为:`Ctrl + \`      
`File->Settings>keymaps 搜索: completion`
找到Basic 增加一个键映射`Ctrl + \`
之后比如路径的自动补全: `<script src="./lib/ionic/"></script>` 只要按下ctrl+\后,
相应路径下的目录文件就会倍列出来

webstorm的代码snippets.   
在sublimeText代码片段是以snippets形式,而在webstorm中叫做'live templates'    
要查看,修改,自定义增加live template   
参考webstorm的官方的帮助文档:      
https://www.jetbrains.com/webstorm/help     
https://www.jetbrains.com/webstorm/help/creating-and-editing-live-templates.html#d1321925e19    
`File->Settings 搜索:Live Templates`      
就会找到很多webstorm自带的代码模版,比如在Zen HTML中,可以找到:      
`a:mail` 按Tab键后,生成如下的代码结构       
<a href="mailto:$VAR0$">$END$</a>    
`meta:vp`     
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>     

禁止自动报错的波浪线提示:    
`File->Settings 搜索:Inspections`
比如要禁止sass的未知的mixin提示,将sass/scss前面的勾去掉即可.     
比如要禁止单词的拼写检查: 去掉Spelling的勾即可     

取消webstorm的单词拼写检查:       
`File->Settings` 搜索 `spelling`       
将所有的`Dictionaries`前面的勾都取消即可.     

webstorm中设置ctrl + 滚轮改变字体尺寸:     
`File->Settings->General` 或者搜索`zoom || Mouse Wheel`    
勾选:   
`Change font size(Zoom) with Ctrl + Mouse Wheel`   
同时在下面可以勾选;
`Use soft wraps in editor`     


webstrom在局域网中手机通过wifi访问配置:

在电脑上,webstrom默认是开启本地的63342端口.通过`localhost`或者`127.0.0.1`来访问.   
`http://localhost:63342/ionic/start/blank/myApp/www/index.html`
`http://127.0.0.1:63342/ionic/start/blank/myApp/www/index.html`    
但是在电脑上却不能通过其IP地址的形式访问.比如:    
`http://192.168.1.98:63342/ionic/start/blank/myApp/www/index.html`     
因为在局域网中,手机的浏览器中只能输入ip地址才可以访问.总不能输入`127.0.0.1`访问吧.    
所以首先得能够在电脑上访问:    
Google得知: 做如下设置:      
`File->Settings->` 搜索`debugger`或者`server`    
找到: `Debugger`  将`Can accept external connections`勾选即可.   
**会发现勾选后依然不能访问**     

Google得知:
>注意：在windows环境下，一般将端口设置为四位数才可以访问，具体原因可能是window对5位数的端口，对外IP访问是有限制的吧，仅仅猜测而已。  
参考: 
http://www.joosblog.com/2014/10/14/jie-jue-webstormzai-windowsxia-wifidiao-shi-wu-fa-fang-wen-wen-ti/

使用手机依然不能访问,但是可以通过电脑访问.
这又是`ESET`的个人防火墙问题了:
`高级设置` > `网络` > `个人防火墙` > `过滤模式` > `交互模式`
选择交互模式,只是暂时的,是为了自动的创建规则,之后会弹出对话框,选择允许webstorm相关的程序通讯即可,同时记得勾选创建规则.
之后再将`过滤模式` > `自动模式`
![qq 20150127164037](https://cloud.githubusercontent.com/assets/2446601/5915723/071176aa-a644-11e4-9185-344c66c9403b.png)


有时希望排除某些文件或者文件夹在项目目录中显示,比如`node_modules`目录,有时嵌套太深了,很占用内存.在webstorm中排除:    
File | Settings | File Types   
在`ignore file and folder`中输入你需要排除的文件或者文件名     
参考:     
http://blog.jetbrains.com/idea/2011/04/intellij-idea-does-not-show-some-files-know-the-hiding-places/    












