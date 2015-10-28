<?php
  function &get_config(Array $replace = array()){
    $config = [1,2,3,4];
    foreach ($replace as $key => $value) {
      $config[$key] = $value;
    }
    return $config;
  }

  $re = get_config(array('h'=>'w'));

  var_dump($re);

  // 当函数名前面有& 符号时，表示函数返回值为饮用值，
  // get_config(){return $config} 直接返回$config数组
  // &get_config(){return $config} 直接返回$config数组的饮用 即：&$config

  // function &foo(){
  //     static $var = 0;
  //     return ++ $var;
  // };

  // $result1 = foo();
  // $result2 = & foo();

  // foo();

  // echo $result1;//output is 1
  // echo "\n";
  // echo $result2;//output is 3
  // echo "\n";

  // function foo1(){
  //   static $var = 0;
  //   return ++ $var;
  // };

  // $result1 = foo1();

  // foo1();

  // echo $result1;//output is 1
  // echo "\n";

  // function foo2()
  function &foo2()
  {
      // static $var = 0; //如果返回的不是非静态变量呢？
      $var = 0;
      ++$var;
      return $var;
      //return &$var; //PHP Parse error:  parse error 不能返回引用值
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