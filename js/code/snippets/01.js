window = {alert: console.log}
function arraysSimilar(arr1, arr2){
    if (getType(arr1) == '[object Null]' || getType(arr2) == '[object Null]')             return false
    if (getType(arr1) == '[object Undefined]' || getType(arr2) == '[object Undefined]') return false

    if (getType(arr1) != '[object Array]' ) arr1=[arr1];
    if (getType(arr2) != '[object Array]' ) arr1=[arr2];
    if (arr1.length != arr2.length) return false;
    function getType(value){
        if (value && value == window && value.alert) {
            return 'window'
        } else {
            return Object.prototype.toString.call(value);
        }
        
    }
    function conArr(array){
        var arr = [];
        for(var i = 0; i< array.length; i++){
            if ( i < array.length - 1){
                if( getType(array[i]) == getType(array[i + 1]) ){
                    arr.push(getType(array[i + 1]));
                }else {
                    arr.push(getType(array[i]));
                }
            } else {
                if ( arr.indexOf(getType(array[i])) < 0 )
                    arr.push(getType(array[i]))
            }
         
        }
        return arr;
    }

    //console.log(conArr(arr1))
    //console.log(conArr(arr2))

    var newArr1 = conArr(arr1), newArr2 = conArr(arr2);

    if (newArr1.length != newArr2.length) return false;

    for(var j = 0; j < newArr1.length; j++){
        if (newArr1.indexOf(newArr2[j]) < 0)
         return false;
    }
    for(j = 0; j < newArr2.length; j++){
        if (newArr2.indexOf(newArr1[j]) < 0)
         return false;
    }
    return true;
}

// arraysSimilar([2,false,'1',undefined,null,function(){},new Date(),window],["s",true,2,undefined,null,function(){},new Date(),window])
//var result = arraysSimilar([new Object,new Object,new Object],[{},{},null])
var result = arraysSimilar([window,1,true,new Date(),"hahaha",(function(){}),undefined],[undefined,(function(){}),"okokok",new Date(),false,2,window])

console.log(result)