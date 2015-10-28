<?php
  // function foo2()
  function &foo2()
  {
      static $var = 0; //如果返回的不是非静态变量呢？
      ++$var;
      $v = &$var;
      echo '$v: '.$v."\n";
      return $v;
      //return &$var; //PHP Parse error:  parse error 不能返回引用值 所以只能在函数声明时加上&符号得到引用
  };

  $result1 = foo2();
  $result2 = &foo2();//要想使用返回的变量的引用值，必须前面要有&，同时声明函数时（返回值没有加&）也必须要要有&符号
  foo2();

  echo $result1;//output is 1
  echo "\n";
  echo $result2;//output is 2
  echo "\n";

  $result2 = -1;  //当函数前面使用&符号时，返回的$var和$result2指向同一个地址，相互影响
  foo2();
  echo $result2;//output is 0
  echo "\n";