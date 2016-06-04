
function foo() {
  console.log(foo);
  console.log(foo === boo);
  var x = 10;

  (function bar() {
    console.log(x); // 20, but not 10, as don't reach AO(foo)  node中为10
    // "x" is resolved by the chain:
    // AO(bar) - no -> __specialObject(bar) -> no
    // __specialObject(bar).[[Prototype]] - yes: 20
  })();

}
Object.prototype.x = 20;
var boo = foo;
foo();