
1.各类结构体转成字符串打印：`NSStringFromPoint,NSStringFrom...`

2.`__FILE__` 返回一个c字符串语言的文件路径，使用`％s`打印。如需使用OC字符串对象,直接使用`@__FILE__`;

3.推迟方法的执行 `performSelector:`
```
/ 动画执行完后,就应该释放执行动画的那部分内存
    // 设置图片框在调用setAnimationImages:nil方法的时候延迟执行,延迟到动画执行完毕后执行
    [self.imgViewCat performSelector:@selector(setAnimationImages:) withObject:nil afterDelay:self.imgViewCat.animationImages.count * 0.1];
```


