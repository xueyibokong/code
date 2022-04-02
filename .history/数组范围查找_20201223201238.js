const arr = [
    [1,    2,   3],
    [4, 5, 6, 6.8],
    [7,  7.6,   9],
    [10,  14,  15]
]
// 输出 arr 中 6 的下标
function findInArr(arr, target) {
    let arr1 = [], index = 0, index1 = -1
    arr.forEach((item, i) => {
        if (target >= item[0] && target <= item[item.length - 1]) {
            if (item.indexOf(target) !== -1) {
                // 如果在此项中，则结束。如果不在则继续向下
                index = i
                index1 = item.indexOf(target) 
                arr1.push([index, index1])
            }
        }
    })
    
   return arr1
}
// findInArr(arr, 6)

const arr1 = [
    [1,2, 3, 15],
    [4,5,10,16],
    [7,8,10,11,17]
]
console.log(findInArr(arr1, 10))
