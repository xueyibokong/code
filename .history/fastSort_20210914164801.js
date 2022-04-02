const arr = [1, 5, 3, 2, 4, 11, 9, 13, 15, 22, 12, 2, 4, 66];

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
