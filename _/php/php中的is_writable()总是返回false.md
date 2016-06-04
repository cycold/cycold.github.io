```bash
drwxrwxrwx   5 icewater  staff   170B Sep 19 15:41 test
```
即使文件权限设置为`777`,依然返回false.
```php
var_dump(is_writable(__DIR__)); //false
```

```js

  /*
   * substr 返回字符串的子串
   * base_convert  在任意进制之间转换数字
   * fileperms  取得文件的权限
   */
  // 获取权限
function getChmod($filepath){
      return substr(base_convert(@fileperms($filepath),10,8),-4);
}

clearstatcache();       //清空文件状态缓存

var_dump(exec('whoami'));       // 输出运行中的 php/httpd 进程的创建者用户名 

var_dump(posix_getpwuid(fileowner(__DIR__)));  // fileowner() 返回文件所有的用户 ID 用户 ID 以数字格式返回，用 posix_getpwuid() 来将其解析为用户名。

echo 'Current script owner: ' . get_current_user();   //获取当前 PHP 脚本所有者名称

echo getmyuid().':'.getmygid(); //获取 PHP 脚本所有者的 UID 和 GID

var_dump(getChmod(__DIR__));  // 获得权限 755
```

在命令中查看:
`ps aux | grep  -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root`
找到apache的所属的用户

当运行:
`var_dump(exec('whoami'));`  输出: `_www`,
`var_dump(posix_getpwuid(fileowner(__DIR__)))` 输出; `icewater`
`var_dump(getChmod(__DIR__)); ` // 获得权限 755 所有者有写的权限, 所属组和其他用户没有写权限
`var_dump(getChmod('/Users/icewater/Sites/ci/test'));`// 获得权限 755 所有者有写的权限, 所属组和其他用户没有写权限
这里获取到的权限为`755`和我上面`ls -l`命令出来的权限不一样 `777`
而我这里的所有者为: `icewater`
所属组为: `staff`
改变一下目录的所属者
`chown -R _www test`  


---------------------------
由于之前目录分析错误(失误),只要其他的用户拥有写权限即可