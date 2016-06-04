<?php

  out();

  function out() {
    echo "h\n";
    $a = 12;
    function inner() {
      $a++;
      echo "inner\n";
    }
  }

  inner();  //PHP Fatal error:  Call to undefined function inner()

  out();    //Cannot redeclare inner() (previously declared

  //inner();