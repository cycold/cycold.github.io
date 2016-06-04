<?php
  function getCounter() {
      $i = 0;
      // return function() use($i) { // 这里如果使用引用传入变量: use(&$i)
      return function() use(&$i) { // 这里如果使用引用传入变量: use(&$i)
          echo ++$i;
          echo "\n";
      };
  }
   
  $counter = getCounter();
  $counter(); // 1
  $counter(); // 1
  // 和Javascript中不同，这里两次函数调用并没有使$i变量自增，默认PHP是通过拷贝的方式传入上层变量进入匿名函数，
  // 如果需要改变上层变量的值则需要通过引用的方式传递。所以上面得代码没有输出1， 2而是1，1。
  // 在javascript中是通过变量对象传递的（使用的是作用域链）