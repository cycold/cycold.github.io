var foo = function _foo() {
  console.log("Hello");
  console.log(_foo); //[Function: _foo]
  console.log(foo === _foo); //true
  console.log(foo.prototype.constructor === _foo); //true
}

foo();

//console.log(_foo) // ReferenceError: _foo is not defined