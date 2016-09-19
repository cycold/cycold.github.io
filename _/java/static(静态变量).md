```java

class Person
{
    String name;//成员变量，实例变量
    static String country = "CN";//静态变量。类变量 
    public  void show()
    {
        System.out.println(Person.country+":"+this.name);
    }
}


/*
static的特点：
1，static是一个修饰符，用于修饰成员。
2，static修饰的成员被所有的对象所共享。
3，static优先于对象存在，因为static的成员随着类的加载就已经存在了。 
4，static修饰的成员多了一种调用方式，就可以直接被类名所调用 。 类名.静态成员 。
5，static修饰的数据是共享数据，对象中的存储的是特有数据。

成员变量和静态变量的区别？
1，两个变量的生命周期不同。
    成员变量随着对象的创建而存在，随着对象的被回收而释放。
    静态变量随着类的加载而存在，随着类的消失而消失。

2，调用方式不同。
    成员变量只能被对象调用。
    静态变量可以被对象调用，还可以被类名调用。

3，别名不同。
    成员变量也称为实例变量。
    静态变量称为类变量。 

4，数据存储位置不同。
    成员变量数据存储在堆内存的对象中，所以也叫对象的特有数据.
    静态变量数据存储在方法区(共享数据区)的静态区，所以也叫对象的共享数据.



静态使用的注意事项：
1，静态方法只能访问静态成员。(非静态既可以访问静态，又可以访问非静态)
2，静态方法中不可以使用this或者super关键字。
3，主函数是静态的。





*/

class StaticDemo 
{
    int num = 4;
    public static void main(String[] args) 
    {
//      Person  p = new Person();
//      p.name = "小强";
//      p.show();
//      System.out.println(p.country);
//      System.out.println(Person.country);
//      Person.show();
        new StaticDemo().show();
    }

    public void show()
    {
        System.out.println(num);
    }
}

/*
静态什么时候用？
1，静态变量。
    当分析对象中所具备的成员变量的值都是相同的 。
    这时这个成员就可以被静态修饰。
    只要数据在对象中都是不同的，就是对象的特有数据，必须存储在对象中，是非静态的。
    如果是相同的数据，对象不需要做修改，只需要使用即可，不需要存储在对象中，定义成静态的。

2，静态函数。
    函数是否用静态修饰，就参考一点，就是该函数功能是否有访问到对象中的特有数据。
    简单点说，从源代码看，该功能是否需要访问非静态的成员变量，如果需要，该功能就是非静态的。
    如果不需要，就可以将该功能定义成静态的。当然，也可以定义成非静态，
    但是非静态需要被对象调用，而仅创建对象调用非静态的
    没有访问特有数据的方法，该对象的创建是没有意义。

*/

class Demo
{
    int age ;
    static int num = 9;
    Demo(int age)
    {
        this.age = age;
    }

    public static  void speak()
    {
        System.out.println(num);
    }
    public void show()
    {
        System.out.println(age);
    }

}

class  StaticDemo3
{
    public static void main(String[] args) 
    {
//      Demo d = new Demo(30);
//      d.speak();
        Demo.speak();

//      System.out.println("Hello World!");
    }
}

```
