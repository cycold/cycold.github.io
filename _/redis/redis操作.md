列出当前数据库中所有键
`keys *` 
删除一个或者过个key,返回被删除的key的数量
`del key1 key2`
选择1号数据库,默认有16(0~15)个数据库
`select 1` 
判断一个键是否存在
`exists age`
将当前数据库中一个键移动到其他数据库
`move age 1`
设置一个键的过期时间(设置addr 10秒后过期)
`expire addr 10`
取消某一个键的过期时间
`persist addr`
查看某一个键的过期时间:
`ttl age`
随机返回当前数据库中的一个key
`randomkey`
重命名一个key
`rename age new_age`
返回一个键的类型
`type key`

测试连接是否存活
`ping` 返回PONG 连接正常
返回当前数据库中key的数量
`dbsize`
获取服务器的信息
`info`
获取配置的相关信息
`config get *` 获取全部
`config get dir` 获取具体的字段配置
`config get requirepass` 返回配置文件中的密码
删除当前选择的数据库中的所有的key
`flushdb`
删除所有数据库里面的key
`flushall`
