
1.动画的连续执行:
```
[UIView animateWithDuration:1.0 animations:^{
        lblMsg.alpha = 0.6;
    } completion:^(BOOL finished) {
        if (finished) {
            // 前一个动画执行完后,再执行下一个动画
            // UIViewAnimationCurveLinear 表示匀速执行动画
            [UIView animateWithDuration:1
                                  delay:1.0
                                options:UIViewAnimationOptionCurveLinear
                             animations:^{ lblMsg.alpha = 0;}
                             completion:^(BOOL finished) {
                                 if (finished) {
                                    [lblMsg removeFromSuperview];
                                 }
                             }
            ];
        }
    }];
```

// 动画完成后,回调处理:
```
- (void)scoreIn:(UIButton *)sender {
    [UIView animateWithDuration:0.7 animations:^{
        // 还原图片显示按钮
        self.imgBox.frame = self.imgFrame;
        // 还原阴影透明度(以动化的形式)
        self.cover.alpha = 0.0;
    } completion:^(BOOL finished) {
        if (finished) {
            // 动画完成后,清理内存
            // 移除阴影按钮 注意:控件只能自己调用自己方法移除
            [self.cover removeFromSuperview];
            // 当图片变成小小图后,设置self.cover = nil; 这个属性将作为标志(图片处于大图还是小图时的标志)
            self.cover = nil;
        }
    }];
}
```

// 调用数组元素的方法
```
// 创建之前需要先清除之前创建的按钮
    // 这里有两种方法:
    // 1
    /* while (self.answerView.subviews.firstObject) {
        [self.answerView.subviews.firstObject removeFromSuperview];
    }*/
    
    // 2 makeObjectsPerformSelector 是数组中的每一个元素（对象）都执行方法removeFromSuperview
    // 内部执行了循环,无需我们自己来些循环
    [self.answerView.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
```

