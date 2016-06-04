使用require('crypto')调用加密模块。
加密模块需要底层系统提供OpenSSL的支持。它提供了一种安全凭证的封装方式，可以用于HTTPS安全网络以及普通HTTP连接。
该模块还提供了一套针对OpenSSL的
hash（哈希），
hmac（密钥哈希），
cipher（编码），
decipher（解码），
sign（签名）以及
verify（验证）等方法的封装。

`crypto.createCredentials(details)`
创建一个凭证对象，可选参数details为一个带键值的字典：
key：为字符串型，PEM编码的私钥。
cert：为字符串型，PEM编码的认证证书。
ca：字符串形式的PEM编码可信CA证书，或证书列表。
如果没有给出'ca'的详细内容，那么node.js将会使用默认的公开受信任列表，该表位于http://mxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt。

`crypto.createHash(algorithm)`
创建并返回一个hash对象，它是一个指定算法的加密hash，用于生成hash摘要。
参数algorithm可选择系统上安装的OpenSSL版本所支持的算法。
例如：'sha1', 'md5', 'sha256', 'sha512'等。在近期发行的版本中，
openssl list-message-digest-algorithms会显示这些可用的摘要算法。

`hash.update(data)`
更新hash的内容为指定的data。当使用流数据时可能会多次调用该方法。

`hash.digest(encoding='binary')`
计算所有传入数据的hash摘要。参数`encoding`（编码方式）可以为'hex', 'binary' 或者'base64'。

`crypto.createHmac(algorithm, key)`
创建并返回一个hmac对象，它是一个指定算法和密钥的加密hmac。
参数algorithm可选择OpenSSL支持的算法 - 参见上文的createHash。参数key为hmac所使用的密钥。

`hmac.update(data)`
更新hmac的内容为指定的data。当使用流数据时可能会多次调用该方法。

`hmac.digest(encoding='binary')`
计算所有传入数据的hmac摘要。参数encoding（编码方式）可以为'hex', 'binary' 或者'base64'。

`crypto.createCipher(algorithm, key)`
使用指定的算法和密钥创建并返回一个`cipher`对象。
参数algorithm可选择OpenSSL支持的算法，例如'aes192'等。在最近的发行版中，openssl list-cipher-algorithms会显示可用的加密的算法。

`cipher.update(data, input_encoding='binary', output_encoding='binary')`
使用参数data更新要加密的内容，其编码方式由参数input_encoding指定，
可以为 'utf8', 'ascii'或者'binary'。参数output_encoding指定了已加密内容的输出编码方式，可以为 'binary', 'base64'或'hex'。
返回已加密的内容，当使用流数据时可能会多次调用该方法。

`cipher.final(output_encoding='binary')`
返回所有剩余的加密内容，output_encoding输出编码为'binary', 'ascii'或'utf8'其中之一。

`crypto.createDecipher(algorithm, key)`
使用给定的算法和密钥创建并返回一个解密对象。该对象为上述加密对象的反向运算。

`decipher.update(data, input_encoding='binary', output_encoding='binary')`
使用参数data更新要解密的内容，其编码方式为'binary'，'base64'或'hex'。
参数output_encoding指定了已解密的明文内容的输出编码方式，可以为 'binary'，'ascii'或'utf8'。

`decipher.final(output_encoding='binary')`
返回全部剩余的已解密的明文，其output_encoding' 为'binary', 'ascii'或'utf8'`其中之一。

`crypto.createSign(algorithm)`
使用给定的算法创建并返回一个签名器对象。在现有的OpenSSL发行版中，
openssl list-public-key-algorithms会显示可用的签名算法，例如：'RSA-SHA256'。

`signer.update(data)`
使用data参数更新签名器对象。当使用流数据时可能会多次调用该方法。

`signer.sign(private_key, output_format='binary')`
对所有传入签名器的数据计算其签名。private_key为字符串，它包含了PEM编码的用于签名的私钥。
返回签名，其output_format输出可以为'binary', 'hex' 或者'base64'。

`crypto.createVerify(algorithm)`
使用给定算法创建并返回一个验证器对象。它是上述签名器对象的反向运算。

`verifier.update(data)`
使用data参数更新验证器对象。当使用流数据时可能会多次调用该方法。

`verifier.verify(cert, signature, signature_format='binary')`
使用参数cert和signature验证已签名的数据，cert为经过PEM编码的公钥字符串，
signature为之前已计算的数据的签名，signature_format可以为'binary'，'hex' 或者'base64'。
根据对数据和公钥进行签名有效性验证的结果，返回true或者false。

当你需要一个不可逆的加密代码如何写:
```js
var text = "123|12312312123123121231231212312312123123121231231212312312";
var hasher=crypto.createHash("md5");
hasher.update(text);
var hashmsg=hasher.digest('hex');//hashmsg为加密之后的数据
```

当你需要一个加密和解密的环境时:
```js
var key="asdhjwheru*asd123-123";//加密的秘钥
var text = "123|12312312123123121231231212312312123123121231231212312312";
var crypted =cipher.update(text,'utf8','hex');
crypted+=cipher.final('hex');
var message=crypted;//加密之后的值
var decipher = crypto.createDecipher('aes-256-cbc',key);
var dec=decipher.update(message,'hex','utf8');
dec+= decipher.final('utf8');//解密之后的值
```


