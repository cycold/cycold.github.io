<?php
  define('^_^', 'smile');

  if (defined('^_^')) {
      echo "yes\n";
  }else{
      echo 'no';
  }
  //$var = ^_^;   //语法错误
  $var = constant("^_^");
  var_dump($var);

  //PHP内核会在词法解析时将这些常量的内容赋值进行替换，而不是在运行时进行分析。 如下PHP代码
  echo __LINE__."\n";
  function demo() {
      echo __FUNCTION__."\n";
  }
  demo();
  // 等价于：
  echo 20;
  echo "\n";
  function demo2() {
      echo "demo2\n";
  }
  demo2();

  var_dump(__FUNCTION__);
  var_dump(__FILE__);
  var_dump(__DIR__);
  var_dump(__namespace__);
  var_dump(__class__);
  var_dump(__method__);