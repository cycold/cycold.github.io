<?php
  ob_start();
  echo "hello\n";
  header('location:static.php');
  ob_end_flush();