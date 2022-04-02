/*
本文实例讲述了JS基于贪心算法解决背包问题。分享给大家供大家参考，具体如下：

贪心算法：在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的仅是在某种意义上的局部最优解。

寻找最优解的过程，目的是得到当前最优解

部分背包问题：固定容积的背包能放入物品的总最大价值

物品 A B C D
价格 50 220 60 60
尺寸 5 20 10 12
比率 10 11 6 5

按比例降序尽可能多放入物品

这个可以解决《完全背包问题》https://www.jianshu.com/p/ab89df9759c8
*/

function greedy(values, weights, capacity) {
    var returnValue = 0
    var remainCapacity = capacity
    var sortArray = []
    values.forEach((cur, index) =>{
      sortArray.push({
        'value': values[index],
        'weight': weights[index],
        'ratio': values[index]/weights[index]
      })
    })
    sortArray.sort(function(a, b){
      return b.ratio - a.ratio
    })
    console.log(sortArray)
    sortArray.forEach((cur,index) => {
        var num = parseInt(remainCapacity/cur.weight)
        console.log(remainCapacity/cur.weight, num)
        remainCapacity -= num * cur.weight
        console.log('remainCapacity', remainCapacity)
        returnValue += num * cur.value
        console.log('returnValue', returnValue)
    })
    return returnValue
}
var items = ['A','B','C','D']
var values = [50,220,60,60]
var weights = [5,20,10,12]
var capacity = 32 //背包容积
console.log(greedy(values, weights, capacity)) // 320
  

/*
这个贪心算法利用价值比和剩余背包空间做子项最优解，有准确率问题，如下：
可以正确输出的数据：
[
  { value: 220, weight: 20, ratio: 11 },
  { value: 50, weight: 5, ratio: 10 },
  { value: 60, weight: 10, ratio: 6 },
  { value: 60, weight: 12, ratio: 5 }
]

不可以正确输出的数据，当数据为
[
  数据1{ value: 220, weight: 20, ratio: 11 },
  数据2{ value: 50, weight: 5, ratio: 10 },
  数据3{ value: 120, weight: 6, ratio: 10 },
  { value: 60, weight: 10, ratio: 6 },
  { value: 60, weight: 12, ratio: 5 }
]
当背包放入1个数据1， 2个数据2，后空间只剩余2了，这时候就放不下数据3了（因为数据3的重量是6），但是最优解应该是1个数据1 + 2个数据2，总价值340，高于320。
优化，排序那里先通过价值比排序倒序，再通过重量顺序
*/ 
