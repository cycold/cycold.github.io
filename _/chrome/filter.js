
// 过滤掉控制台中chrome插件的xhr请求: ^(?!.*?chrome-extension).*?$

var str = 
'XHR finished loading: GET "chrome-extension://pioclpoplcdbaefihamjohnefbikjilc/content/require/topFrame.js.\n' + 
'XHR finished loading: GET "chrome-extension://pioclpoplcdbaefihamjohnefbikjilc/content/Clipper.js".\n' + 
'XHR finished loading: GET "chrome-extension://pioclpoplcdbaefihamjohnefbikjilc/content/ContentPreview.js".\n' + 
'XHR finished loading: GET "http://localhost:9000/app/main/main.html".\n' + 
'XHR finished loading: GET "http://localhost:9000/app/main/menu/index.html".\n' + 
'XHR finished loading: GET "http://localhost:9000/app/common/role/index.html"'; 

// console.log(str);

/^(?!.*?chrome-extension).*?$/mg.test(str);  //true

var reg= /^(?!.*?chrome-extension).*?$/gm;
// console.log(reg)

var result = reg.exec(str);

console.log(result)

var myResult;
while ((myResult = reg.exec(str)) !== null) {
  var msg = 'Found ' + myResult[0] + '. ';
  msg += 'Next match starts at ' + reg.lastIndex;
  console.log(msg);
}



var myRe = /ab*/g;
var str = 'abbcdefabh';

var myArray;
while ((myArray = myRe.exec(str)) !== null) {
  var msg = 'Found ' + myArray[0] + '. ';
  msg += 'Next match starts at ' + myRe.lastIndex;
  console.log(msg);
}

console.log(myRe.exec(str));
