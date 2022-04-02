const arr = [1, 5, 3, 2, 4, 11, 9, 13, 15, 22, 12, 2, 4, 66];

/**
 * ! 为什么要从数组取出标志位项？因为保证最小单位数组为0 | 1项，如果不取出，最小数组会出现2项，跳出递归条件就需要改为 <=2,如此的话有2项的最小单位数组就无法触发分左右排序。
 * 快排，采用左右数组方式，空间复杂度高
 * @param {*} arr
 * @returns
 */
function fastSort (arr) {
    if (arr.length <= 1) return arr;
    const index = 0, temp = arr.splice(index, 1)[0];
    const left = [], right = [];
    arr.forEach((item, i) => {
        item > temp ? right.push(item) : left.push(item);
    })
    return fastSort(left).concat([temp], fastSort(right));
}

/**
 * 频繁splice，性能受影响。改造如下：
 */

function fastSort (arr) {
    if (arr.length <= 1) return arr;
    const index = 0, temp = arr[index]; // 不取出
    const left = [], right = [];
    arr.forEach((item, i) => {
        if (i === index) return; // 跳出
        item > temp ? right.push(item) : left.push(item);
    })
    return fastSort(left).concat([temp], fastSort(right));
}

/**
 * 优化空间复杂度，不采用left、right数组
 */

var devide_Xin = function (array, start, end) {
    if(start >= end) return array;
    var baseIndex = Math.floor((start + end) / 2), // 基数索引
        i = start,
        j = end;

    while (i <= j) {
        while (array[i] < array[baseIndex]) {
            i++;
        }
        while (array[j] > array[baseIndex])  {
            j--;
        }

        if(i <= j) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
            j--;
        }
    }
    return i;
}

var quickSort_Xin = function (array, start, end) {
    if(array.length < 1) {
        return array;
    }
    var index = devide_Xin(array, start, end);
    if(start < index -1) {
        quickSort_Xin(array, start, index - 1);
    }
    if(end > index) {
        quickSort_Xin(array, index, end);
    }

    return array;
}