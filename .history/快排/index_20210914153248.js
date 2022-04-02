const arr = [1,5,3,11,9,13,15,22,12,2,4,66];

function fastSort (arr) {
    const index = Math.ceil(arr.length / 2), temp = arr[index];
    const left = [], right = [];
    arr.forEach((item) => {
        item > temp ? right.push(item) : left.push(item);
    })
    return fastSort(left).concat(fastSort(right));
}

console.log(fastSort(arr));
