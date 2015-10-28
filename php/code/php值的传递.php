<?php
  $arr = array(0,1,2,3);
  $var = 0;

  function print_arg($a, $v) {
    echo '$a: ';
    var_dump(implode(',', $a));
    echo '$v: ';
    var_dump($v);
  }

  // 函数普通的使用以及参数按拷贝传递
  function foo($a, $v) {
    $a['php'] = 'think in php';
    $v = 11;
    print_arg($a,$v);
  }

  //foo($arr, $var);  //这里将会将$arr, $var的值拷贝一份(在内存中重新开辟空间保存这些拷贝,操作的都是新开辟的空间中的值,和$arr,$var无关)
  //print_arg($arr, $var); //没有影响

  // 将传递的参数,首先使用&取得其引用
  function boo(&$a, &$v) {
    $a['&'] = '&';
    $v = 11;
    print_arg($a,$v);
  }
  //boo($arr, $var);
  //print_arg($arr, $var);  //受到boo函数的执行影响

  //-------------------------------------------
  // 事实上,全局变量在函数内的使用就是创建了一个指向全局变量的引用
  // PHP中声明的全局变量都是保存在一个超全局数组$GLOBALS中的
  function goo() {

    $var = 3;
    echo $var."\n";

    //如何获取全局的变量$var
    // 1----------------------
    echo $GLOBALS['var']."\n";

    // 2-----------------------
    global $var;  // 这里其实就是创建一个指向全局变量的引用$var = &$GLOBALS['var'];
    echo $var."\n";

    // 3----------------------
    $var = &$GLOBALS['var'];
    echo $var."\n";
  }
  //goo();

  // 声明的全局静态变量也是保存在超全局数组$GLOBALS中
  static $st = 'static_g';
  //var_dump($GLOBALS); // ["st"]=>&string(6) "static_g"

  // 函数内部的静态变量,返回函数内部的静态变量的引用,使其在函数外部也可以改变
  function &soo() {
    static $sta = 0;
    ++$sta;
    echo "sta: ".$sta."\n";
    return $sta;
  }
  //$sta = &soo();  //注意这里调用的时候也必须要使用`&`,用于显示的告诉函数要返回引用,不是值拷贝
  //$sta = 99;
  //soo();  //100

  // 使用函数内的静态变量,保存一个引用,指向其他变量的引用(变量,数组,对象)
  function sroo() {
    static $sr = 0;
    $sr = &soo();
    echo "sr: ".$sr."\n";
    return $sr;
  }
  //$sr = sroo();
  //$sr = 199;
  //sroo(); //2

  // 使用函数内的静态变量,保存一个引用,指向其他变量的引用(变量,数组,对象)
  function saoo() {
    static $sr;
    $sr[0] = & soo();
    var_dump($sr);
    return $sr[0];
  }
  // $srr = saoo();
  // var_dump($srr);
  // sroo(); //2

  //-----------------------------------
  function test_global_ref() {
      global $obj;  // $obj = &GLOBALS['obj'];
      //var_dump($GLOBALS); //["obj"]=>&NULL
      echo 'before &new stdclass: ';
      var_dump($obj); //NULL
      $obj = &new stdclass;
      // $obj和new stdclass都指向同一个对象new stdclass,此时$obj的引用已经改变了,
      // 之前的$obj和GLOBALS['obj']指向同一个空间,现在$obj指向了object(stdClass),而GLOBALS['obj']指向另一个空间(这里为NULL)
      // 所以这里对$obj的任何修改都和GLOBALS['obj']没有任何关系了
      // 这里和js中的原型赋值:foo.prototype = {}, foo.prototype.name="";一样,
      // 前者会改变整个foo.prototype的指向,但是之前创建的对象就不会受到影响,foo.prototype = {}改变了是整个foo.ptototype的引用值
      // foo.prototype.name=""; 并没有改变引用值,依然修改的还是所有对象原型指向的共同对象,所有的对象都会受到影响
      echo 'after &new stdclass: ';
      var_dump($obj); //object(stdClass)

      // 除非再赋值回去
      //$GLOBALS['obj'] = &$obj;
  }

  function test_global_noref() {
      global $obj;
      $obj = new stdclass;  // 等价于 GLOBALS['obj'] = new stdclass, 所以函数结束后,new stdclass创建的对象不会被回收,保存到了全局变量上
      echo 'after &new stdclass: ';
      var_dump($obj);
  }

  // test_global_ref();    // 当函数test_global_ref出栈后,全局变量$obj即GLOBALS['obj']指向NULL,没有被修改过
  // var_dump($obj);
  // echo "---------------------\n";
  // test_global_noref();
  // var_dump($obj);

  //----------------------------------------------
  // 当明白了上诉的全局变量的赋值原理后,那么静态变量的赋值原理也是类似的
  function &get_instance_ref() {
      static $obj;  // 等效于: $obj = &$STATIC['obj'];  (php没有这个超全局变量$STATIC,这里是假设的)

      // 此时$obj和$STATIC['obj']都指向同一个空间(静态空间)

      echo 'Static object: ';
      var_dump($obj);
      if (!isset($obj)) {
          // 将一个引用赋值给静态变量 时, 此时$obj开始指向了新的空间,而原来的静态空间少了一个引用,此时$STATIC['obj']依然还引用这这个空间
          // 之后所有对$obj的操作,都和静态空间无关了所以函数运行完后,静态空间根本就没有被操作过
          // 所以符号`&`会改变变量的空间的指向
          //$obj = &new stdclass;

          // 声明一个全局对象:
          // global $gg;
          // $gg = new stdclass;
          // $obj = &$gg;

          // 先给$obj 赋一个值呢?
          $obj = 12;
          $obj = &new stdclass;

          // 所以这里可以这么操作: 不改变$obj的指向,只改变$obj中的元素的指向,那么这里就使用数组或者对象都可
          //$obj[0] = &new stdclass;
          //$obj->o = &new stdclass;


          /**
           * 这里的js中的原型对象的使用如出一辙:
           * function fun(){};
           * var obj = new fun;
           * foo.prototype = {} 域 foo.prototype.name = "hello"的区别原理其实是一样的
           * js中的foo.prototype = new Object()这就是引用赋值了,会将foo.prototype指向另一个对象,那么foo.prototype之前指向的对象
           * 依然还在内存中,被其他的对象(诸如obj)所引用着呢.
           * 而在PHP中的要使用 $obj = & new stdclass; `&`引用符号会将
           * $obj原先指向的对象(PHP函数get_instance_ref的静态空间)之间的引用断开,$obj指向新的对象new stdclass
           *
           */
      }
      return $obj;
  }

  function &get_instance_noref() {
      static $obj;

      echo 'Static object: ';
      var_dump($obj);
      if (!isset($obj)) {
          // 将一个对象赋值给静态变量
          $obj = new stdclass;
      }
      return $obj;
  }

  $obj1 = get_instance_ref();
  $still_obj1 = get_instance_ref();
  echo "---------------\n";
  $obj2 = get_instance_noref();
  $still_obj2 = get_instance_noref();

  $arr = array(0,1,2);
  $arr2 = $arr;
  $arr2[3] = 3;
  print_r($arr);  // 0, 1, 2
  print_r($arr2); // 0, 1, 2, 3

  class A{
    public $age = 20;
  }

  $a1 = &new A();
  $a1 = new A();
  $a2 = $a1;
  $a2 = &$a1;
  $a2->age = 24;
  echo $a1->age."\n"; //24
  echo $a2->age."\n"; //24



