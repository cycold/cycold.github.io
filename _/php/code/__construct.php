<?php
  class A {

    function __construct() {
      echo "A-hello\n";
    }

    public function foo() {
      echo "foo\n";
    }
  }

  class B extends A{
    public function boo() {
      echo "boo\n";
    }
  }

  $b = new B(); //A-hello   // 因为此时B继承了A中构造函数所以会输出A-hello
  $b->foo();    //foo
  $b->boo();    //boo

  //-------------------------

  class C extends A{
    function __construct() {
      echo "C\n";
    }
    public function coo() {
      echo "coo\n";
    }
  }

  $c = new C(); // 因为此时C覆盖了从A中继承过来的构造函数所以会输出C
  $c->foo();    //foo 虽然没有继承A的构造函数,但是继承A的其他属性
  $c->coo();    //coo