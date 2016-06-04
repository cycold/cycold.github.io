1. 演示效果

2. 功能分析
* 以九宫格的方式展示应用信息
* 点击"下载"按钮做出相应操作


3. 步骤分析
* 从对应的app.plist文件中加载数据("应用信息")
* 根据加载好的"应用信息"的数据创建对应的view
* 监听"下载"按钮的点击事件


4. 今天要掌握的
* UIView的常见属性和方法
* 九宫格的计算方法(如何排列九宫格, 计算坐标)
* 字典转模型
* xib的使用
* 自定义view、对view的封装
* 简单MVC


5. 开始编写代码
1> 准备工作
    * 新建一个"Single View Application"
    * 把图片素材、app.plist文件拖到项目中

2> 懒加载数据
    * 通过懒加载的方式加载app.plist中的数据到NSArray中
    // 加载数据,获取plist文件路径
    NSString *path = [[NSBundle mainBundle] pathForResource:@"app.plist" ofType:nil];

3> 根据apps中的数据, 创建相应的view并展示到屏幕上
    一、分析:
        * 思考: 在界面一加载完毕就能看到应用了, 所以要在viewDidLoad方法中创建应用
        * 分析每个一个应用中都包含了什么控件?(UIImageView、UILabel、UIButton)
        * 为了便于统一管理, 为每一个应用封装一个UIView, 然后在该UIView内部再放上面3个子控件

    二、创建UIView, 并添加到屏幕上
        * 一个一个创建UIView, 说明如何创建、添加UIView到界面上, 以及如何计算坐标
        ** 注意: 设置完毕frame以后才可以看到(假设每个UIView的width=75,height=90)

        * 保证每行的应用之间的间距相等, 所以要计算每行的应用之间的间距
        ** 注意: 间距 = (屏幕宽度 - (3 * 每个应用的宽度)) / 4

        * 为了让"应用"显示到状态栏下面, 所以设置一个y值, 假设为30

        * 至此, 计算出了第一个UIView的frame的值: appW = 75, appH = 90, appX = 间距, appY = 30
        /** 九宫格计算坐标的讲解思路:
         1. 添加一个UIView
         
         2. 通过循环根据app的个数添加多个UIView, 但是会覆盖, 因为frame相同
         
         3. 计算第一个UIView的x和y, 引出marginTop、marginX
         
         4. 让后一个一个去分析每个UIView的x和y找规律
         
         5. 引入需要基础每个UIView所在的行的索引和列的索引
         
         
         */

    三、通过循环创建多个UIView加载到屏幕上。
        * 了解计算每个UIView坐标的方法

        * 计算每个UIView坐标的核心点:
        1> 计算出当前的UIView处于第几列、第几行
        2> 然后根据当前UIView所处的列与行, 然后计算出对应的x、y坐标。

        * 计算当前UIView所在的列索引: columnIndex = i % 3

        * 计算当前UIView所在的行索引: rowIndex = i / 3

4> 在每个UIView中创建3个子元素: UIImageView、UILabel、UIButton
* UIImageView:
    CGFloat iconW = 45;
    CGFloat iconH = 45;
    CGFloat iconX = (appView.frame.size.width - iconW) * 0.5;
    CGFloat iconY = 0;)

* UILabel:
    CGFloat titleW = appW;
    CGFloat titleH = 20;
    CGFloat titleX = 0;
    CGFloat titleY = iconY + iconH;

* UIButton
    CGFloat downloadW = appW;
    CGFloat downloadH = 20;
    CGFloat downloadX = 0;
    CGFloat downloadY = titleY + titleH;
    downloadBtn.frame = CGRectMake(downloadX, downloadY, downloadW, downloadH);


5> 向UIImageView、UILabel、UIButton中添加数据

6> 修改Label的字体、文字居中显示、按钮背景图片、设置按钮的字体大小。
* 了解按钮的内部结构
* 注意: 修改按钮的文字的时候还是通过setTitle:来修改, 不要直接通过titleLabel来修改文字。
* UIImageView设置图片居中:contentMode属性


7> 了解"文档注释"的含义。

---------------------- 到此为止要掌握的 ----------------------------
1. 懒加载数据
2. 排列九宫格
3. 动态创建控件
4. 为控件设置数据、样式
---------------------- 到此为止要掌握的 ----------------------------



6. 字典转模型
0> 字典转模型的含义: 把字典中的数据使用模型来保存。新建一个类, 根据字典中键值对的个数, 来编写这个类中的属性, 将来用这个类的对象的属性来保存字典中每个键对应的值。

1> 为什么要把字典转成模型?
* 字典缺陷:
0> 写代码的时候字典的键没有智能提示, 但是模型的属性可以有智能提示
1> "键"是字符串, 如果写错了, 编译器不报错(在编译的时候不报错), 运行时可能出错, 出错了很难找错。
2> 使用"模型"可以更方便的使用面向对象的3大特(封装、继承、多态)性进行扩展。

* 什么是模型? "模型"就是自定义的类, 通过为"类"增加各种属性来保存数据。

* 字典转模型要修改哪里的代码?
1> 创建一个模型类
2> 在懒加载数据的时候, 把加载到的数据都放到模型对象中, 然后再把模型对象放到数组中。


* 复习把app.plist转换成模型数组的过程(参考ppt"字典转模型的过程")



* 把字典转模型的过程封装到"模型"内部
* 原因: 将来的这个"模型"可能会在很多地方被用到(比如有很多个控制器都会使用这个模型), 那么每次用到模型的地方都需要写一次把字典中的数据赋给模型属性的代码, 此时如果把这些赋值语句封装到模型内部, 会大大简化了使用复杂度与代码量。
* 思路:
1> 在模型中接受一个NSDictionary的参数, 然后在模型内部把NSDictioanry中的数据赋值给模型的属性。
2> 封装一个initWithDict方法和一个appWithDict方法


* id与instancetype的介绍
1. 使用id作为方法返回值的问题:
1> 在接收方法的返回值的时候可以使用任何类型来接收, 编译都不报错, 但是运行时可能出错。

2. instancetype需要注意的点
1> instancetype在类型表示上, 与id意思一样, 都表示任何对象类型
2> instancetype只能用作返回值类型, 不能向id一样声明变量、用作参数等
3> 使用instancetype, 编译器会检测instancetype的真实类型, 如果类型不匹配, 编译时就报错了。(instancetype出现在哪个类型中就表示对应的类型)



7.使用xib精简代码。
1> 什么是xib? xib能做什么?
* 用来描述软件界面的文件。
* 如果没有xib, 所有的界面都需要通过代码来手动创建。
* 有了xib以后, 可以在xib中进行可视化开发, 然后加载xib文件的时候, 系统自动生成对应的代码来创建界面。
* 与xib类似的还有storyboard文件。

2> xib与storyboard既然都是描述软件界面的, 有什么区别吗?
* xib是轻量级的, 一般只用来描述一个界面中的某部分内容（用来描述局部UI界面）。

* storyboard是重量级的, 一般用来描述软件的多个界面, 以及不同界面之间的跳转关系。


3> 加载xib的方式:
NSBundle *bundle = [NSBundle mainBundle];
[bundle loadNibNamed]
[bundle bundlePath] 查看mainBundle的路径。

4> 查找xib在手机模拟器中的位置。安装到手机上后就变成了nib文件了。
/Users/Steve/Library/Developer/CoreSimulator/Devices/0C63A035-071E-4EFC-8718-C387A3F7E026/data/Containers
NSString *home = NSHomeDirectory();
NSLog(@"%@", home);



8. 封装, 自定义View。创建属性、传递Model进去。


9. 封装创建View的代码, 让用户不知道是通过xib创建的还是通过代码创建的。
* 封装一个类方法



10.mvc简单介绍:基本思想就是把数据、界面、控制器分开。


11.xib文件的加载过程。
0> 根据路径, 搜索对应的xib文件(nib文件)
1> 加载xib文件的时候, 会按顺序加载xib文件中的每个控件。
2> 对于每个控件, 创建的时候都会查找对应的Class属性中配置的是那个类, 那么就创建对应的类的对象。
3> 创建好某个控件以后, 按照在xib中配置的属性的值, 依次为对象的属性赋值。
4> 创建该控件下的子控件, 并设置属性值。然后把该控件加到父控件中。
5> 最后返回一个数组, 这个数组中包含创建的根元素对象。




12. 再次封装, 在创建自定义View的时候把model传递进去。







------------ 最后补充两个知识点------------
1. 根据subViews[index]获取子元素
2. 通过[appView viewWithTag:10]根据tag的值来获取对应的子元素。
以上两种方式返回值都是UIView将来还需要强制类型转换。



3. 设置Label的圆角效果
// 4. 设置Label为圆角
// 设置四周圆角的半径
lblMsg.layer.cornerRadius = 5;
// 把多余的部分裁剪掉。
lblMsg.layer.masksToBounds = YES;




4. 通过动画显示和隐藏Label
// 5通过动画来显示Label, 通过动画来隐藏Label
[UIView animateWithDuration:0.8 animations:^{
    // 要执行的动画
    lblMsg.alpha = 0.8;
} completion:^(BOOL finished) {
    // 动画执行完毕后, 要执行的代码
    //[lblMsg removeFromSuperview];
    
    // UIViewAnimationOptionCurveLinear做匀速动画
    [UIView animateWithDuration:1.0 delay:1.5 options:UIViewAnimationOptionCurveLinear animations:^{
        // 通过动画的方式让当前Label的透明度慢慢变成0
        lblMsg.alpha = 0;
    } completion:^(BOOL finished) {
        // 动画执行完毕以后删除该提示label
        [lblMsg removeFromSuperview];
        
        // 设置当前被点击的按钮禁用
        sender.enabled = NO;
    }];
}];




















