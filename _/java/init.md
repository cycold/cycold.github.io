```java
class Hello {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```

#### 所有的java文件都是类文件,代码都写在java的类中,在java中类是first class
> 当类名被public修饰时,所在的文件名必须就是类名(强制规定,要不报错)

#### 当java文件中调用其他的类时,java虚拟机寻找类: 
> 1. 当有定义classpath环境变量时,首先就在classpath中寻找, 如果classpath环境变量
> `*nix classpath=/User/class:` `windows classpath=/User/class;` 中有写上路径分隔符('mac :, windows ;') 时,如果classpath没有找到类
> java编译器就会默认再在当前目录中在寻找一次.如果没有找到就报错. 如果环境变量中没有以路径分隔符. `classpath="/User/class"` 那么java编译器就只会
> 在classpath中寻找类文件,而不会在当前目录下寻找

```java
class Hello {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    
    // 这里有使用Person类,但是这个类没有在本文件中定义, 这就由java编译器去寻找这个类Person.
    // 如果有定义classpath就会在classpath路径下寻找,没有定义classpath就会在当前路径下寻找
    // 类文件 Person (注意和其他动态语言的区别,js中,就是Person必须声明,才能使用)
    // 而java中 Person并没有声明过,直接就拿来使用, 因为java程序就有一个一个小的class文件组成的.
    // 所有java编译器知道Person是一个类,它会自动找到Person.class, 并将其关联起来.这就是编译链接
    Person p = new Person(25) // 一般动态语言理解: Person到底从哪里来的? 有编译器自动去某一路径下寻找编译好的字节码文件Person.class, 找到了然后在编译进来

    // 一般java编译器还会做一步, 如果没有找到Person.class文件,但是在当前目录中有找到Person.java源文件,那么编译器就再多做一步将找到的源文件
    // 进行编译. 所以java程序中,引入的都不是源文件, 而是编译好的字节码文件

    // 在main函数中, 通过组合操作各种类,从而调动整个程序

    // 注意: java源代码中引入其他的类或者引入类,都是由编译器帮助其完成类的引入(只要告诉好编译器去哪里寻找类文件即可)
    // 最终都是引入编译好的类文件.所以java具有很好的安全性.给你一个类,都不是其实现源文件.而是编译好的一个类文件(字节码,二进制)
    // 你就是可以使用了,只要把这个类文件放在编译器能找的地方即可.你是看不到这个类的具体实现的.你只要知道使用即可.
  }
}
```

