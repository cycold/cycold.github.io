##### PHP输出缓存ob系列函数详解
ob，输出缓冲区，是output buffering的简称，而不是output cache。
ob用对了，是能对速度有一定的帮助，但是盲目的加上ob函数，只会增加CPU额外的负担

ob的基本原则：如果ob缓存打开，则echo的数据首先放在ob缓存。如果是header信息，直接放在程序缓存。
当页面执行到最后，会把ob缓存的数据放到程序缓存，然后依次返回给浏览器。

下面我说说ob的基本作用：
  1)防止在浏览器有输出之后再使用setcookie()、header()或session_start()等发送头文件的函数造成的错误。其实这样的用法少用为好，养成良好的代码习惯。
  2)捕捉对一些不可获取的函数的输出，比如phpinfo()会输出一大堆的HTML，但是我们无法用一个变量例如$info=phpinfo();来捕捉，这时候ob就管用了。
  3)对输出的内容进行处理，例如进行gzip压缩，例如进行简繁转换，例如进行一些字符串替换。
  4)生成静态文件，其实就是捕捉整页的输出，然后存成文件。经常在生成HTML，或者整页缓存中使用。
  
> 对于刚才说的第三点中的GZIP压缩，可能是很多人想用，却没有真用上的，其实稍稍修改下代码，就可以实现页面的gzip压缩。

```
ob_start(ob_gzhandler);
要缓存的内容
```

没错，加一个ob_gzhandler这个回调函数就可以了，不过这么做有些小问题，一是需要zlib支持，
二是没有判断浏览器是否支持gzip（现在好像都支持，iphone浏览器好像都支持了）。
以前的做法是判断一下浏览器是否支持gzip，然后用第三方的gzip函数来压缩ob_get_contents() 的内容，最后echo。

一、ob系列函数中常用函数集锦
```

ob_start();            //打开一个输出缓冲区，所有的输出信息不再直接发送到浏览器，而是保存在输出缓冲区里面。  
ob_clean();            //删除内部缓冲区的内容，不关闭缓冲区(不输出)。
ob_end_clean();        //删除内部缓冲区的内容，关闭缓冲区(不输出)。
ob_get_clean();        //返回内部缓冲区的内容，关闭缓冲区。相当于执行 ob_get_contents() and ob_end_clean()
ob_flush();            //发送内部缓冲区的内容到浏览器，删除缓冲区的内容，不关闭缓冲区。
ob_end_flush();        //发送内部缓冲区的内容到浏览器，删除缓冲区的内容，关闭缓冲区。
ob_get_flush();        //返回内部缓冲区的内容，并关闭缓冲区，再释放缓冲区的内容。相当于ob_end_flush()并返回缓冲区内容。
flush();               //将ob_flush释放出来的内容，以及不在PHP缓冲区中的内容，全部输出至浏览器；刷新内部缓冲区的内容，并输出。 
ob_get_contents();     //返回缓冲区的内容，不输出。
ob_get_length();       //返回内部缓冲区的长度，如果缓冲区未被激活，该函数返回FALSE。
ob_get_level();        //Return the nesting level of the output buffering mechanism.
ob_get_status();       //Get status of output buffers. 
ob_implicit_flush();   //打开或关闭绝对刷新，默认为关闭，打开后ob_implicit_flush(true)，所谓绝对刷新，即当有输出语句(e.g: echo)被执行时，便把输出直接发送到浏览器，而不再需要调用flush()或等到脚本结束时才输出。 
ob_gzhandler               //ob_start回调函数，用gzip压缩缓冲区的内容。
ob_list_handlers           //List all output handlers in use
output_add_rewrite_var     //Add URL rewriter values
output_reset_rewrite_vars  //Reset URL rewriter values 

这些函数的行为受php_ini设置的影响：
output_buffering       //该值为ON时，将在所有脚本中使用输出控制；若该值为一个数字，则代表缓冲区的最大字节限制，当缓存内容达到该上限时将会自动向浏览器输出当前的缓冲区里的内容。
output_handler         //该选项可将脚本所有的输出，重定向到一个函数。例如，将 output_handler 设置为 mb_output_handler() 时，字符的编码将被修改为指定的编码。设置的任何处理函数，将自动的处理输出缓冲。
implicit_flush         //作用同ob_implicit_flush，默认为Off。

```

二、实例讲解
1、使 header() 函数前可以有echo代码
Output Control 函数可以让你自由控制脚本中数据的输出。它非常地有用，特别是对于：当你想在数据已经输出后，再输出文件头的情况。
输出控制函数不对使用 header() 或 setcookie()，发送的文件头信息产生影响，只对那些类似于 echo() 和 PHP 代码的数据块有作用。 
```
ob_start();                   //打开缓冲区  
echo "Hello\n";               //输出  
header(“location:index.php”); //把浏览器重定向到index.php   
ob_end_flush();               //输出全部内容到浏览器
```

所有对header()函数有了解的人都知道，这个函数会发送一段文件头给浏览器，
但是如果在使用这个函数之前已经有了任何输出（包括空输出，比如空格，回车和换行）就会提示出错。
如果我们去掉第一行的ob_start()，再执行此程序，我们会发现得到了一条错误提示："Header had all ready send by"！
但是加上ob_start，就不会提示出错，原因是当打开了缓冲区，echo后面的字符不会输出到浏览器，而是保留在服务器，
直到你使用flush或者ob_end_flush才会输出，所以并不会有任何文件头输出的错误！

2、保存 phpinfo() 函数的输出
```
ob_start();                      //打开缓冲区   
phpinfo();                       //使用phpinfo函数   
$info = ob_get_contents();       //得到缓冲区的内容并且赋值给$info   
$file = fopen('info.txt', 'w');  //打开文件info.txt   
fwrite($file, $info);            //写入信息到info.txt   
fclose($file);                   //关闭文件info.txt
```

3、静态模版技术
所谓静态模版技术就是通过某种方式，使得用户在client端得到的是由PHP产生的html页面。
如果这个html页面不会再被更新，那么当另外的用户再次浏览此页面时，程序将不会再调用PHP以及相关的数据库，
对于某些信息量比较大的网站，例如sina、163、sohu。类似这种的技术带来的好处是非常巨大的。 
```
ob_start();                            //打开缓冲区
php页面的全部输出   
$content = ob_get_contents();          //取得php页面输出的全部内容   
$fp = fopen("output00001.html", "w");  //创建一个文件，并打开，准备写入   
fwrite($fp, $content);                 //把php页面的内容全部写入output00001.html，然后……   
fclose($fp);
```

三、输出缓存句柄ob_gzhandler
PHP4.0.4有一个新的输出缓存句柄ob_gzhandler，它与前面的类相似，但用法不同。使用ob_gzhandler时要在php.ini中加入的内容如下：
```
output_handler = ob_gzhandler;
```

这行代码使得PHP激活输出缓存，并压缩它发送出去的所有内容。
如果由于某种原因你不想在php.ini中加上这行代码，你还可以通过PHP源文件所在目录的.htaccess文件改变默认的服务器行为（不压缩），语法如下：    
```
php_value output_handler ob_gzhandler
```

或者是从PHP代码调用，如下所示：
```
ob_start("ob_gzhandler");
```

采用输出缓存句柄的方法确实非常有效，而且不会给服务器带来什么特殊的负荷。但必须注意的是，Netscape Communicator对压缩图形的支持不佳，
因此除非你能够保证所有用户都使用IE浏览器，否则你应该禁止压缩JPEG和GIF图形。
一般地，对于所有其他文件，这种压缩都有效，但建议你针对各种浏览器都分别进行测试，特别是当你使用了特殊的插件或者数据查看器时这一点尤其重要。

注意事项：
1、一些Web服务器的output_buffering默认是4069字符或者更大，
即输出内容必须达到4069字符服务器才会flush刷新输出缓冲，为了确保flush有效，最好在ob_flush()函数前有以下语句：
```
print str_repeat("", 4096);  //以确保到达output_buffering值
```
2、ob_* 系列函数是操作PHP本身的输出缓冲区，所以ob_flush只刷新PHP自身的缓冲区，而flush是刷新apache的缓冲区。
所以，正确使用俩者的顺序是：先ob_flush，然后flush。ob_flush是把数据从PHP的缓冲中释放出来，flush是把缓冲内/外的数据全部发送到浏览器。
3、不要误认为用了ob_start()后，脚本的echo/print等输出就永远不会显示在浏览器上了。因为PHP脚本运行结束后，会自动刷新缓冲区并输出内容。