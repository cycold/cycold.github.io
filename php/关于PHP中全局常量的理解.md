参考:http://php.net/manual/zh/language.variables.scope.php

全局和静态变量的引用 ¶

>在 Zend 引擎 1 代，它驱动了 PHP4，对于变量的 static 和 global 定义是以引用的方式实现的。
>例如，在一个函数域内部用 global 语句导入的一个真正的全局变量实际上是建立了一个到全局变量的引用。
>这有可能导致预料之外的行为，如以下例子所演示的：

```php
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
```

内存图解:
```js    
执行:`test_global_ref`函数

global $obj;                                                                                           
....................
.   NULL           . <------&$GLOBALS['obj']
.                  . <------$obj = &$GLOBALS['obj'] 
.                  . 
....................

$obj = &new stdclass; 关键是这里的& 改变了$obj的指向,和 new stdclass指向同一个空间                 
....................                       ....................              
.   new stdclass   . <------new stdclass   .   NULL           . <------&$GLOBALS['obj']           
.                  . <------$obj           .                  . <---X---$obj = &$GLOBALS['obj'] 此时$obj不再指向$GLOBALS['obj']    
.                  .                       .                  .  
....................                       .................... 

test_global_ref函数运行结束后:
....................
.   NULL           . <------&$GLOBALS['obj']
.                  . 
.                  . 
....................
所以全局的变量$obj即$GLOBALS['obj']依然指向NULL

---------------------------------------------------------------------------
test_global_noref:
global $obj;                                                                                           
....................
.   NULL           . <------&$GLOBALS['obj']
.                  . <------$obj = &$GLOBALS['obj'] 
.                  . 
....................

$obj = new stdclass; 这里没有&,所以这里只是拷贝new stdclass对象的值,到 $obj所指向的空间中 
:: 可以在这里看到php和js中的赋值时,值传递的区别:
:: php如果没有使用&符号,则都是采用的拷贝赋值的方式,不管是对象还是数组,都是拷贝.(对象就是拷贝整个对象,数组就拷贝整个数组)
:: 而js中则不同
:: js 中的 var obj = new Object; 相当于 php中的 $obj = & new stadcalss;
                                              |         此时创建的new stdclass没有被任何变量引用,拷贝完后就会回收
....................                          |      ....................                 
.copy new stdclass . <------&$GLOBALS['obj']  |      .   new stdclass   .                       
.                  . <------$obj              |      .                  .          
.                  .                          |      .                  .       
....................                          |      ....................      

test_global_noref函数运行结束后:
....................
. copy new stdclass. <------&$GLOBALS['obj']
.                  . 
.                  . <------$obj
....................

                                                       
                                                                                            
                                                                                       
                                                                                           
                                                                                                
                                                                                                
                                                                                                
                                                                                                
                                                                                                
                                                                            
```

