http://www.webhek.com/misc/mastering-nth-child/?utm_source=tuicool&utm_medium=referral
http://www.tuicool.com/articles/2eIn6jF

精通:nth-child

:nth-child 基本用法

:nth-child

:nth-child(8)

选中第8个子元素


li:nth-child(8) span {
    background-color: #298EB2;
    box-shadow: -3px -3px 10px rgba(0, 0, 0, 0.4), inset 0 0 10px black;
}
使用 :nth-child(8) 可以让你选中父元素下唯一的第8个子元素

:nth-child 范围用法

正方向范围

:nth-child(n+6)

选中从第6个开始的子元素


li:nth-child(n+6) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
使用 :nth-child(n+6) ，就相当于让你选中第6个 :nth-child(6) 和其后的所有子元素

负方向范围

:nth-child(-n+9)

选中从第1个到第9个子元素


li:nth-child(-n+9) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
使用 :nth-child(-n+9) ，就相当让你选中第9个和其之前的所有子元素

前后限制范围

nth-child(n+4):nth-child(-n+8)

选中第4-8个子元素


li:nth-child(n+4):nth-child(-n+8) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
使用 nth-child(n+4):nth-child(-n+8) 我们可以选中某一范围内子元素，上面的例子里是从第4个到第8个子元素

范围高级用法

nth-child(n+2):nth-child(odd):nth-child(-n+9)

奇数位/偶数位子元素


li:nth-child(n+2):nth-child(odd):nth-child(-n+9) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
使用 nth-child(n+2):nth-child(odd):nth-child(-n+9) 我们将会选中的子元素是从第2位到第9位，并且只包含奇数位。

nth-child(3n+1):nth-child(even) 间隔选择子元素


li:nth-child(n+2):nth-child(odd):nth-child(-n+9) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
使用 :nth-child(3n+1) 我们可以每隔3个选中一个，也就是第 1, 4, 7 和 10 个子元素，但通过使用 :nth-child(even) 我们过滤掉了奇数位子元素，也就是 1 和 7，于是，剩下的子元素只有 4 和 10。

:nth-of-type 的用法

:nth-of-type

:nth-of-type(3)

指定要求相同的子元素类型


/* 用蓝色圆斑表示 */
span:nth-of-type(3) {
  background-color: #298EB2;
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}

/* 用桔色方块表示 */
div:nth-of-type(4) {
  background-color: #E17149:
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black; 
}
使用 :nth-of-type() ，我们可以指定相同的子元素类型，然后再选择。

:nth-of-type 范围用法

正方向相同子元素类型范围

span:nth-of-type(n+3)

div:nth-of-type(2n+2)


/* 用蓝色圆斑表示 */
span:nth-of-type(n+3) {
  background-color: #298EB2;
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}

/* 用橘色方块表示 */
div:nth-of-type(2n+2) {
  background-color: #E17149:
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black; 
}
使用 span:nth-of-type(n+3) 或 div:nth-of-type(2n+2) ，首先指定是相同的子元素类型，然后在这些类型里选择...

负方向相同子元素类型范围

span:nth-of-type(-n+4)

div:nth-of-type(-n+5)


/* 用蓝色圆斑表示 */
span:nth-of-type(-n+4) {
  background-color: #298EB2;
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}

/* 用橘色方块表示 */
div:nth-of-type(-n+5) {
  background-color: #E17149:
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black; 
}
使用 span:nth-of-type(-n+4) or div:nth-of-type(-n+5) ，首先指定是相同的子元素类型，然后在这些类型里选择...

前后范围限制相同子元素类型

span:nth-of-type(n+3):nth-of-type(-n+6)

div:nth-of-type(n+1):nth-of-type(-n+3)


/* 用蓝色圆斑表示 */
span:nth-of-type(n+3):nth-of-type(-n+6) {
  background-color: #298EB2;
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}

/* 用橘色方块表示 */
div:nth-of-type(n+1):n-th-of-type(-n+3) {
  background-color: #E17149:
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
使用 :nth-of-type(n+3):nth-of-type(-n+6) 和 div:nth-of-type(n+1):nth-of-type(-n+3) ，首先指定是相同的子元素类型，然后在这些类型里选择...这个例子中选中的将会是第 1-3 和 3-6 个子元素。

高级相同子类型加前后范围限制用法

span:nth-of-type(n+3):nth-of-type(odd):nth-of-type(-n+6)

div:nth-of-type(n+1):nth-of-type(even):nth-of-type(-n+3)


/* 用蓝色圆斑表示 */
span:nth-of-type(n+3):nth-of-type(odd):nth-of-type(-n+7) {
  background-color: #298EB2;
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}

/* 用橘色方块表示 */
div:nth-of-type(n+1):nth-ofo-type(even):nth-of-type(-n+3)  {
  background-color: #E17149:
  box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black; 
}
使用 span:nth-of-type(n+3):nth-of-type(odd):nth-of-type(-n+6) 和 div:nth-of-type(n+1):nth-of-type(even):nth-of-type(-n+3) ，你既能够限制是在相同类型子元素里选择，同时指定选择的起始位置和结束位置。这里同时使用了奇偶位限制。所有，最后剩下的是方 3 & 5 和 圆 2。