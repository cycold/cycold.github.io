<?php
  $arr = array(0,1,2,3);
  $var = 0;

  function print_arg($a, $v) {
    echo '$a: ';
    var_dump(implode(',', $a));
    echo '$v: ';
    var_dump($v);
  }

  // 函数普通的使用以及参数按拷贝传递
  function foo($a, $v) {
    $a['php'] = 'think in php';
    $v = 11;
    print_arg($a,$v);
  }

  foo($arr, $var);  //这里将会将$arr, $var的值拷贝一份(在内存中重新开辟空间保存这些拷贝,操作的都是新开辟的空间中的值,和$arr,$var无关)
  print_arg($arr, $var); //没有影响

  // 将传递的参数,首先使用&取得其引用
  function boo(&$a, &$v) {
    $a['&'] = '&';
    $v = 11;
    print_arg($a,$v);
  }
  boo($arr, $var);
  print_arg($arr, $var);  //受到boo函数的执行影响