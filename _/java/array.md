```java
// 数组
// 明确数组的元素
int[] arr = {4,1,8,7,3,8,2};
int[] arr = new int[]{89,34,270,17};
int[] arr = {89,34,270,17};

// 不明确数组的元素
int[] arr = new int[3];

//创建一个二维数组，该数组中有3个一维数组，每一个一维数组中有2个元素。
int[][] arr = new int[3][2];
System.out.println(arr);//直接打印二维数组。   [[I@c17164
System.out.println(arr[0]);//直接打印二维数组中的角标0的一维数组。 [I@1fb8ee3
System.out.println(arr[0][0]);//直接打印二维数组中的角标0的一维数组中角标为0的元素。 0

int[] arr = new int[3];  
System.out.println(arr);//[I@1fb8ee3  @左边是实体的类型。 @右边是实体的哈希值。

int[][] arr = new int[3][];
System.out.println(arr);//直接打印二维数组。   [[I@c17164
System.out.println(arr[0]);//直接打印二维数组中的角标0的一维数组。null
System.out.println(arr[0][0]);//直接打印二维数组中的角标0的一维数组中角标为0的元素。 NullPointerException

int[][] arr = new int[3][2];
System.out.println(arr.length);//打印二维数组的长度。其实就是一维数组的个数。
System.out.println(arr[1].length);//打印二维数组中角标为1一维数组的长度。

int sum = 0;
int[][] arr = {{3,1,7},{5,8,2,9},{4,1}};
```
