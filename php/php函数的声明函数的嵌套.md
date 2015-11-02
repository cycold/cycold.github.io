js中,函数内部可以声明函数:
```js
function out(){
    console.log(1);
    function inner(){
        console.log(2);
    }
    inner();
} 
out();
out();
//inner();        // js报错
```

对比php:
```php
function out(){
    echo(1);
    function inner(){
        echo(2);
    }
    inner();    
} 
out();
//out();          //php报错 PHP Fatal error:  Cannot redeclare inner()
```

PHP很早就支持嵌套函数了。并是不PHP5.3有闭包时才有的。然而，它却不是象JS，AS那样的闭包嵌套。
即它的嵌套函数根本无闭包模式的逃脱。
PHP嵌套函数有一些特别之处。最特别的是，当外部函数被调用时，
`内部函数就会自动进入全局域中，成为新的定义函数`。
所以，当外部函数确保是被调用一次，不会被调用二次，那么，可以写嵌套函数在其中。否则，就会引发致命错误。
但若我们仍想在一个可被调用多次的函数中定义一个内部函数，那么，该如何处理？
我们象在全局定义函数一样使用：
```php
if (!function_exists('你的函数名')){
}
```

因此，全局函数的使用，常常用于一些特别的目的。同时要清楚，这样的函数，`实际就是定义的全局函数`
因此，它没有类对它封装，更没有命名空间。
```
<?php
function foo(){
  function bar(){
    echo "I don't exist until foo() is called.\n";
  }
}
/* 现在还不能调用bar()函数，因为它还不存在 */
foo();
/* 现在可以调用bar()函数了，因为foo()函数
   的执行使得bar()函数变为已定义的函数 */
bar();
//如果再次调用foo(); 会报错:PHP Fatal error:  Cannot redeclare bar() 不能重复声明函数
foo();
?> 
```

**`PHP 中的所有函数和类都具有全局作用域，可以在内部定义外部调用，反之亦然。`**
我们不妨先看一下函数：
```
function outer( $msg ) { 
    function inner( $msg ) { 
        echo 'inner: '.$msg.' '; 
    } 
    echo 'outer: '.$msg.' '; 
    inner( $msg ); 
} 
inner( 'test1' );  // Fatal error:  Call to undefined function inner() //是因为外部函数还没有调用，所以出错。
outer( 'test2' );  // outer: test2 inner: test2 
inner( 'test3' );  // inner: test3 
outer( 'test4' );  // Fatal error:  Cannot redeclare inner() 
//上面出错，是因为，外部函数被调用时，内部函数被重定义了。

这里，我们再看一下，一个自动加载类，其中的做法
static public function initAutoload(){

        //初始化Autoload Callable List
        self::setAutoloadCallableList();

        //初始化 $classList
        self::$classList = uxAutoloadConfig::getClassList();

        //如果有spl_autoload_register，则直接设置
        if (function_exists('spl_autoload_register')){
            ini_set('unserialize_callback_func', 'spl_autoload_call');
            spl_autoload_register(array('uxAutoload', 'splSimpleAutoload'));
        }elseif (!function_exists('__autoload')){  //否则要使用__autoload函数。
            ini_set('unserialize_callback_func', '__autoload');

            //因为没有spl_autoload, 所以, 这里要定义一个__autoload函数.
            function __autoload($class){
                if( self::splSimpleAutoload($class)== true)
                    return true;
                //因为没有spl_autoload_register，所以在类未加载成功时，要处理Callable List
                foreach(self::$autoloadCallables as $key => $callable ){
                    if (class_exists($class, false)){
                        $classObj=self::$autoloadObjectList[$callable[0]];
                    }else{
                        $className=$callable[0];
                        $classObj = new $className();
                        self::$autoloadObjectList[$class] = &$classObj;
                    }
                    if (method_exists($classObj,$callable[1])){
                        $method=$callable[1];
                        if ($classObj->$method($class)==true)
                            return true;
                    }else{
                        trigger_error('Autoload method '.$method.' not found in class '.$className.'!', E_USER_ERROR);
                        return false;
                    }
                }
            }
        }
    }
```

可以看出，嵌套函数，是一种有条件全局函数，你可以控制，在什么情况下提供这样的全局函数给用户使用。
但也需要注意，过多的全局函数则会产生“全局污染”，所以，不可多用。

