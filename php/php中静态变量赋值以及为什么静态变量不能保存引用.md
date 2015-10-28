```
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
          // $obj = &new stdclass;

          // 声明一个全局对象:
          // global $gg;
          // $gg = new stdclass;
          // $obj = &$gg;

          // 先给$obj 赋一个值呢?
          //$obj = 12;            // 此时静态空间里就会得到12这个值
          //$obj = &new stdclass; // 改变类指向,静态空间可$obj没有任何的关系了, 最后输出就是12

          // 所以这里可以这么操作: 不改变$obj的指向,只改变$obj中的元素的指向,那么这里就使用数组或者对象都可
          // $obj[0] = &new stdclass;
          // $obj->o = &new stdclass;

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
```

内存图解:
```js    
执行:`get_instance_ref`函数
php中每一个函数都会有一个静态空间(这里以对象表示)
static $obj;静态空间 (初始值为NULL)                                                                                      
....................
.   NULL           . 当语句`static $obj;`执行时,其实就是将$obj指向其静态空间 <==> $obj = &NULL;
.   static         . <------$obj 
.                  . 
....................

$obj = &new stdclass; 关键是这里的& 改变了$obj的指向,指向了new stdclass创建的空间       
**
这也就是为什么静态变量不能直接保存引用变量的根本原因: 这会使原本执行static空间的引用$obj指向其他的空间
最后操作的根本就不是静态空间,而是其他的对象,当函数出栈后,$obj对象会被销毁,$obj就指向了NULL
最后在函数再次执行时,访问函数内部的静态变量$obj,得到就是NULL.因为初始的静态对象没有被操作过
**          
....................                       ....................              
.   new stdclass   .                       .   NULL           .          
.                  . <------$obj           .   static         . <---X---$obj 此时$obj不再指向$static   
.                  .                       .                  .  
....................                       .................... 

test_static_ref函数运行结束后: new stdclass被回收, 此时的$obj也被销毁;函数静态空间中还是一片空白(NULL)
当函数再次运行,又执行`static $obj;`将重新将$obj指向静态空间,因为上一次函数执行后,
静态空间没有赋值过,所以依然为NULL
....................
.   NULL           . 
.                  . 
.   static         . 
....................

当:
$obj = new stdclass; 
:: 这里没有&,所以这里只是拷贝new stdclass对象的值,到 $obj所指向的空间中 (即拷贝到static空间中)
:: 可以在这里看到php和js中的赋值时,值传递的区别:
:: php如果没有使用&符号,则都是采用的拷贝赋值的方式,不管是对象还是数组,都是拷贝.(对象就是拷贝整个对象,数组就拷贝整个数组)
:: 而js中则不同
:: js 中的 var obj = new Object; 相当于 php中的 $obj = & new stadcalss;  

test_static_ref函数运行结束后: new stdclass被回收, 但是$obj依然指向:static空间,此时static空间已有之前拷贝的值
当函数再次执行值,又执行`static $obj;`重新将$obj指向静态空间,因为上一次函数执行后,静态空间中已有值,
所以语句`var_dump($obj);`就将输出上一次函数运行后的值.
 ....................              
 .                  .          
 .   static         . 
 . new stadcalss    .  
 .................... 

-------------------------------------------------------------------------------------
 这里还有一种情况:
`$obj = 12;`
`$obj = &new stdclass;`
static $obj;静态空间 (初始值为NULL)                                                                                      
....................
.   NULL           . 当语句`static $obj;`执行时,其实就是将$obj指向其静态空间 <==> $obj = &NULL;
.   static         . <------$obj 
.                  . 
....................

`$obj = 12;`
....................
.   12             . 当语句`$obj = 12;`执行时,静态空间得到值12
.   static         . <------$obj 
.                  . 
....................

`$obj = &new stdclass;`
....................                       ....................              
.   new stdclass   .                       .   12             .          
.                  . <------$obj           .   static         . <---X---$obj 此时$obj不再指向$static   
.                  .                       .                  .  
....................                       .................... 

test_static_ref函数运行结束后: new stdclass被回收, 但是$obj依然指向:static空间,此时static空间已有之前拷贝的值
当函数再次执行值,又执行`static $obj;`重新将$obj指向静态空间,因为上一次函数执行后,静态空间中已有值12,
所以语句`var_dump($obj);`就将输出上一次函数运行后的值12.
 ....................              
 .   12             .          
 .   static         . 
 .                  .  
 .................... 

---------------------------------------------------------------------------

那么如果使用静态变量保存引用值呢? 我就想保存`$obj = &new stdclass;`的值呢?
其实知道了原理后,就很简单了,只要`$obj`的指向不改变即可.
所以这里可以使用数组的元素,或者对象的属性来保存这个引用值即可:
`$obj[0] = &new stdclass;` 
或者
`$obj->o = &new stdclass;`


`$obj[0] = &new stdclass;`
....................                       ....................              
.   new stdclass   .                       .   null           .          
.                  . <------$obj[0]        .   static         . <------$obj  
.                  .                       .                  .  
....................                       ....................                


/**
 - 这和js中的原型对象的使用如出一辙:
 - function fun(){};
 - var obj = new fun;
 - foo.prototype = {} 和 foo.prototype.name = "hello"的区别, 原理其实是一样的
 - js中的foo.prototype = new Object()这就是引用赋值了,会将foo.prototype指向另一个对象,
 - 那么foo.prototype之前指向的对象依然还在内存中,被其他的对象(诸如obj)所引用着呢.
 - 而在PHP中的要使用 $obj = & new stdclass; `&`引用符号会将
 - $obj原先指向的对象(PHP函数get_instance_ref的静态空间)之间的引用断开,$obj指向新的对象new stdclass
 *
 */




```

