//每种物品仅有一件，可以选择放或不放
//即f[i][w]表示前i件物品恰放入一个容量为w的背包可以获得的最大价值。
//则其状态转移方程便是：f[i][w]=max{f[i-1][w],f[i-1][w-weights[i]]+values[i]} （这是最根本的算法）

//其实背包问题有好多版本：
/*
    01背包（ZeroOnePack）: 有N件物品和一个容量为V的背包。每种物品均只有一件,第i件物品的费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使价值总和最大。
    完全背包(CompletePack): 有N种物品和一个容量为V的背包，每种物品都有无限件可用。第i种物品的费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
    多重背包(MultiplePack): 有N种物品和一个容量为V的背包。第i种物品最多有n[i]件可用，每件费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
*/


//动态规划背包问题
// c[i][j] 表示 前 i个物品，装入容量为 j的最大价值
// v[i] 表示第 i件物品的价值
// w[i] 表示每件物品的重量
//W 表示背包的容量
// use[i]  , 为 0 表示没取第 i件物品，为1表示取了第i件物品
function main(v, w, W) {
    var n = v.length;
    var c = [];
    var use = [];
    for(var i = 0; i <= n ; i++){
        c[i] = [];
        use[i] = 0;
        for(var j = 0; j <= W ; j++){
            if(i == 0 || j == 0){
                c[i][j] = 0;
            }
        }
    }

    console.log(JSON.stringify(use), JSON.stringify(c))

    v.unshift(0); //第0件物品，价值为0
    w.unshift(0); //第0件物品，重量为0
    for(var i = 1; i <= n; i++){
        for(var j = 1; j <= W; j++ ){
            if(j < w[i]){
                c[i][j] = c[i-1][j];
            }else{
                c[i][j] = Math.max(c[i-1][j],c[i-1][j-w[i]]+v[i]);
            }

        }
    }

    //逆向获取加入的物品
    var j = W;
    for(var i = n; i > 0; i--){
        if(c[i][j] > c[i-1][j]){
            use[i] = 1;
            j=j-w[i];
        }
    }
    // console.log(use, c);
    return c[n][W];
}

console.log(main([6,3,5,4,6],[2,5,4,2,3],10))