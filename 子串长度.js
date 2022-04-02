/*
输出最长连续不重复字符子串长度
var str1 = 'abcabcaa', str2 = "bbbb", str3 = "pwwkew"

字符串:abacbefkb
开始遍历:
链表的变化情况:
a:长度:1	 链表:[a]
b:长度:2	 链表:[a,b]
a:长度:2	 链表:[b,a]
c:长度:3	 链表:[b,a,c]
b:长度:3	 链表:[a,c,b]
e:长度:4	 链表:[a,c,b,e]
f:长度:5	 链表:[a,c,b,e,f]
k:长度:6	 链表:[a,c,b,e,f,k]
b:长度:4	 链表:[e,f,k,b]
遍历结束
连续不重复的字符串:acbefk 长度:6

思路很简单：滑动窗算法
两层循环
第一层全量字符串循环【窗口滑动】
第二层（子串截取自当前i）向前(--)遍历，判断子串当前前一个项是否包含在当前子串（start：j，end：i），如果在则记录【窗口改变】

*/

String.prototype.getLongSub = function () {
    const len = this.length;
    if (len === 1 || len === 0) {
        return this;
    }
    let subStrs = [];
    let longest = 0;
    for (let i = 0; i < len; i++) {
        for (let j = i; j >= 0; j--) {
            const subStr = this.substring(j, i + 1)
            const beforeStr = this.charAt(j - 1)
            if (subStr.indexOf(beforeStr) !== -1 || beforeStr === "") {
                // 当前一项在此子串中，或者遍历到底了(beforeStr === "")。
                subStrs.push(subStr)
                longest = subStr.length > longest ? subStr.length : longest
                break;
            }
        }
    }
    return {
        subStrs,
        longest
    }
}

console.log("abacbefkb".getLongSub())

console.log("abcabcaa".getLongSub())
console.log("bbbb".getLongSub())
console.log("pwwkew".getLongSub())