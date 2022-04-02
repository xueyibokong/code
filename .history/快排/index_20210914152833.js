const arr = [1,5,3,11,9,13,15,22,12,2,4,66];

function fastSort (arr) {
    function _(_arr) {
        const index = Math.ceil(_arr.length / 2), temp = _arr[index];
        const left = [], right = [];
        _arr.forEach((item) => {
            item > temp ? right.push(item) : left.push(item);
        })
    }
}

