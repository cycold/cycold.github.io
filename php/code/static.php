<?php
  function fun() {
    static $a = 1;  // 只会执行一次赋值
    $a++;
    echo $a."\n";
  }
  // fun();
  // fun();
  // fun();
  // fun();

  // 也就是说Zend为每个函数(准确的说是zend_op_array)分配了一个私有的符号表来保存该函数的静态变量。
  $a = array('a', 'b', 'c');
  function &test()
  {
      global $a;
      static $b;
      var_dump($b);
      $b = &$a;
      return $b;
  }
  $c = & test();
  $c[0] = 'z';
  test();
