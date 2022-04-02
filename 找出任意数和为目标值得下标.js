var arr = [1, 2, 4, 3, 4.5, 5, 3.5, 3, 10, 11, 5, 6.5]

var arr1 = [1, 2, 3, 3, 2]

function query(arr, num) {
    const ls = subsets(arr)
    const r = []
    ls.forEach(item => {
        if (item.k.split(',').reduce((t, item) => t = Number(t) + Number(item)) === num) {
            const vs = item.v.split(',')
            vs.pop()
            r.push(vs)
        }
    })
    return r
}
console.log(query(arr1, 5))

/*
[
  [ '1', '2' ],
  [ '1', '3' ],
  [ '0', '1', '4' ],
  [ '2', '4' ],
  [ '3', '4' ]
]
*/


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
    let res = [], len = nums.length;
    for (let i = 0; i < (1 << len); i++) {
		let arr = [];
        for (let j = 0; j < len; j++) {
            if (i & (1 << j)) arr.push({
                v: nums[j],
                i: j
            });
        }
        let k = '', v = '';
        arr.forEach(item => {
            k += item.v + ','
            v += item.i + ','
        })
        res.push({k,v});
    }
    return res;
};