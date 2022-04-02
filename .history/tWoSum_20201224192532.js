function twoSum(nums, target) {
    const r = []
    var obj = {}
    for(var i=0;i < nums.length;i++){
        obj[nums[i]] = i
    }
    console.log(obj)
    for(var i = 0; i < nums.length; i++){
        index = obj[target - nums[i]]
        if(index !== undefined && index !== i){
            r.push([i,index])
        }
    }
    return r
}
const s = twoSum([1, 2, 3, 3,5, 2.5, 1.5, 4])
console.log(s)