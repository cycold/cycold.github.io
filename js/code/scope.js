var y = {x:4};

function fun(arg) {
  var z = 2;

  with(y) {
    console.log(z);
    z = function(str) {
      console.log(str);
    };
    console.log(x);
    console.log(y);
  }
}

fun();
console.log(y);

 fun();