```java
//类类型的变量一定指向对象, 要不就是null.
public static void show(Car c) {
    c.num = 3;
    c.color = "black";
    System.out.println(c.num+"..."+c.color);
}
```
