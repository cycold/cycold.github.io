苹果开发者网络:
https://developer.apple.com/cn/

#### 文档模拟器安装路劲:

1.离线文档安装路径(用哪个都行)
路径1:
`/Applications/Xcode.app/Contents/Developer/Documentation/DocSets`
路径2:
`/Users/Steve/Library/Developer/Shared/Documentation/DocSets`

文档安装完毕后简单演示:
* User Experience -> Guides
* AppIcons on iPad and iPhone
* Auto Layout Guide
* iOS 7 UI Transition Guide
* iOS Human Interface GuideLines
iOS8.1 -> General -> Guides -> 马上着手开发iOS应用程序

2.模拟器安装路径
`/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs`

3.标签注释:
`#paragm mark - ` 标注文档
`#warning`  + 警告提示(这将人为的编译器添加警告提示)

文件检查器（File Inspector）:这个特性非常很少使用。看个人爱好，你可以点击打开或关闭自动布局和配置本地化。
快速帮助（Quick Help）:这个特性很少使用，可链接到你所选中项目的相关文档。
识别检查器（Identity Inspector）：一个很有用的功能，身份检查器用于访问和设置自定义视图类。
属性检查器（Attributes Inspector）：我使用它最多。可以配置所选项目的属性，例如标签文本、背景颜色以及alpha值等。
尺寸检查器（Size Inspector）：另一个有用的功能，可协助你查看和编辑自动布局约束。
连接检查器（Connections Inspector）：此功能的使用频率取决于你IBOutlet的工作流程，可用来连接和查看IBOutlets。
 