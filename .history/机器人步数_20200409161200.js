/**
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
 * 一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），
 * 也不能进入行坐标和列坐标的数位之和大于k的格子。
 * 例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。
 * 请问该机器人能够到达多少个格子？
 * 
 * 示例 1：
 * 输入：m = 2, n = 3, k = 1
 * 输出：3
 * 
 * 示例 2：
 * 输入：m = 3, n = 1, k = 0
 * 输出：1
 * 
 * 提示：
 * 1 <= n,m <= 100
 * 0 <= k <= 20
*/


/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function movingCountBfs (n, m, k) {
    /**
     * 获取数字位数和
     * @param {number} x
     * @return {number}
     */
    function s (x) {
        return Array.from(x+'', item => Number(item)).reduce((t, i) => t + i)
    }
    
    const dirArr = [[0, 1], [1, 0], [0, -1], [-1, 0]] // 方向数组，标识坐标将要与四个方向移动的增减值

    // 以下是广度优先算法，
    const queue = [] // 创建栈
    queue.push([0, 0]) // 默认机器人所在坐标
    const setArr = new Set(['0,0']) // 去重数组，标识已经访问过的坐标
    while(queue.length){
        const [x, y] = queue.shift() // 访问当前项，并记录当前项的坐标
        for(let i = 0; i < 4; i++) { // 循环方向
            // 算出i方向的坐标值
            const dirX = x + dirArr[i][0]
            const dirY = y + dirArr[i][1]
            /**
             * 条件
             * 1、坐标小于0
             * 2、坐标大于边界
             * 3、坐标和大于阈值(k))
             * 4、已经访问过的
             */
            if(dirX < 0 || dirY < 0 || dirX >= n || dirY >= m || (s(dirX) + s(dirY) > k) || setArr.has(`${dirX},${dirY}`)){
                continue
            }
            setArr.add(`${dirX},${dirY}`)
            queue.push([dirX, dirY])
        }
    }
    return setArr.size
};
// console.log(movingCountBfs(20, 20, 6));
// console.log(movingCountBfs(20, 20, 9));
// console.log(movingCountBfs(20, 20, 10));




function movingCountDfs () {
    function s (x) {
        return Array.from(x+'', item => Number(item)).reduce((t, i) => t + i)
    }
    
    const dirArr = [[0, 1], [1, 0], [0, -1], [-1, 0]] // 方向数组，标识坐标将要与四个方向移动的增减值

    // 以下是广度优先算法，
    const stack = [] // 创建栈
    queue.push([0, 0]) // 默认机器人所在坐标
    const setArr = new Set(['0,0']) // 去重数组，标识已经访问过的坐标
    while(stack.length){
        const [x, y] = stack.pop() // 访问当前项，并记录当前项的坐标
        for(let i = 0; i < 4; i++) { // 循环方向
            // 算出i方向的坐标值
            const dirX = x + dirArr[i][0]
            const dirY = y + dirArr[i][1]
            /**
             * 条件
             * 1、坐标小于0
             * 2、坐标大于边界
             * 3、坐标和大于阈值(k))
             * 4、已经访问过的
             */
            if(dirX < 0 || dirY < 0 || dirX >= n || dirY >= m || (s(dirX) + s(dirY) > k) || setArr.has(`${dirX},${dirY}`)){
                continue
            }
            setArr.add(`${dirX},${dirY}`)
            queue.push([dirX, dirY])
        }
    }
    return setArr.size
}
console.log(movingCountDfs(20, 20, 6));
console.log(movingCountDfs(20, 20, 9));
console.log(movingCountDfs(20, 20, 10));