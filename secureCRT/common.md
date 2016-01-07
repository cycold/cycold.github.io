### 设置utf8字符集
`Preferences-General-Default Session-Terminal-Appearance-Character encoding`;

### 如果需要使用自定义主题
不要选择: `Emulation - Terminal - Use color scheme`


http://blog.csdn.net/zklth/article/details/8937905
### 配色:
`rgb(0, 43, 53)` - bg (第一个) #002B35
`rgb(131, 148, 150)` -fg(倒数第一个) #839496

文件夹颜色(第5个)
normal: rgb(255, 255, 128) #FFFF80
bold: rgb(128, 128, 255) #8080FF

压缩文件(第2个)
normal: rgb(128, 128, 0) #808000


设置字体
Options => Global Options=>General=> default session
=> Edit default => Appearance =>Font

font style不要选择粗体,选择常规即可
Consolas `Regular` 14pt
Consolas 或者 Courier New 这两种字体都不错.

#### secureCRT 在mac下不能记住密码: 
`(comman + ,) 打开设置, 去掉 Use Keychain`

#### secureCRT自动登录跳板机:
session options --> Connection --> Logon Actions --> 
```
http://jingyan.baidu.com/article/c1a3101e87a0cede656deb2a.html
下面的ogin表示的是要登录的远程机器名。注意勾选自动登录选项后add或者edit、delete按钮才是可点击的
ogin和assword必须这样用，比如改成login或者password不生效
```
