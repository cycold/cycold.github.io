
// var age = 1
// var name = 'baby'

// function checkscope() {
//   var age = 24
//   var name = 'eric'
//   var sex = 'male'
//   return function() {
//     console.log('age:', age)
//     console.log('name:', name)
//   }
// }

// var fun = checkscope();
// fun();


function main() {
  var age = 11;
  var name = 'Tom';

  function show() {
    age = 22;
  }

  show(age);

  console.log('age: ', age);  //age:  22
}

main();
