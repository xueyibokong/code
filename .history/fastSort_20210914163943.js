const arr = [1, 5, 3, 11, 9, 13, 15, 22, 12, 2, 4, 66];

// function fastSort (arr) {
//     const index = Math.ceil(arr.length / 2), temp = arr[index];
//     const left = [], right = [];
//     arr.forEach((item) => {
//         item > temp ? right.push(item) : left.push(item);
//     })
//     return fastSort(left).concat(fastSort(right));
// }
var quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var pivot = arr[2];

    var left = [];

    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            
            right.push(arr[i]);
        }
    }
    quickSort(left)
    quickSort(right)
    console.log(left, right)
    // return quickSort(left).concat(quickSort(right));
};

console.log(quickSort(arr));
