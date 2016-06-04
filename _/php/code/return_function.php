<?php
  function rr() {
    echo "re\n";
    $a = 0;
    return function() {
      $a++;
      echo $a."\n";
    };
  };

  $f = rr();
  $f();
  $f();