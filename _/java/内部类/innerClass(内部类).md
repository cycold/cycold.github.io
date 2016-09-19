```java
/*
内部类访问特点：
1，内部类可以直接访问外部类中的成员。
2，外部类要访问内部类，必须建立内部类的对象。


一把用于类的设计。

分析事物时，发现该事物描述中还有事物，而且这个事物还在访问被描述事物的内容。
这时就是还有的事物定义成内部类来描述。

注意:内部类也会生成类文件
`编译时生成的类文件`: Outer$Inner.class

*/
class Outer
{
    private static int num = 31;

    class Inner// 内部类。
    {
        void show()
        {
            System.out.println("show run..."+num);
        }
        /*static void function()//如果内部类中定义了静态成员，该内部类也必须是静态的。
        {
            System.out.println("function run ...."+num);
        }
        */
    }

    public void method()
    {
        Inner in = new Inner();
        in.show();
    }
}


class InnerClassDemo
{
    public static void main(String[] args) 
    {
//      Outer out = new Outer();
//      out.method();
        //直接访问外部类中的内部类中的成员。
//      Outer.Inner in = new Outer().new Inner();
//      in.show();

        //如果内部类是静态的。 相当于一个外部类
//      Outer.Inner in = new Outer.Inner();
//      in.show();

        //如果内部类是静态的，成员是静态的。
//      Outer.Inner.function();
        
    }
}








/*
为什么内部类能直接访问外部类中成员呢？
那是因为内部类持有了外部类的引用。  外部类名.this

*/
class Outer
{
    int num = 3;
    class Inner
    {
        int num = 4;
        void show()
        {
            int num = 5;
            System.out.println(Outer.this.num);
        }
    }
    void method()
    {
        new Inner().show();
    }
}


class InnerClassDemo2 
{
    public static void main(String[] args) 
    {
        new Outer().method();
    }
}


/*
内部类可以存放在局部位置上。 
内部类在局部位置上只能访问局部中被final修饰的局部变量。
*/


class Outer
{
    int num = 3;
    Object method()
    {

        final int x = 9;

        class Inner
        {
            public String toString()
            {
                return "show ..."+x;
            }
        }

        Object in = new Inner();
        return in;//0x0045
//      in.show();
    }


    
}

class InnerClassDemo3 
{
    public static void main(String[] args) 
    {
        Outer out = new Outer();
        Object obj = out.method();
        System.out.println(obj);

    }
}
/*

class Fu extends Object
{
}
class zi extends Fu
{
}

Fu f = new zi();

Object o = new Fu();
*/

```
