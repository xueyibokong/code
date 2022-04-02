// 输出和为目标值的值下标
function twoSum(nums, target) {
    const r = []
    var obj = {}
    for(var i = 0; i < nums.length; i++){
        const index = obj[target - nums[i]]
        const c = i + index
        if(index !== undefined && index !== i){
            r.push([i,index])
        } else {
            obj[nums[i]] = i
        }
    }
    console.log(obj)
    return r
}
const s = twoSum([1, 2, 3, 3, 5, 2.5, 1.5, 4, 2.5, 2.5, 3], 5)
// [ [ 2, 1 ], [ 3, 1 ], [ 7, 0 ], [ 8, 5 ], [ 9, 5 ], [ 10, 1 ] ]
console.log(s)