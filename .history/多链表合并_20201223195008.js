/*
n个链表，链表均长m，合并链表
1->2->3
4->5->6
...
*/

function merge (listArr) {
    let arr = []
    let min = Infinity
    let ii = -1
    for (let i = 0; i < listArr.length; i++) {
        const arr = listArr[i]
        if (arr[0] < min) {
            min = arr[0]
            ii = i
        }
    }
    arr.push(listArr[ii].shift())
    console.log(min)
}


const r = merge([
    [1, 3, 6],
    [2, 3, 5],
    [1, 2, 4]
])
console.log(r)