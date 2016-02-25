
1.收回键盘(两种方式):
`resignFirstResponder`, `endEditing:YES`
```
// 收回键盘 1
// 谁呼出键盘,谁就是第一第一响应者,让"第一响应者", "resign"退出, 收回键盘
// 第一响应者: 就是第一个触发键盘呼出的控件(视图);
// [self.num2 resignFirstResponder];
// [self.num1 resignFirstResponder];

// 收回键盘 2 , 每一个控制器中都会有一个view对象属性
// 让当前的view停止编辑,键盘就自动收回
[self.view endEditing:YES];
```

2.隐藏状态栏,实现如下方法
```
- (BOOL)prefersStatusBarHidden {
    return YES;
}
```

改变状态栏文字颜色,通过重写根控制器方法
```
- (UIStatusBarStyle)preferredStatusBarStyle {
    return UIStatusBarStyleLightContent;
}
```

3.图片加载方式的区别
// 会一直保留在内存中
`UIImage *imgCat = [UIImage imageNamed:imgName];` 

// 再次加载后,会销毁之前加载的图片
// 注意此时图片的资源应该放到文件夹`Supporting Files`下,才可以找到路径
NSString *path = [[NSBundle mainBundle] pathForResource:imgName ofType:nil];
// 这里的参数不能再传递图片名称了, 这里需要传递一个图片的完整路径
`UIImage *imgCat = [UIImage imageWithContentsOfFile:path];`

4.加载`xib`文件:
```
// 使用xib创建view
NSBundle *rootBundle = [NSBundle mainBundle];
// 在应用程序的根目录下搜索对应的xib(nib)文件 注意加载nib文件不需要后缀
return [[rootBundle loadNibNamed:@"CYAppView" owner:nil options:nil] lastObject];
```

5.设置label圆角效果
`lblMsg.layer.cornerRadius = 7`; //设置四周圆角的半径
`lblMsg.layer.masksToBounds` = YES; // 把多余的部分裁剪掉