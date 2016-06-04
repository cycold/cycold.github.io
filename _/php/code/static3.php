<?php
  /*
  http://php.net/manual/en/language.variables.scope.php#language.variables.scope.references
    The Zend Engine 1, driving PHP 4, implements the static and global modifier for variables in terms of
    references. For example, a true global variable
    imported inside a function scope with the global statement actually creates a reference to the global
    variable. A similar behaviour applies to the static statement. References are not stored statically.
   */
  function test($init = false, $value = null)
  {
      static $test;
      static $test2;

      if ($init) {
          $test =& $value;
          $test2[0] =& $value;
      }

      var_dump($test);
      var_dump($test2[0]);
  }

  $v = 1;

  test(true, $v); // 1, 1
  echo "--------\n";
  test(); // null, 1

  // $test 是一个静态变量，
  // 第一次执行test(true, $v);时，静态变$test和$value指向的都是同一个值(1)
  // 即：$test-->1; $value-->1;
  // 第二次执行test();$test-->