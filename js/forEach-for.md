```js
function f(){
    var f = 0;
    for(var i = 0; i < 5; i++){
        if (i == 3) {
            return f = i;  // for语句中return会退出整个函数
            //break;
        }
    }
    f = 2;
    console.log('hello');
    return f;
}

console.log(f());

function ff(){
    var arr = [1,2,3,4,5];

    arr.forEach(function(v,index){
        if (index == 4) {
            console.log(index)
            return index;  //forEach中的return语句只是退出当前的回调函数
        }
    });

    console.log('hello');
    return true;
}
ff();
```