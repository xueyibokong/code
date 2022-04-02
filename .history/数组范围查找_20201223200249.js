const arr = [
    [1,    2,   3],
    [4, 5, 6, 6.8],
    [7,  7.6,   9],
    [10,  14,  15]
]
// 输出 arr 中 6 的下标
function findInArr(arr, target) {
    let arr1 = [], index = 0
    arr.forEach((item, i) => {
        if (target >= item[0] && target <= item[item.length - 1]) {
            arr1 = item
            index = i
        }
    })
    let index1 = arr1.indexOf(target)
    if (index1 === -1) {
        return '[]'
    } else {
        return `[${index}, ${index1}]`
    }
}
findInArr(arr, 6)

const arr1 = [
    [1,2, 3, 15],
    [4,5,10,16],
    [7,8,11,17]
]
