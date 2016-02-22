
虽然，每一个UI控件都有自己的独特属性，但是有些属性是每个UI控件都具备的，
比如每一个UI控件都有自己的
`位置`, `尺寸`、`父控件`、`子控件`
于是，`所有的UI控件最终都继承自UIView`，
UI控件的公共属性都定义在UIView中，比如：
`frame` ：位置和尺寸
`center` ：中心点位置

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
> 从父控件中移除(必须是自控件自己调用,自己让自己移除)
> 
> - (UIView *)viewWithTag:(NSInteger)tag;
> 根据一个tag标识找出对应的控件（一般都是子控件