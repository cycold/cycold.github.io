function Person() {
  this.p = 'p'
}
Person.prototype.pname = "pname"

function Student() {
  this.s = 's'
}
Student.prototype.sname = "sname"

Student.prototype = new Person();

var bosn = new Student();
console.log(bosn);

