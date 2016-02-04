
`typedef`是一个关键字,用来给变量类型取别名

注意: 这是有作用域限制的.(每一个大括号{}都是单独的作用域);

```c
#include <stdio.h>

typedef int i_t; 

typedef int * p;

typedef int (*pointer_t)[10]; 

int * xx[10]; // 一个指针数组

// 如果加上typedef 就变成这种类型别名
typedef int * XX[10]; 

// man手册中常见的类型: size_t,其实就是通过typedef定义的别名
typedef unsigned long size_t;

int main(){
    i_t age = 25;

    // p已经变成一种类型的别名
    p q = &age;

    // pointer_t 也是一种类型的别名(这里是指向数组的指针)
    pointer_t x= NULL;

    // 用 XX类型声明一个变量
    XX b;

    printf("%lu\n", sizeof(b)); // 80
    printf("%lu\n", sizeof(b[0])); // 是一个指针 8

    return 0;
}

```