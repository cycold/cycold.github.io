class Demo {
  public static void main(String[] args){
    int age = 11;
    String name = "Tom";
    show(age);
    System.out.println("age: " + age);   // age: 11
  }

  public static void show(int age){
    age = 22;
  }
}