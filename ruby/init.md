更改ruby的镜像源:
```
$ gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
$ gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org
# 请确保只有 ruby.taobao.org
$ gem install rails
```

安装jekyll,注意mac中需要sudo:
`sudo gem install jekyll`
`sudo install rouge` // jekyll 代码语法高亮

```
/System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require': 
cannot load such file -- jekyll-redirect-from (LoadError)
```

出现以上的`cannot load such file -- jekyll-redirect-from (LoadError)` 是因为jekyll需要加载这里gem文件
所以需要使用gem安装:
`sudo gem install jekyll-redirect-from`
同理bootstrap目录下的`Gemfile`文件中的gem包都需要逐个安装.
`sudo gem install jekyll-sitemap`
`sudo gem install scss_lint`