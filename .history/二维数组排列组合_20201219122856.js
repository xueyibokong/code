function serialArray(arr){
    var lengthArr = [];  
    var productArr = []; 
    var result = [];
    var length = 1;
    for(var i = 0; i < arr.length; i++){
        var len = arr[i].length;
        lengthArr.push(len);
        var product = i === 0
            ? 1 
            : arr[i - 1].length * productArr[i - 1];
        productArr.push(product);
        length *= len;
    }	
    for(var i = 0; i < length; i++){
        var resultItem = '';
        for(var j = 0; j < arr.length ; j ++){
                resultItem += arr[j][Math.floor(i / productArr[j]) % lengthArr[j]];
        }
        result.push(resultItem);
    }
    return result
}

var myArr = [['A','B','C'],['A1','B1','C1'],['A2','B2']];
console.log(serialArray(myArr));
var myArr1 = [['A','B','C'],['A1','B1','C1','D1','E1','F1'],['A2','B2','C2'],['A3','B3','C3','D3']];
console.log(serialArray(myArr1));
var myArr2 = [['A','B','C'],['A1','B1','C1','D1'],['A2','B2','C2']];
console.log(serialArray(myArr2));
    



/**
 * 获取【二维数组】的【排列组合】
*/
function getArrayByArrays(arrays) {
var arr = [""];        // 初始化第一个内层数组

/**
 * 遍历外层数组
*/
for (var index = 0; index < arrays.length; index++) {
    // console.log('外层数组索引 = ' + index);
    arr = getValuesByArray(arr, arrays[index]);
}

return arr;
}

function getValuesByArray(arr1, arr2) {
var arr = [];

/**
 * 遍历外层数组
*/
for (var index = 0; index < arr1.length; index++) {
    var value1 = arr1[index];

    /**
     * 遍历内层数组
    */
    for(var cursor = 0; cursor < arr2.length; cursor++) {
        var value2 = arr2[cursor];
        var value = value1 + ' - ' + value2;

        arr.push(value);
        console.log(arr);
    };
};

return arr;
};