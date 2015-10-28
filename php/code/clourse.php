<?php
/**http://www.php-internals.com/book/?p=chapt04/04-04-anonymous-function
 * 说到匿名函数，就不得不提到闭包了，闭包是词法闭包(Lexical Closure)的简称，
 * 是引用了自由变量的函数， 这个被引用的自由变量将和这个函数一同存在，即使离开了创建它的环境也一样，
 * 所以闭包也可认为是有函数和与其相关引用组合而成的实体。 在一些语言中，在函数内定义另一个函数的时候，
 * 如果内部函数引用到外部函数的变量，则可能产生闭包。在运行外部函数时， 一个闭包就形成了。
 * 这个词和匿名函数很容易被混用:
 * 其实这是两个不同的概念，这可能是因为很多语言实现匿名函数的时候允许形成闭包。
 */


  // $func = create_function('', 'echo "Function created dynamic";');
  // echo $func; // lambda_1
   
  // $func();    // Function created dynamic
   
  // $my_func = 'lambda_1';
  //$my_func(); // 不存在这个函数
  //lambda_1(); // 不存在这个函数

  $func = create_function('', 'echo "\n-----Hello------\n";');
   
  $my_func_name = 'lambda_1';
  debug_zval_dump($func);         // string(9) "lambda_1" refcount(2)  // 实际上打印了一个不可见的字符`\0`lambda_1
  debug_zval_dump($my_func_name); // string(8) "lambda_1" refcount(2)
  var_dump($func);
  var_dump($my_func_name);
  echo $func;

  /**
   * 该函数在定义了一个函数之后，给函数起了个名字，它将函数名的第一个字符变为了'\0'也就是空字符， 
   * 然后在函数表中查找是否已经定义了这个函数，如果已经有了则生成新的函数名， 第一个字符为空字符的定义方式比较特殊， 
   * 因为在用户代码中无法定义出这样的函数， 也就不存在命名冲突的问题了，这也算是种取巧(tricky)的做法， 
   * 在了解到这个特殊的函数之后，我们其实还是可以调用到这个函数的， 
   * 只要我们在函数名前加一个空字符就可以了， chr()函数可以帮我们生成这样的字符串， 
   * 例如前面创建的函数可以通过如下的方式访问到:
   */
  
  $my_func = chr(0) . "lambda_1";
  $my_func(); // Hello

  /**
   * 这种创建"匿名函数"的方式有一些缺点:
   * 函数的定义是通过字符串动态eval的， 这就无法进行基本的语法检查;
   * 这类函数和普通函数没有本质区别， 无法实现闭包的效果.
   */
  
  /**
   * __invoke魔幻方法
   * 这个魔幻方法被调用的时机是: 当一个对象当做函数调用的时候， 如果对象定义了__invoke魔幻方法则这个函数会被调用， 
   * 这和C++中的操作符重载有些类似， 例如可以像下面这样使用:
   */
  class Callme {
      public function __invoke($phone_num) {
          echo "Hello: $phone_num";
      }
  }
   
  $call = new Callme();
  $call(13810688888); // "Hello: 13810688888

  //匿名函数的实现
  //前面介绍了将对象作为函数调用的方法， 聪明的你可能想到在PHP实现匿名函数的方法了， 
  //PHP中的匿名函数就的确是通过这种方式实现的。我们先来验证一下:
  $func = function() {
      echo "Hello, anonymous function";
  };
  echo "\n";
  echo gettype($func);    // object
  echo "\n";
  echo get_class($func);  // Closure
  echo "\n";

  // 原来匿名函数也只是一个普通的类而已。熟悉Javascript的同学对匿名函数的使用方法很熟悉了，
  // PHP也使用和Javascript类似的语法来定义， 匿名函数可以赋值给一个变量， 因为匿名函数其实是一个类实例， 
  // 所以能复制也是很容易理解的， 在Javascript中可以将一个匿名函数赋值给一个对象的属性， 例如:

  /**
   * var a = {};
   * a.call = function() {alert("called");}
   * a.call(); // alert called
   */
  // 这在Javascript中很常见， 但在PHP中这样并不可以， 给对象的属性赋值是不能被调用的， 
  // 这样使用将会导致类寻找类中定义的方法， 在PHP中属性名和定义的方法名是可以重复的， 
  // 这是由PHP的类模型所决定的， 当然PHP在这方面是可以改进的， 后续的版本中可能会允许这样的调用， 
  // 这样的话就更容易灵活的实现一些功能了。
  // 目前想要实现这样的效果也是有方法的: 使用另外一个魔幻方法__call()， 至于怎么实现就留给各位读者当做习题吧。

  