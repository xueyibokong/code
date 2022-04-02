// 执行组合排列的函数
function getValuesByArray1 (array) {
    const arr = JSON.parse(JSON.stringify(array));
    function _r(arr){
        var len = arr.length;
        // 当数组大于等于2个的时候
        if(len >= 2){
            // 申明一个新数组,做数据暂存
            var items = [];
            // 2层嵌套循环,将组合放到新数组中
            for(var i = 0; i < arr[0].length; i++){
                for(var j = 0; j < arr[1].length; j++){
                    items.push(arr[0][i] + arr[1][j])
                }
            }
            arr.shift()
            arr.shift()
            arr.push(items)
            return _r(arr);
        }else{
            return arr[0];
        }
    }
    return _r(arr);
}

//执行
var array = [['a', 'b', 'c'], [1, 2, 3], ['x', 'y', 'z'], [5, 8]];

console.log(getValuesByArray1(array));