<?php
  // function &re() {
  function &re() {
    static $a = 0;
    $a++;
    echo $a."\n";
    //return &$a; // PHP Parse error:  parse error

    $c = &$a;
    //var_dump(&$a);  //PHP Fatal error: Call-time pass-by-reference has been removed 
    //echo(&$a);  //PHP Parse error:  parse error
    return $a;    //返回的是$a的拷贝
  }
  // $r = re();
  $r = &re();
  $r = 12;
  re();