```c
#include <stdio.h>

struct sct {
  int a, b;
  char c;
}sct_g;

// sct_g 即创建一个结构体的同时, 创建一个全局变量sct_g

// 如果有在前面加上typedef关键字,那么就变成了 struct sct2 的类型别名

typedef struct sct2 {
  int a, b;
  char c;
}sct_g2;

int main() {
  struct sct s1 = {1,2,'c'};
  printf("%d %d %c\n", s1.a, s1.b, s1.c);

  struct sct * p = &s1;

  s1.a = 20;
  p->a = 21;

  printf("%d %d %c\n", (*p).a, (*p).b, (*p).c);

  printf("%d %d %c\n", p->a, p->b, p->c);


  // 这个变量 就是 struct sct sct_g = {0,0,''};
  sct_g.b = 21;
  printf("%d %d %c\n", sct_g.a, sct_g.b, sct_g.c);


  return 0;
}
```