Object.prototype.x = 10;
Object.prototype.y = 1;
var y = 4;
function foo() {
  var x = 20;
  Object.prototype.x = 12;
  // function declaration
  function bar() {
    console.log(x);
    Object.prototype.y = 2;
    !function() {
      console.log(y); // 3
    }()
  }
  bar(); // 20, from AO(foo)
}

foo();