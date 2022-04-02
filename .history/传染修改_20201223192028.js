var matrix = [
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [2, 3, 3, 2, 1],
    [2, 3, 2, 3, 3]
]
function Z (x, y, s, t) {
    const dirArr = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    const setArr = new Set(['0,0']) // 去重数组，标识已经访问过的坐标
    const queue = []
    queue.push([x, y])
    while(queue.length) {
        const [x, y] = queue.shift() 
        for(let i = 0; i < 4; i++) {
            cx = x + dirArr[i][0]
            cy = y + dirArr[i][1]
            if (matrix[cx][cy] !== 3 || setArr.has(`${cx},${cy}`)) {
                continue
            }
            matrix[cx][cy] = 2
            setArr.add(`${cx},${cy}`)
            queue.push([cx, cy])
        }
        
    }
}
console.log(Z(2,2,3,2))

/* 输出以下
1 2 2 4 5
5 4 2 2 1
2 2 2 2 1
2 2 2 3 3
*/