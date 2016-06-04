http://www.jb51.net/article/49140.htm

References are not stored statically
http://www.php.net/manual/en/language.variables.scope.php#language.variables.scope.static
#####理解PHP中的stdClass类
相信大家跟我一样，会经常看到和下面很类似的PHP代码：
复制代码 代码如下:
`$user = new stdClass();`
`$user->name = 'gouki';`
这样的代码，这是干嘛用的呢？
翻开手册，搜索`stdClass`，你会发现，手册上几乎没有介绍，如果你再次搜索google，看到的也几乎全是英文解释。
其实，`stdClass`在PHP5才开始被流行。而`stdClass`也是zend的一个保留类。似乎没有其他作用。也几乎没有任何说明。
或者，我们可以这么理解：`stdClass`是PHP的一个基类，所有的类几乎都继承这个类，所以任何时候都可以被new，
可以让这个变量成为一个object。同时，这个基类又有一个特殊的地方，就是没有方法。
凡时用`new stdClass()`的变量，都不可能会出现`$a->test()`这种方式的使用。
或者，我们可以又这么理解一下，正因为PHP5的对象的独特性，对象在任何地方被调用，都是引用地址型的，
所以相对消耗的资源会少一点。在其它页面为它赋值时是直接修改，而不是引用一个拷贝。
例如：
复制代码 代码如下:

```php
$user = new stdClass();
$user->name = 'gouki';
$myUser = $user;
$myUser->name = 'flypig';
```

如果在PHP4时代，这样的代码就是在消耗系统资源。因为：
`$myUser = $user;`
这是创建了一个拷贝。所以，在PHP4的时候，都是这样使用：
复制代码 代码如下:

`$myUser = & $user;`

有人说，为什么不用数组呢？数组不是更方便吗？而且对于PHP这样的弱类型程序来说，用数组应该是最方便的。
确实。数组在程序的使用中应该是最方便的，然而数组的每次被引用（$a = $b），其实都是创建了一个副本，
而且，数组被unset后，还是占用了内存（这个是听人说来的，我没有测试……也不知道怎么测试，如果有人知道，请告诉我，谢谢 ）
不过SPL的标准类库里，还有一个函数arrayobject，可以直接将数组转化为对象这也是一个好办法哦。