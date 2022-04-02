/*
动态规划
问：有一对兔子，从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子总数为多少？

公式：f(n) = f(n-1) + f(n-2)
*/

function fn (n) {
	if (n === 0 || n === 1) return
	return fn(n-1) + fn(n-2)
}

fn(9) // 55


function tArr (n) {
    let num = []
    for (i = 0; i < n; i++) {
        if (i === 0 || i ===1) num.push(1)
        else num.push(num[i - 1] + num[i - 2])
    }
}
  
  tArr(10) // [1,1,2,3,5,8,13,21,34,55]