使用 `db.collection.find()` 返回数据，每一条占一整行，一点格式都没有，好难阅读，  
不知道有没有方法格式化返回的值，比如每个key-value占一行这种的   
使用:   
`db.collection.find().pretty();`

补充个一劳永逸的方法，在 shell 里执行下列代码     
```
echo "DBQuery.prototype._prettyShell = true" >> ~/.mongorc.js
```