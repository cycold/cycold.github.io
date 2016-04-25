https://segmentfault.com/a/1190000002490633

```
如果缩写「flex: 1」, 则其计算值为「1 1 0%」
如果缩写「flex: auto」, 则其计算值为「1 1 auto」
如果「flex: none」, 则其计算值为「0 0 auto」
如果「flex: 0 auto」或者「flex: initial」, 则其计算值为「0 1 auto」，即「flex」初始值
```

`注意;flex-basis`值必须是要有单位,或者是百分比值

flex-item的宽度计算：
主要是由：`flex-grow`,`flex-shrink`,`flex-basis`决定
```html
h1{font:bold 20px/1.5 georgia,simsun,sans-serif;}
.box{
  display:-webkit-flex;
  display:flex;
  width:400px;height:100px;margin:10px 0 0;padding:0;border-radius:5px;list-style:none;background-color:#eee;
}
#box4 li:nth-child(1){flex:1 2 120px;}
#box4 li:nth-child(2){flex:3 4 300px;}
#box4 li:nth-child(3){flex:5 6 500px;}

#box5 li:nth-child(1){flex:1 2 50px;}
#box5 li:nth-child(2){flex:3 4 100px;}
#box5 li:nth-child(3){flex:5 6 200px;}

<ul id="box4" class="box">
  <li>flex:1 2 120px;</li>
  <li>flex:3 4 300px;</li>
  <li>flex:5 6 500px;</li>
</ul>

<ul id="box5" class="box">
  <li>flex:1 2 50px;</li>
  <li>flex:3 4 100px;</li>
  <li>flex:5 6 200px;</li>
</ul>
```

`flex`属性其实是由flex-grow, flex-shrink, flex-basis三个属性的缩写。按顺序排列

flex: <flex-grow>, <flex-shrink>, <flex-basis>

当一个容器声明为：`display: flex`时，其默认的子元素的flex值为：`flex: 0 1 auto`;

`flex-grow`:设定 flex子元素 如何分配父元素剩余的空间因子。不能为负值。计算时是一个因子，因此不能大于1，这里设定的的值可以虽然是任意整数，
            但是这个整数不是最终计算时的因子。只是所占的一个比重，比如设置为2，表示在所有的flex子元素中，占比为2成。
            通常需要设置flex子元素的基准宽度：flex－basis
            注意：如果父元素的空间没有各子元素的空间（设置的flex－basis）之和大时，也就是子元素的宽度要比父元素的宽度大时，此时又该如如何分配呢？
            此时将从`flex-shrink`的层面来进行计算，因为此时不再时从基准加多少了，而是从基准减去多少了

`所以对于同时设置了flex－grow，felx－shrink时,是以哪个进行计算呢？这就取决于各个flex子项目的flex-basis之和是大于还是小于父容器的宽度了,`
`如果大于富容器宽度,那么flex-grow设置值无效,小于富容器,那么flex-shrink设置值无效  `

以上的box4，flex-basis之和已经超出了富容器的宽度(400px)之和了,所以前面设置的flex-grow(1,3,5)就没有参与后面的计算
因为此时要考虑每个子元素在其基准上(flex-basis)减去多少才能刚好填充400px

```
无论是处于shrink,还是grow模式时,首先需要确定的值就是子元素的宽度(flex-basis)超出了富容器的值(此为绝对值)
`over-flow_value = Math.abs(flex-container.width - Sum(flex-basis))`
比如对于以上的box4 
`over-flow_value = 400 - (120 + 300 + 500) = -520`
这里的over-flow为负值,说明此时进入shrink模式
当处于shrink模式时(grow-flex设置的值无效): 分别计算每一个flex子项目的宽度时,分为两步,
第一步计算每一个子项目应该shrink多少?
shrink_value = over-flow_value * ( (flex-shrink * felx-basis) / Sum(felx-shrink*flex - basis) )
比如对于以上的box4 , 第一个子元素<li>flex:1 2 120px;</li>的
shrink_value = 520 * ( 2 * 120 / (2*120 + 4 * 300 + 6 * 500) = 28.108108
第二步才是计算元素实际的宽度
width = flex-basis - shrink_value = 120 - 28.108108 = 91.89189
```

```
对于flex-grow模式,就容易理解些: 
比如上面的box5
`over-flow_value = 400 - (50 + 100 + 200) = 50`
现在就是要怎么分配这多出来的50px呢?就按照声明的flex-grow的值分配
比如第一个元素的
grow_value = 1 / (1+3+5) * 50 = 5.55555
所以第一个元素的宽度为
width = flex-basis + grow_value = 50 + 5.555 = 55.555
```

`注意`: 
计算富容器的剩余空间(over-flow_value),还要减掉没有`显示`声明flex属性的子元素的宽度,一般他们的宽度都是默认值





