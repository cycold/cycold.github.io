**插件失效**
发现`package control`插件突然消失了,打开配置文件,查看`ignore package`字段中有没有包含这个插件.
一般sublime text升级或者`package control`自动升级后,或者一些插件自动升级后,会被sublime自动加入到忽略的包字段中,
当某插件不起作用时,注意查看这个配置文件字段.

-------------------------------------------------------------------------------

**安装主题(主题有错)**
安装了某一个主题后,发现主题切换失效:
重名名`user`文件夹,使其找不到,之后`sublime`就会自动恢复默认.
或者有时关掉打开的文件,然后重新打开...即可

-------------------------------------------------------------------------------

**中文输入回车换行问题**
中文输入法下,在使用内联注释符`//`下,输入英文单词,按回车键,会自动切换到下一行,同时自动在新行前面增加`//`.
这对在进行中文输入时,偶尔需要输入个别英文单词很不友好.
其实这是插件`DocBlokr`的默认配置.打开其配置文件:

```
// If true, then pressing enter while in a double-slash comment (like this one)
// will automatically add two slashes to the next line as well
  "jsdocs_extend_double_slash": true,  // 设置为false,默认设置对目前我的中文输入不友好
```

-------------------------------------------------------------------------------

**替换默认的Dock图标**
`open /Applications/Sublime Text.app/Contents/Resources`
Find the file `Sublime Text.icns` and replace with the one from this repository. 
The name needs to remain exactly the same.
