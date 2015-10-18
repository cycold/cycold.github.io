function buildList(list) {
    var result = [];
    var tmp = 12;
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function() {console.log(item + ' ' + list[i])} );
        console.dir(result[i]);
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // Using j only to help prevent confusion -- could use i.
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
testList();

console.log('-------');

function buildList() {
    var list = [1,2,3];
    var result = [];
    var tmp = 12;

    var i = 0;
    var item = 'item' + list[i];
    result[0] = function(){console.log(item + " " + list[i])};

    i = 1;
    item = 'item' + list[i];
    result[1] = function(){console.log(item + " " + list[i])};

    i = 2;
    item = 'item' + list[i];
    result[2] = function(){console.log(item + " " + list[i])};

    i = 3;

    return result;
}

buildList()[0]();   //item3 undefined
buildList()[1]();   //item3 undefined
buildList()[2]();   //item3 undefined