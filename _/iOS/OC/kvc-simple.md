18.KVC(Key Value Coding)介绍: 通过给定一个对象的属性名称(以字符串方式), 然后找到对象的相应属性进行赋值。

* setValue:forKeyPath:
** 示例: [self setValue:dict[@"icon"] forKeyPath:@"icon"]
** 含义: 表示根据forKeyPath:@"icon"提供的@"icon"去self对象中查找名字叫icon的属性, 找到以后把dict[@"icon"]中获取到的值赋值给self的icon属性。


* setValuesForKyesWithDictionary:
** 含义: 更简便的调用方式。内部相当于调用了多次setValue:forKeyPath:

** 使用KVC时的注意点:
1> 必须保证字典中的key与模型的属性名称一致。
2> 必须保证模型的属性个数与字典一致或者模型的属性个数要大于等于字典的个数。

* 演示KVC:
1> 新建一个model类。
2> 演示对字符串类型、数字类型进行KVC赋值
3> 通过KVC取值。
id v = [对象 valueForKeyPath:@"key"];
int v1 = [[对象 valueForKeyPath:@"key"] intValue];

4> 把模型转成字典, 把对象中指定的属性转换为字典。
NSDictioanry *dict = [对象 dictionaryWithValuesForKeys:@[@"name", @"age"]];

5> 把一个person数组中的每个person对象的name都获取出来然后放到一个新的数组中。
(
    NSArray *names = [person数组 valueForKeyPath:@"name"];
)

6> keyPath介绍, 人拥有一本书, 通过kvc获取人所拥有的书的名称
(
    NSString *bkName = [person valueForKeyPath:@"book.name"];
    
    等价于
    
    NSString *bkName = person.book.name;
)

