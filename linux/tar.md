tar 参数: 
```
-c ：create 建立压缩档案的参数；  
-x ： 解压缩压缩档案的参数；  
-z ： 是否需要用gzip压缩；  
-v： 压缩的过程中显示档案；  
-f： 置顶文档名，在f后面立即接文件名，不能再加参数
```

一，将整个/home/www/images 目录下的文件全部打包为 /home/www/images.tar
`tar -cvf /home/www/images.tar /home/www/images`        ← 仅打包，不压缩
`tar -zcvf /home/www/images.tar.gz /home/www/images`    ← 打包后，以gzip压缩

> 在参数f后面的压缩文件名是自己取的，习惯上用tar来做，如果加z参数，
> 则以tar.gz 或tgz来代表gzip压缩过的tar file文件

将tgz文件解压到指定目录(前提是指定目录要存在)
`tar zxvf test.tgz -C 指定目录`
比如将/source/kernel.tgz解压到  /source/linux-2.6.29 目录
`tar  zxvf  /source/kernel.tgz  -C /source/ linux-2.6.29`

2 将指定目录压缩到指定文件
 
比如将linux-2.6.29 目录压缩到  kernel.tgz

`tar czvf kernel.tgz linux-2.6.29`


```
linux下tar命令解压到指定的目录 ：
#tar zxvf /bbs.tar.zip -C /zzz/bbs 
//把根目录下的bbs.tar.zip解压到/zzz/bbs下，前提要保证存在/zzz/bbs这个目录 
这个和cp命令有点不同，cp命令如果不存在这个目录就会自动创建这个目录！
附：用tar命令打包
例：将当前目录下的zzz文件打包到根目录下并命名为zzz.tar.gz
#tar zcvf /zzz.tar.gz ./zzz
---------------------------------------------------------------------------------------
tar 解压缩命令
tar
-c: 建立压缩档案
-x：解压
-t：查看内容
-r：向压缩归档文件末尾追加文件
-u：更新原压缩包中的文件
这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。
-z：有gzip属性的
-j：有bz2属性的
-Z：有compress属性的
-v：显示所有过程
-O：将文件解开到标准输出
下面的参数-f是必须的
-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。
# tar -cf all.tar *.jpg
这条命令是将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名。
# tar -rf all.tar *.gif
这条命令是将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件的意思。
# tar -uf all.tar logo.gif
这条命令是更新原来tar包all.tar中logo.gif文件，-u是表示更新文件的意思。
# tar -tf all.tar
这条命令是列出all.tar包中所有文件，-t是列出文件的意思
# tar -xf all.tar
这条命令是解出all.tar包中所有文件，-x是解开的意思
压缩
tar –cvf jpg.tar *.jpg //将目录里所有jpg文件打包成tar.jpg
tar –czf jpg.tar.gz *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
tar –cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
tar –cZf jpg.tar.Z *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux
zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux
解压
tar –xvf file.tar //解压 tar包
tar -xzvf file.tar.gz //解压tar.gz
tar -xjvf file.tar.bz2 //解压 tar.bz2
tar –xZvf file.tar.Z //解压tar.Z
unrar e file.rar //解压rar
unzip file.zip //解压zip
总结
1、*.tar 用 tar –xvf 解压
2、*.gz 用 gzip -d或者gunzip 解压
3、*.tar.gz和*.tgz 用 tar –xzf 解压
4、*.bz2 用 bzip2 -d或者用bunzip2 解压
5、*.tar.bz2用tar –xjf 解压
6、*.Z 用 uncompress 解压
7、*.tar.Z 用tar –xZf 解压
8、*.rar 用 unrar e解压
9、*.zip 用 unzip 解压
```
