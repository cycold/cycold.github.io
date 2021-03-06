C语言中的变量，按作用域范围可分为两种，即`局部变量`和`全局变量`

`局部变量`也称为`内部变量`。局部变量是在`函数内`作定义说明的。其作用域仅限于函数内， 
离开该函数后再使用这种变量是非法的。在`复合语句`中也可定义变量，其作用域只在`复合语句范围内`

`全局变量`也称为`外部变量`，它是在函数外部定义的变量。
它不属于哪一个函数，它属于一个`源程序文件`。其作用域是整个源程序。


C语言根据变量的生存周期来划分，可以分为`静态存储方式`和`动态存储方式`.
静态存储方式：是指在程序运行期间分配固定的存储空间的方式。静态存储区中存放了在整个程序执行过程中都存在的变量，如全局变量
动态存储方式：是指在程序运行期间根据需要进行动态的分配存储空间的方式。动态存储区中存放的变量是根据程序运行的需要而建立和释放的，
通常包括：函数`形式参数`；`自动变量`；`函数调用时的现场保护`和`返回地址`等。

C语言中存储类别又分为四类：自动（`auto`）、静态（`static`）、寄存器的（`register`）和外部的（`extern`)

1、用关键字`auto`定义的变量为自动变量，auto可以省略，auto不写则隐含定为“自动存储类别”，属于动态存储方式。如：
```c
int func(int a){
    auto int a, b; //定义b,c 为自动变量
    int x; // 隐含定义为: auto变量
}
// 一般默认都是auto变量
```

2、用`static`修饰的为静态变量，如果定义在函数内部的，称之为静态局部变量；如果定义在函数外部，称之为静态外部变量。如下为静态局部变量：
> 注意：静态局部变量属于静态存储类别，在静态存储区内分配存储单元，在程序整个运行期间都不释放；静态局部变量在编译时赋初值，即`只赋初值一次`；
> 如果在定义局部变量时不赋初值的话，则对静态局部变量来说，编译时`自动赋初值0`（对数值型变量）或`空字符`（对字符变量）。


3、为了提高效率，C语言允许将`局部变量`得值放在CPU中的寄存器中，这种变量叫`寄存器变量`，用关键字`register`作声明。例如：
```c
void fn(){
    register int i; // 定义i为寄存器类型变量
}
```

> 注意：只有局部自动变量和形式参数可以作为寄存器变量；一个计算机系统中的寄存器数目有限，
> 不能定义任意多个寄存器变量；`局部静态变量不能定义为寄存器变量`

4、用`extern`声明的的变量是`外部变量`，外部变量的意义是某函数可以调用在该函数之后定义的变量.
> 我们知道,如果一个变量在函数后面申明的话,函数是不能调用的,比如下面的 `int x`; 但是 `int y`是可以在函数中调用的,它是在函数前面声明,
> 如果需要调用x, 他们可在函数内声明其为外部变量: `extern int x`; 

```c
#include <stdio.h>
void fn()
{
    static int x = 1;   //定义静态局部变量
    x *=2;
    printf("x=%d\n",x);
    printf("x=%p\n",&x);
}

int y = 101;

int main()
{
    int i;
    for(i=0;i<5;i++)
    {
        fn();
    }
    extern int x;      //调用外部变量
    // extern int y;      //调用外部变量
    printf("x=%d\n",x);
    printf("y=%d\n",y);
    return 0;
}
int x=100;
```

