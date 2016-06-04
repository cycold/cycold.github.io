来自: http://blog.csdn.net/youyudehexie/article/details/12040927
## Hmac算法
随着互联网的发展，MD5已经变得越来越不安全了，黑客可以通过彩虹表，查出MD5值所对应的密码，
为了解决这个问题，很多网站都开始采用需要密钥加密的Hmac算法。

HMAC是密钥相关的哈希运算消息认证码（`Hash-based Message Authentication Code`）,
HMAC运算利用哈希算法，以一个密钥和一个消息为输入，生成一个消息摘要(加密串)作为输出。
认证流程:
(1) 先由客户端向服务器发出一个验证请求。
(2) 服务器接到此请求后生成一个随机数并通过网络传输给客户端（此为挑战）。
(3) 客户端将收到的随机数提供给ePass，由ePass使用该随机数与存储在ePass中的密钥进行HMAC-MD5运算并得到
    一个结果作为认证证据传给服务器（此为响应）。
(4) 与此同时，服务器也使用该随机数与存储在服务器数据库中的该客户密钥进行HMAC-MD5运算，如果服务器的运算结果与客户端传回的响应结果相同，
    则认为客户端是一个合法用户

BAE加密验证:
bae的PHP代码签名参考:
```
Signture = urlencode(base64_encode(hash_hmac('sha1', Content, SecretKey,true)))
```
SecretKey 加密的密钥
Content 传输的内容
sha1生成的算法

Node.js版本的:
```js
Signture = require('crypto').createHmac('sha1', SecrectKey).update(content).digest().toString('base64');
```

