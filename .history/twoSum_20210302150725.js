function twoSum(nums, target) {
    const r = []
    const d = []
    var obj = {}
    for(var i = 0; i < nums.length; i++){
        const index = obj[target - nums[i]]
        if(index !== undefined && index !== i && d.indexOf(c) === -1){
            d.push(c)
            r.push([i,index])
        } else {
            obj[nums[i]] = i
        }
    }
    return r
}
const s = twoSum([1, 2, 3, 3,5, 2.5, 1.5, 4], 5)
console.log(s)