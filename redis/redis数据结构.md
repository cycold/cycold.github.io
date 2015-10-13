#### redis数据结构 – 简介
redis是一种高级的key:value存储系统，其中value支持五种数据类型：

- 1.字符串（strings）
- 2.字符串列表（lists）
- 3.字符串集合（sets）
- 4.有序字符串集合（sorted sets）
- 5.哈希（hashes）

而关于key，有几个点要提醒大家：

> 1.key不要太长，尽量不要超过1024字节，这不仅消耗内存，而且会降低查找的效率；
> 2.key也不要太短，太短的话，key的可读性会降低；
> 3.在一个项目中，key最好使用统一的命名模式，例如user:10000:passwd

#### redis数据结构 – strings
有人说，如果只使用redis中的字符串类型，且不使用redis的持久化功能，那么，redis就和memcache非常非常的像了。
这说明strings类型是一个很基础的数据类型，也是任何存储系统都必备的数据类型。
我们来看一个最简单的例子：
```
set mystr "hello world!"    //设置字符串类型
get mystr                   //读取字符串类型
```

字符串类型的用法就是这么简单，因为是二进制安全的，所以你完全可以把一个图片文件的内容作为字符串来存储

另外，我们还可以通过字符串类型进行数值操作:
```
127.0.0.1:6379> set mynum "2"
OK
127.0.0.1:6379> get mynum
"2"
127.0.0.1:6379> incr mynum
(integer) 3
127.0.0.1:6379> get mynum
"3"
127.0.0.1:6379>
```

看，在遇到数值操作时，redis会将字符串类型转换成数值。

由于`INCR`等指令本身就具有原子操作的特性，所以我们完全可以利用redis的
`INCR`、`INCRBY`、`DECR`、`DECRBY`等指令来实现原子计数的效果.

假如，在某种场景下有3个客户端同时读取了mynum的值（值为2），然后对其同时进行了加1的操作，
那么，最后mynum的值一定是5。不少网站都利用redis的这个特性来实现业务上的统计计数需求

#### redis数据结构 – lists    
redis的另一个重要的数据结构叫做`lists`，翻译成中文叫做“列表”。

首先要明确一点，redis中的`lists`在底层实现上并不是数组，而是链表，也就是说对于一个具有上百万个元素的`lists`来说，
在头部和尾部插入一个新元素，其时间复杂度是常数级别的，比如用`LPUSH`在10个元素的`lists`头部插入新元素，
和在上千万元素的`lists`头部插入新元素的速度应该是相同的。

虽然`lists`有这样的优势，但同样有其弊端，那就是，链表型`lists`的元素定位会比较慢，而数组型`lists`的元素定位就会快得多。

`lists`的常用操作包括`LPUSH`、`RPUSH`、`LRANGE`等。
用`LPUSH` 在 `lists` 的左侧插入一个新元素，
用`RPUSH` 在 `lists` 的右侧插入一个新元素，
用`LRANGE` 命令从`lists`中指定一个范围来提取元素
我们来看几个例子： 

```
//新建一个list叫做mylist，并在列表头部插入元素"1"
127.0.0.1:6379> lpush mylist "1" 
//返回当前mylist中的元素个数
(integer) 1 
//在mylist右侧插入元素"2"
127.0.0.1:6379> rpush mylist "2" 
(integer) 2
//在mylist左侧插入元素"0"
127.0.0.1:6379> lpush mylist "0" 
(integer) 3
//列出mylist中从编号0到编号1的元素
127.0.0.1:6379> lrange mylist 0 1 
1) "0"
2) "1"
//列出mylist中从编号0到倒数第一个元素
127.0.0.1:6379> lrange mylist 0 -1 
1) "0"
2) "1"
3) "2"
```

lists的应用相当广泛，随便举几个例子：
- 1.我们可以利用lists来实现一个消息队列，而且可以确保先后顺序，不必像MySQL那样还需要通过ORDER BY来进行排序。
- 2.利用LRANGE还可以很方便的实现分页的功能。
- 3.在博客系统中，每片博文的评论也可以存入一个单独的list中。

#### redis数据结构 – 集合
redis的集合，是一种无序的集合，集合中的元素没有先后顺序。
集合相关的操作也很丰富，如添加新元素、删除已有元素、取交集、取并集、取差集等。我们来看例子：

```
//向集合myset中加入一个新元素"one"
127.0.0.1:6379> sadd myset "one" 
(integer) 1
127.0.0.1:6379> sadd myset "two"
(integer) 1
//列出集合myset中的所有元素
127.0.0.1:6379> smembers myset 
1) "one"
2) "two"
//判断元素1是否在集合myset中，返回1表示存在
127.0.0.1:6379> sismember myset "one" 
(integer) 1
//判断元素3是否在集合myset中，返回0表示不存在
127.0.0.1:6379> sismember myset "three" 
(integer) 0
//新建一个新的集合yourset
127.0.0.1:6379> sadd yourset "1" 
(integer) 1
127.0.0.1:6379> sadd yourset "2"
(integer) 1
127.0.0.1:6379> smembers yourset
1) "1"
2) "2"
//对两个集合求并集
127.0.0.1:6379> sunion myset yourset 
1) "1"
2) "one"
3) "2"
4) "two"
```

对于集合的使用，也有一些常见的方式，比如，QQ有一个社交功能叫做“好友标签”，大家可以给你的好友贴标签，比如“大美女”、“土豪”、“欧巴”等等，
这时就可以使用redis的集合来实现，把每一个用户的标签都存储在一个集合之中。

#### redis数据结构 – 有序集合
redis不但提供了无序集合（sets），还很体贴的提供了有序集合（sorted sets）。有序集合中的每个元素都关联一个序号（score），
这便是排序的依据。
很多时候，我们都将redis中的有序集合叫做zsets，这是因为在redis中，有序集合相关的操作指令都是以z开头的，
比如zrange、zadd、zrevrange、zrangebyscore等等
老规矩，我们来看几个生动的例子：

新增一个有序集合myzset，并加入一个元素baidu.com，给它赋予的序号是1：

```
127.0.0.1:6379> zadd myzset 1 baidu.com 
(integer) 1
//向myzset中新增一个元素360.com，赋予它的序号是3
127.0.0.1:6379> zadd myzset 3 360.com 
(integer) 1
//向myzset中新增一个元素google.com，赋予它的序号是2
127.0.0.1:6379> zadd myzset 2 google.com 
(integer) 1
//列出myzset的所有元素，同时列出其序号，可以看出myzset已经是有序的了。
127.0.0.1:6379> zrange myzset 0 -1 withscores 
1) "baidu.com"
2) "1"
3) "google.com"
4) "2"
5) "360.com"
6) "3"
//只列出myzset的元素
127.0.0.1:6379> zrange myzset 0 -1 
1) "baidu.com"
2) "google.com"
3) "360.com"
```

#### redis数据结构 – 哈希
最后要给大家介绍的是hashes，即哈希。哈希是从redis-2.0.0版本之后才有的数据结构。
hashes存的是字符串和字符串值之间的映射，比如一个用户要存储其全名、姓氏、年龄等等，就很适合使用哈希。
我们来看一个例子：

```
//建立哈希，并赋值
127.0.0.1:6379> HMSET user:001 username antirez password P1pp0 age 34 
OK
//列出哈希的内容
127.0.0.1:6379> HGETALL user:001 
1) "username"
2) "antirez"
3) "password"
4) "P1pp0"
5) "age"
6) "34"
//更改哈希中的某一个值
127.0.0.1:6379> HSET user:001 password 12345 
(integer) 0
//再次列出哈希的内容
127.0.0.1:6379> HGETALL user:001 
1) "username"
2) "antirez"
3) "password"
4) "12345"
5) "age"
6) "34"
```

有关hashes的操作，同样很丰富，需要时，大家可以从这里[查询](http://redis.io/commands#hash)。

#### redis持久化 – 两种方式
redis提供了两种持久化的方式，分别是`RDB（Redis DataBase`）和`AOF（Append Only File）`。
`RDB`，简而言之，就是在不同的时间点，将redis存储的数据生成快照并存储到磁盘等介质上；

`AOF`，则是换了一个角度来实现持久化，那就是将redis执行过的所有**写指令**记录下来，在下次redis重新启动时，
只要把这些写指令从前到后再重复执行一遍，就可以实现数据恢复了。

其实RDB和AOF两种方式也可以同时使用，在这种情况下，如果redis重启的话，则会优先采用AOF方式来进行数据恢复，
这是因为AOF方式的数据恢复完整度更高。如果你没有数据持久化的需求，也完全可以关闭RDB和AOF方式，这样的话，
redis将变成一个纯内存数据库，就像memcache一样。