function serialArray(arr){
    var lengthArr = [];  
    var productArr = []; 
    var result = [];
    var length = 1;
    for(var i = 0; i < arr.length; i++){
        var len = arr[i].length;
        lengthArr.push(len);
        var product = i === 0 ? 1 : arr[i - 1].length * productArr[i - 1];
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
    