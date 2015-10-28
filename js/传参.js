// 将传递的参数,首先使用&取得其引用
 var arr = [1,2,3];
 var str = "helo";
 var value = 0;
 function boo(a, v, s) {
  a[3] = '4';
  v = 11;
  s = s + 'world';
  console.log(a);
  console.log(v);
  console.log(s);
 }
 boo(arr,value,str);
 console.log(arr);  //[ 1, 2, 3, '4' ]
 console.log(value); //0
 console.log(str); //0