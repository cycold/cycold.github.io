var data = [];
for (var k = 0; k < 3; k++) {
  data[k] = (function _helper(x) {
  return function () {
    console.log(x);
  };
})(k); // pass "k" value
}
// now it is correct
data[0](); // 0
data[1](); // 1
data[2](); // 2