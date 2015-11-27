## MD5加密算法
算法简介
MD5的全称是`Message-Digest Algorithm 5`（信息-摘要算法），
在90年代初由Mit Laboratory for Computer Science和Rsa data security inc的Ronald l. rivest开发出来，
经md2、md3和md4发展而来。它的作用是让大容量信息在用数字签名软件签署私人密匙前被“压缩”成一种保密的格式
(就是把一个任意长度的字节串变换成一定长的大整数).不管是md2、md4还是md5，它们都需要获得一个随机长度的信息并产生一个128位的信息摘要.
MD5 算法的哈希值大小为 `128 位`。是一种不可逆的算法。

算法特点
- 两个不同的明文不会得到相同的输出值
- MD5结果不能反推明文，不可逆

安全性
从安全的角度讲，MD5的输出为128位，若采用纯强力攻击寻找一个消息具有给定Hash值的计算困难性为2128，
用每秒可试验1000000000个消息的计算机需时1.07×1022年。若采用生日攻击法，寻找有相同Hash值的两个消息需要试验264个消息，
用每秒可试验1000000000个消息的计算机需时585年。
实际应用上，例如我知道‘password’的MD5值是`5f4dcc3b5aa765d61d8327deb882cf99`，那么我就用一个数据库存起来，
只要我看到`5f4dcc3b5aa765d61d8327deb882cf99`，我就知道这个是口令‘password‘使用MD5处理之后的值，原来的口令就是’password'。
MD5在身份鉴别系统中用于口令保护已经是很久了事情了，
大部分黑客也有针对这种Hash方式准备相应的数据库进行反查，
这种数据库称为`彩虹表`，
MD5的安全性大大减弱。

MD5加密例程:
```js
var crypto = require('crypto')
var str = 'password'
var md5 = crypto.createHash('md5')
md5.update(str)
var d = md5.digest('hex')
```


## SHA1算法
算法简介
SHA1的全称是`Secure Hash Algorithm`(安全哈希算法)。加密哈希函数将任意长度的二进制字符串映射为固定长度的小型二进制字符串。
加密哈希函数有这样一个属性：在计算上不大可能找到散列为相同的值的两个不同的输入；也就是说，
两组数据的哈希值仅在对应的数据也匹配时才会匹配。
数据的少量更改会在哈希值中产生不可预知的大量更改。所以你很难从加密后的文字中找到蛛丝马迹。
SHA1 算法的哈希值大小为`160`位。是一种不可逆的算法。
SHA1加密例程
```js
var crypto = require('crypto')
var str = "password"
var shaum = crypto.createHash('sha1')
shaum.update(str)
var d = shasum.digest('hex')
```

MD5与sha1的不同点:
MD5 使用小端排序LITTLE-ENDIAN，sha1 使用大端排序BIG-ENDIAN
MD5最后生成的摘要信息是16个字节，SHA1是20个字节。





