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




// 执行组合排列的函数
function doExchange(array){
    var len = arr.length;
    // 当数组大于等于2个的时候
    if(len >= 2){
        // 第一个数组的长度
        var len1 = arr[0].length;
        // 第二个数组的长度
        var len2 = arr[1].length;
        // 2个数组产生的组合数
        var lenBoth = len1 * len2;
        // 申明一个新数组,做数据暂存
        var items = new Array(lenBoth);
        // 申明新数组的索引
        var index = 0;
        // 2层嵌套循环,将组合放到新数组中
        for(var i=0; i<len1; i++){
            for(var j=0; j<len2; j++){
                items[index] = arr[0][i] +"|"+ arr[1][j];
                index++;
            }
        }
        // 将新组合的数组并到原数组中
        var newArr = new Array(len -1);
        for(var i=2;i<arr.length;i++){
            newArr[i-1] = arr[i];
        }
        newArr[0] = items;
        // 执行回调
        return doExchange(newArr);
    }else{
        return arr[0];
    }
}

//执行
var array = [['a', 'b', 'c'], [1, 2, 3], ['x', 'y', 'z']];

console.log(doExchange(array));