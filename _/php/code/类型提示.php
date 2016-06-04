<?php
  /**
   *  http://www.php-internals.com/book/?p=chapt03/03-05-impl-of-type-hint
   *  PHP是弱类型语言，向方法传递参数时候也并不严格检查数据类型。 不过有时需要判断传递到方法中的参数，
   *  为此PHP中提供了一些函数，来判断数据的类型。 比如is_numeric()，
   *  判断是否是一个数值或者可转换为数值的字符串，比如用于判断对象的类型运算符：
   *  instanceof。 instanceof 用来测定一个给定的对象是否来自指定的对象类。instanceof 运算符是 PHP 5 引进的。
   *  在此之前是使用的is_a()，不过现在已经不推荐使用。为了避免对象类型不规范引起的问题，PHP5中引入了类型提示这个概念。
   *  在定义方法参数时，同时定义参数的对象类型。 如果在调用的时候，传入参数的类型与定义的参数类型不符，则会报错。
   *  这样就可以过滤对象的类型，或者说保证了数据的安全性。
   *  PHP中的类型提示功能只能用于参数为对象的提示，而无法用于为整数，字串，浮点等类型提示。
   *  在PHP5.1之后，PHP支持对数组的类型提示。
   *  要使用类型提示，只要在方法（或函数）的对象型参数前加一个已存在的类的名称，当使用类型提示时，
   *  你不仅可以指定对象类型，还可以指定抽象类和接口。
   */

  function array_print(Array $arr) {
    print_r($arr);
  }
  //array_print(1);  //PHP Catchable fatal error:  Argument 1 passed to array_print() must be of the type array, integer given,

  function array_print2(Array $arr = 1) {
    print_r($arr);
  }
  array_print2(1);   //PHP Fatal error:  Default value for parameters with array type hint can only be an array or NULL in
  //为什么为很快看到报错呢？ 因为默认值的检测过程发生在中间代码生成阶段，与运行时的报错不同，
  //它还没有生成中间代码，也没有执行中间代码的过程。







