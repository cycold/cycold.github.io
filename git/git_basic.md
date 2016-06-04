
查看所有配置     
`git config --list` 

查看全局的配置    
`git config --global --list`  

查看具体的变量名       
`git config user.name`   

配置提交的用户名       
`git config --global user.name "xxxx"`      

配置提交的邮箱地址      
`git config --global user.email "xxxx@xxx.com"`

>  使用`git config --list`如果有看到重复的变量名,说明它们来自不同的配置文件,git会以最后一个为准.

以上设置的是git的环境变量,一般git的环境变量保存在以下三个地方:
>   使用`--system`选项,读写的是git安装目录下的`/etc/gitconfig`文件  
>   
>   `git config --system user.name "xxxx"`  
>   使用`--global`选项,读写的是系统用户目录下的`~/.gitconfig`文件   
>   
>   `git config --global user.name "xxxx"`  
>   没有使用任何选项,读写的就是当前仓库中的`.git/config`   
>   
>   `git config user.name "xxxx"`           
>   配置文件的优先级:当前的仓库中的配置文件优先级最高.这些配置都可以通过编辑配置文件`.gitconfig`来修改的.      

使用git创建repository,首先cd到项目目录下
>   初始化git仓库,此时会在目录下创建.git文件夹(windows需要开启显示隐藏文件)
>   `git init`
>   此时只是初始化了一个空的仓库,并没有添加具体的文件进入到git的版本追踪中.
>   
>   将项目所有的文件纳入到git追踪系统中
>   `git add .`
>   
>   或者添加某些具体的文件
>   `git add *.js`, `git add readme.md`
>   
>   以上的操作就会将项目中的文件纳入到git的版本追踪系统中,但是等更新了以上文件后,还是需要再一次使用`git add .`       
>   将现在更新过后的文件再次添加到git的追踪系统中(这里指的是git的暂存区域),如果使用了`git add .`命令后,有修改了文件,             
>   现在如果没有再次运行`git add .` 就直接提交`git commit -m "commit"`          
>   git只会提交你上一次运行`git add .`时的文件版本,而最新的更新的文件版本则不会提交,
>   所以git提交时,只会按stage中的最新版本提交.      

使用 `.gitignore` 配置文件忽略某些不需要追踪的文件    

```
# 此为注释 – 将被 Git 忽略
    #忽略所有 以.a或者.o 结尾的文件
    *.[oa]
    # 忽略所有 .a 结尾的文件
    *.a
    # 忽略所有以波浪符结尾的文件
    *~
    # 但 lib.a 除外
    !lib.a
    # 忽略所有的.sass-cache目录
    .sass-cache
    # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
    /TODO
    # 忽略 build/ 目录下的所有文件
    build/
    # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
    doc/*.txt
```
