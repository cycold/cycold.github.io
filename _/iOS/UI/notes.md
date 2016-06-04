#### 谨记一条软件开发定律：万物皆对象

UI界面上的每一个元素都是一个对象:
> 一张图片是一个UIImageView对象
> 一段文字是一个UILabel对象
> 一只按钮是一个UIButton对象

因此，搭建UI界面的过程极其简单
> 利用类创建对象
> 将对象显示到屏幕上

为了方便开发者开发出强大的功能，苹果提供了各种各样的框架
> `UIKit`：创建和管理应用程序的用户界面
> QuartzCore：提供动画特效以及通过硬件进行渲染的能力
> CoreGraphics：提供2D绘制的基于C的API
> CoreLocation：使用GPS和WIFI获取位置信息
> MapKit：为应用程序提供内嵌地图的接口
> AVFoundation：音频、视频处理

UIKit框架是跟UI有关系的
> 诸如前面所述的界面元素(如UIImageView,UIButton,UITableView,....)，都是封装在UIKit框架内部的
> UIKit框架中提供了丰富多彩的可视化组件元素

iOS 8模拟器键盘不支持中文输出，只能使用粘贴、复制。
在iOS 8的模拟器下无法调出键盘时，使用command + K键调出键盘

常用标签:
`UILabel` - 文本标签
`UIButton` - 监听用户的点击事件，在用户点击后做出响应
`UITextField` – 文本输入框,文本输入框可以弹出键盘，让用户输入文本内容

`UIView`: 一般翻译叫做：视图\控件\组件

`UIViewController`:
> 手机上自带的“设置”中有很多的界面，点击对应的选项可以跳到下一个界面,

每一个新的界面都是一个新的UIView，在切换过程中，涉及到了：
> UIView的创建和销毁
> UIView跟用户的交互（处理UIView内部每一行的点击）

其实，每当显示一个新界面时，首先会创建一个新的`UIViewController对象`，然后创建一个`对应的全屏UIView`，
UIViewController负责管理这个UIView
UIViewController就是UIView的大管家，负责创建、显示、销毁UIView，负责监听UIView内部的事件，负责处理UIView与用户的交互
UIViewController内部有个UIView属性，就是它负责管理的UIView对象 ：
`@property(nonatomic, strong) UIView *view;`

UIView与UIViewController的关系?
> UIView只负责对数据的展示，采集用户的输入、监听用户的事件等。      
> 其他的操作比如：每个UIView的创建、销毁、用户触发某个事件后的事件处理程序等这些都交给UIViewController来处理。     


IBAction和IBOutlet究竟有什么作用？
> IBAction相当于void，但是能拖线。IBOutlet保证属性可以拖线。
> IBAction
> 从返回值角度上看，作用相当于void
> 只有返回值声明为IBAction的方法，才能跟storyboard中的控件进行连线
> IBOutlet
> 只有声明为IBOutlet的属性，才能跟storyboard中的控件进行连线

还有其他拖线方式么？
> 点击控件右键连线
> 按住control拖线（从控件到代码、从代码到控件）
> 属性与方法代码写好后，打开View Controller Scene,选择View Controller右键将对应的方法拖到控件上。

Storyboard文件中箭头的含义？
> 程序的入口.新建一个ViewController后，
> 设置`Is Initial View Controller`属性来让`当前View Controller`为默认启动项。

如何更换storyboard文件？
`项目 ->  General -> Deployment Info -> 改变Main.storyboard`

引用控件的属性、事件处理方法都写在.m文件的“类扩展”，保证封装性。

虽然，每一个UI控件都有自己的独特属性，但是有些属性是每个UI控件都具备的，
比如每一个UI控件都有自己的
`位置`和`尺寸`、都有自己的`父控件`、`子控件`。
于是，`所有的UI控件最终都继承自UIView`，UI控件的公共属性都定义在UIView中，比如：
`frame` ：位置和尺寸
`center` ：中心点位置

frame: 能修改位置和尺寸。（全能）
center: 能修改位置
bounds: 能修改尺寸（一般x、y都是0）


UIView的常见属性:
> @property(nonatomic,readonly) `UIView` *superview;
> 获得自己的父控件对象
> 
> @property(nonatomic,readonly,copy) `NSArray` *subviews;
> 获得自己的所有子控件对象
> 
> @property(nonatomic) `NSInteger` tag;
> 控件的ID(标识)，父控件可以通过tag来找到对应的子控件
> 
> @property(nonatomic) `CGAffineTransform` transform;
> 控件的形变属性(可以设置旋转角度、比例缩放、平移等属性)
> 
> @property(nonatomic) `CGRect` frame;
> 控件所在矩形框在父控件中的位置和尺寸(以父控件的左上角为坐标原点)
> 可以定义控件的位置(`origin`)和大小(`size`)
> 
> @property(nonatomic) `CGRect` bounds;
> 控件所在矩形框的位置和尺寸(以自己左上角为坐标原点，所以bounds的x、y一般为0)
> 可以定义控件的大小(size)
> 
> @property(nonatomic) `CGPoint` center; 
> 控件中点的位置(以父控件的左上角为坐标原点)
> 可以定义控件的位置(center)

UIView的常见方法:
> - (void)addSubview:(UIView *)view;
> 添加一个子控件view
> 
> - (void)removeFromSuperview;
> 从父控件中移除
> 
> - (UIView *)viewWithTag:(NSInteger)tag;
> 根据一个tag标识找出对应的控件（一般都是子控件）

动画的实现方式:
简易动画大致有2种方式：
头尾式
```
[UIView beginAnimations:nil context:nil]; // 开启动画
[UIView setAnimationDuration:1]; // 设置动画执行时间
/** 需要执行动画的代码 **/
[UIView commitAnimations]; // 提交动画
```

Block式
```
[UIView animateWithDuration:0.5 animations:^{
    /** 需要执行动画的代码 **/
}];
```

通过以下属性可以修改控件的位置
`frame.origin`
`center`

通过以下属性可以修改控件的尺寸
`frame.size`
`bounds.size`

###transform属性
利用transform属性可以修改控件的位移（位置）、缩放、旋转
创建一个transform属性:
`CGAffineTransform CGAffineTransformMakeTranslation(CGFloat tx,  CGFloat ty) ;`

`CGAffineTransform CGAffineTransformMakeScale(CGFloat sx, CGFloat sy);`

`CGAffineTransform CGAffineTransformMakeRotation(CGFloat angle)`;
(注意：angle是弧度制，并不是角度制)

在某个transform的基础上进行叠加
`CGAffineTransform CGAffineTransformTranslate(CGAffineTransform t, CGFloat tx, CGFloat ty);`
`CGAffineTransform CGAffineTransformScale(CGAffineTransform t, CGFloat sx, CGFloat sy);`
`CGAffineTransform CGAffineTransformRotate(CGAffineTransform t, CGFloat angle);`

清空之前设置的transform属性
`view.transform = CGAffineTransformIdentity;`




















