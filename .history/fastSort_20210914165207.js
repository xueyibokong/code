const arr = [1, 5, 3, 2, 4, 11, 9, 13, 15, 22, 12, 2, 4, 66];

/**
 * ! 为什么要从数组取出标志位项？因为保证最小单位数组为0 | 1项，如果不取出，最小数组会出现2项，跳出递归条件就需要改为 <=2,如此的话有2项的最小单位数组就无法触发分左右排序。
 * 快排，采用左右数组方式，空间复杂度高
 * @param {*} arr 
 * @returns 
 */
function fastSort (arr) {
    if (arr.length <= 1) return arr;
    const index = 0, temp = arr[index];
    const left = [], right = [];
    arr.forEach((item, i) => {
        if (i === index) return
        item > temp ? right.push(item) : left.push(item);
    })
    return fastSort(left).concat([temp], fastSort(right));
}

console.log(fastSort(arr));
