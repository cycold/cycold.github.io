/**
 * 去除一个数组的重复元素,返回一个元素唯一化的数组
 */
function getUniquelizeArr(arr) {
  var ra = new Array()
  for (var i = 0, len = arr.length; i < len; i++) {
    ra.indexOf(arr[i]) === -1 && ra.push(arr[i])
  }
  return ra
}

/**
 * 返回一个数组中的重复的元素(每一个元素也都唯一)
 */
function getRepeatEleArr(arr) {
  var ra = new Array(), re = new Array()
  for (var i = 0, len = arr.length; i < len; i++) {
    ra.indexOf(arr[i]) === -1
      ? ra.push(arr[i])
      : re.indexOf(arr[i]) === -1 && re.push(arr[i])
  }
  return re
}

/**
 * 返回一个数组中的重复的元素(数组元素可以重复)
 * 按照原数组索引顺序返回
 */

function getRepeatAllArr(arr) {
  var indices = [], ra = new Array(), re = new Array(), rb = new Array()
  var a ,ridx
  for (var i = 0; i < arr.length; i++) {
    a = arr[i]
    ridx = ra.indexOf(a)
    if ( ridx === -1 ){
      ra.push(a)
    } else {
      re.indexOf(a) === -1 && re.push(a)
    }
  }
  var b, bidx
  for(var j = 0; j < re.length; j++){
    b = re[j]
    bidx = arr.indexOf(b)
    while (bidx !== -1) {
      indices.push(bidx)
      bidx = arr.indexOf(b, bidx + 1)
    }
  }
  indices = indices.sort(function(a,b){return a- b})
  for (var n = 0; n < indices.length; n++) {
    rb.push(arr[indices[n]])
  }
  return rb
}

/**
 * 返回数组中只出现一次的元素(没有和其他元素重复),单身汉
 */

function getSingleEleArr(arr) {
  var uniqueArr = getUniquelizeArr(arr)
  var repeatArr = getRepeatEleArr(arr)
  return getMinusArr(uniqueArr,repeatArr)
}

/**
 * 返回两个数组的交集
 */
function getIntersectArr(arr1, arr2) {
  arr1 = getUniquelizeArr(arr1)
  arr2 = getUniquelizeArr(arr2)
  var ra = []
  for (var i = 0; i < arr1.length; i++) {
    arr2.indexOf(arr1[i]) > -1 && ra.push(arr1[i])
  }
  return ra
}

/**
 * 返回两个数组的差集
 */
function getMinusArr(arr1, arr2) {
  arr1 = getUniquelizeArr(arr1)
  arr2 = getUniquelizeArr(arr2)
  var ra = []
  for (var i = 0; i < arr1.length; i++) {
    arr2.indexOf(arr1[i]) === -1 && ra.push(arr1[i])
  }
  return ra
}

// 判断两个数组是否相等
// isorder为是否严格按照顺序比较
function arrEqual(arr1, arr2, isOrder) {
  var result = false
  if(isOrder){
    if (arr1.length !== arr2.length) return false
    for (var i = 0; i < arr1.length; i++) {
      if ( arr1[i] !== arr2[i] ) return false
      result = true
    }
  } else {
    arr1 = getUniquelizeArr(arr1)
    arr2 = getUniquelizeArr(arr2)
    if (arr1.length !== arr2.length) return false
    for (var i = 0; i < arr1.length; i++) {
      if ( arr2.indexOf(arr1[i]) === -1 && arr1.indexOf(arr2[i]) === -1 ) return false
      result = true
    }
  }
  return result
}



var arr = [9,4,1,3,"Hello",7,'Hello',7,6,0,6,5,7,8,8,7,4,3,1]

console.log(arr)
console.log(getUniquelizeArr(arr))
console.log(getRepeatEleArr(arr))
console.log(getRepeatAllArr(arr))
console.log(getSingleEleArr(arr))
console.log(arrEqual([1,2,3],[1,2,3,3,2,1,3],false))