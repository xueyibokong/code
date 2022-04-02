/**
 * [x] 第一步
 * Promise 基本调用
 * eg:
 * const p = new Promise(
 *     (resolve, reject) => { // ?callback
 *          setTimeout(() => {
 *              if( '' === false ) {
 *                  resolve('scusse');
 *              } else {
 *                  reject('ERROR:fail');
 *              }
 *          }, 3000);
 *     }
 * )
 * !此时控制台输出p,得到如下：
 * Promise {<pending>}
 *  [[Prototype]]: Promise
 *  [[PromiseState]]: "pending"
 *  [[PromiseResult]]: undefined
 * !3s后再输出p，得到如下：
 * Promise {<pending>}
 *  [[Prototype]]: Promise
 *  [[PromiseState]]: "rejected"
 *  [[PromiseResult]]: "ERROR:fail"
 *
 * 以上示例包含了这些信息：
 * 在 new Promise 的时候，·callback·函数就被执行了，并且返回了Promise的实例，本实例上出原型有两个核心字段：
 * @PromiseState 标志p对象的promise状态，枚举{padding: '等待', resolve: '成功', reject: '失败', fulfilled: '完成'}
 * @PromiseResult 标志p的执行结果，这里包含了resolve、reject、fulfilled这三种状态的结果，由上例可以看出，就是·callback·的resolve、reject的实参。
 */
class Promise {
    constructor(callback) {
        this.PromiseState = 'padding';
        this.PromiseResult = undefined;
        callback(Promise.reslove.bind(this), Promise.reject.bind(this))
    }
    static reslove(/** 形参 */res) {
        this.PromiseState = 'resolve';
        this.PromiseResult = res;
    }
    static reject(/** 实参 */err) {
        this.PromiseState = 'reject';
        this.PromiseResult = err;
    }
}

/**
 * [x] 第二部
 * 实现then、catch
 * eg:
 * p.then((result) => {
 *      consle.log(result);
 * }).catch((err) => {
 *      console.error(err);
 * })
 * p.then((result) => {
 *      consle.log(result);
 * }, (err) => {
 *      console.error(err);
 * })
 * !then 方法是比较难实现的一步，这里包含了如下信息：
 * - then、catch是Promise实例的方法
 * - then里面可以接收resolve的回调，第二个参数选填接收reject的回调。
 * - then、catch都将返回新的Promise对象。
 * - then、catch可以链式调用，其实也是上一条的体现。
 */

var p = new Promise((reslove, reject) => {
    setTimeout(() => {
        reslove('aa');
    }, 1000);
})
// p.then(res => {
//     console.log(res);
// })
console.log(p)