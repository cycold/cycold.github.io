
### UITableView
`UITableViwe* tableView = [UITableView new]`;

1.设置其数据源对象,两种方式:连线或者代码属性设置
> `tableView.dataSource = self`;

2.实现其数据源对象协议:
> `<UITableViewDataSource>`

3.需要实现的方法(数据源对象协议):
> 表格的分组数,默认是1,optional
> `- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView`
> 
> 每一组的行数,required
> `- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section`
> 
> 每一行里面的单元格的具体内容,required
> `- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath`
> 
> 设置tableView的头和尾
> `- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)`
> `- (NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)`

4.其他属性设置:
```
    1.所有行的行高
    self.tableView.rowHeight = 60
    2.设置分割线的颜色
    self.tableView.separatorColor = [UIColor redColor];
    3.设置分割线的样式
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    4.设置tableHeaderView
    self.tableView.tableHeaderView = [UIButton buttonWithType:UIButtonTypeContactAdd];
    5.设置tableFooterView
    self.tableView.tableFooterView = [[UISwitch alloc] init];
```

