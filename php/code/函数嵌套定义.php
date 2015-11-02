<?php
  function out(){
      echo(1);
      function inner(){
          echo(2);
      };
      inner();
  }
  out();
  // out();
  // inner();