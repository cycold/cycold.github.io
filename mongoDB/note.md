
db.collection.find()返回的是一个`cursor`(指针),如果没有将结果赋值给var关键字修饰的变量,那么在终端中默认输出
为20条文档(默认迭代20次).
使用下面的命令可以知道为在终端默认输出的数据位20条
`db.restaurants.find({},{name:1}).limit(21)`
`it`

```
test>var cur = db.restaurants.find({},{"name":1}).limit(21)
test>var myFirstDocument = cur.hasNext() ? cur.next() : null
test>cur.objsLeftInBatch();
20
test>db.restaurants.find().objsLeftInBatch()
101
test>db.restaurants.find().length()
25359
test>
```

查询所有存在某个字段的文档:
`db.foo.find({createAt:{$exists:true}})`
https://docs.mongodb.org/manual/reference/operator/query/exists/#op._S_exists
