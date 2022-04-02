/*
从一副扑克牌中随机抽取5张牌 判断这五张牌是否是一个同花顺
同花顺：点数连续 花色相同
大小王可以当做任意点数任意花色的牌
{
    v: 1,
    color: 'red',
    isJoker: false
}
*/

var a1 = [{ "v": 3, "color": "r" }, { "v": 1, "color": "r" }, { "v": 2, "color": "r" }, { "v": 5, "color": "r" }, { "v": 4, "color": "r" }], // true
    a2 = [{ "v": 7, "color": "r" }, { "v": 1, "color": "r" }, { "v": 2, "color": "r" }, { "v": 5, "color": "r" }, { "v": 4, "color": "r" }], // false 不连续
    a3 = [{ "v": 3, "color": "r" }, { "v": 1, "color": "g" }, { "v": 2, "color": "r" }, { "v": 5, "color": "r" }, { "v": 4, "color": "r" }], // false 不同色
    a4 = [{ isJoker: true }, { "v": 1, "color": "r" }, { "v": 2, "color": "r" }, { "v": 5, "color": "r" }, { "v": 4, "color": "r" }], // true 有一张王，中间缺数据补中
    a5 = [{ isJoker: true }, { "v": 1, "color": "r" }, { "v": 2, "color": "r" }, { "v": 3, "color": "r" }, { "v": 4, "color": "r" }], // true 有一张王，中间缺数据补边
    a6 = [{ isJoker: true }, { isJoker: true }, { "v": 2, "color": "r" }, { "v": 5, "color": "r" }, { "v": 4, "color": "r" }], // true 有两张王，中间缺数据补边
    a7 = [{ isJoker: true }, { isJoker: true }, { "v": 1, "color": "r" }, { "v": 3, "color": "r" }, { "v": 4, "color": "r" }] // true 有两张王，中间缺数据补中

function Foolish(arr) {
    let t = 5;
    let set = new Set();
    let r = true;
    let colorFlag = '';
    let jokerNum = 0;
    
    for (let i = 0; i < t; i++) {
        const item = arr[i]
        if (item.isJoker) {
            jokerNum++
            continue
        }
        if (colorFlag === "") {
            colorFlag = item.color;
        }
        if (colorFlag !== item.color) {
            r = false;
            break;
        }
        colorFlag = item.color
        set.add(item.v)
    }
    if ((set.size + jokerNum) === t) {
        const rarr = Array.from(set).sort((a, b) => a - b)
        const d = rarr[rarr.length - 1] - rarr[0]
        if (d > ((t - 1) - jokerNum) && d <= (t - 1)) {
            r = true
        } else {
            r = false
        }
    } else {
        r = false
    }
    return r;
}

console.log(Foolish(a1),Foolish(a2),Foolish(a3),Foolish(a4),Foolish(a5),Foolish(a6),Foolish(a7))