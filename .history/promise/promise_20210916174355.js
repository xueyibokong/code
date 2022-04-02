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
    then(resolveCb, rejectCb) {
        if(['resolve', 'fulfilled'].includes(this.PromiseState)) {
            const resolveCbReturn = resolveCb(this.PromiseResult);
            return new Promise((res) => {
                res(resolveCbReturn);
            })
        } else if (this.PromiseState === 'reject' && rejectCb instanceof Function){
            const rejectCbReturn = rejectCb(this.PromiseResult)
            return new Promise((res) => {
                res(rejectCbReturn);
            })
        }
    }
    catch(rejectCb) {
        if (this.PromiseState === 'reject'){
            const rejectCbReturn = rejectCb(this.PromiseResult)
            return new Promise((res) => {
                res(rejectCbReturn);
            })
        }
    }
}

/**
 * [x]第三步
 * - 异步执行then、catch的回调，并修改返回Promise的result、status
 * - 实现throw error，并且catch可以捕获，捕获机制是在catchCb
 */

class Promise {
    constructor(callback) {
        this.PromiseState = 'padding';
        this.PromiseResult = undefined;
        this.PromiseCatchFlag = false;
        this.resolveCb = undefined;
        this.rejectCb = undefined;
        this.cbReturn = undefined;
        callback(Promise.reslove.bind(this), Promise.reject.bind(this))
    }
    static reslove(/** 形参 */res) {
        this.PromiseState = 'resolve';
        this.PromiseResult = res;
        Promise.cbRun.call(this);
    }
    static reject(/** 实参 */err) {
        this.PromiseState = 'reject';
        this.PromiseResult = err;
        if(!this.PromiseCatchFlag) throw err;
        Promise.cbRun.call(this);
    }
    static cbRun() {
        if(['resolve', 'fulfilled'].includes(this.PromiseState)) {
            const cbReturn = this.resolveCb(this.PromiseResult);
        } else if (this.PromiseState === 'reject' && rejectCb instanceof Function){
            const cbReturn = resolveCb(this.PromiseResult);
            this.PromiseCatchFlag = true;
        }
        this.cbReturn.PromiseState = 'fulfilled';
        this.cbReturn.PromiseResult = this.cbReturn;
    }
    then(resolveCb, rejectCb) {
        this.resolveCb = resolveCb;
        this.rejectCb = rejectCb;
        this.cbReturn = new Promise((res) => { res(undefined) });
        return this.cbReturn;
    }
    catch(rejectCb) {
        this.rejectCb = rejectCb;
        this.cbReturn = new Promise((res) => { res(undefined) });
        return this.cbReturn;
    }
}

var p = new Promise((reslove, reject) => {
    setTimeout(() => {
        reslove('aa');
    }, 1000);
})
// p.then(res => {
//     console.log(res);
// })
console.log(p)