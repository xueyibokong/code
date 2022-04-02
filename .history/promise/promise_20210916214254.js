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
        this.resolveCb = () => {};
        this.rejectCb = () => {};
        this.cbReturn = undefined;
        callback(Promise._reslove.bind(this), Promise._reject.bind(this))
    }
    static _reslove(/** 形参 */res) {
        this.PromiseState = 'resolve';
        this.PromiseResult = res;
        Promise._cbRun.call(this);
    }
    static _reject(/** 实参 */err) {
        this.PromiseState = 'reject';
        this.PromiseResult = err;
        if(!this.PromiseCatchFlag) throw err;
        Promise._cbRun.call(this);
    }
    static _cbRun() {
        let cbReturn;
        if(['resolve', 'fulfilled'].includes(this.PromiseState)) {
            cbReturn = this.resolveCb(this.PromiseResult);
        } else if (this.PromiseState === 'reject' && this.rejectCb instanceof Function){
            cbReturn = this.rejectCb(this.PromiseResult);
        }
        if (this.cbReturn) {
            this.cbReturn.PromiseState = 'fulfilled';
            this.cbReturn.PromiseResult = cbReturn;
        }
    }
    then(resolveCb, rejectCb) {
        if (!(resolveCb instanceof Function)) {
            throw 'Promise then中必须传回调函数';
        }
        if (rejectCb instanceof Function) {
            this.PromiseCatchFlag = true;
        }
        this.resolveCb = resolveCb;
        this.rejectCb = rejectCb;
        this.cbReturn = new Promise((res) => { res(undefined) });
        return this.cbReturn;
    }
    catch(rejectCb) {
        if (!(rejectCb instanceof Function)) {
            throw 'Promise catch中必须传回调函数';
        }
        this.PromiseCatchFlag = true;
        this.rejectCb = rejectCb;
        this.cbReturn = new Promise((res) => { res(undefined) });
        return this.cbReturn;
    }
    static all (promiseList) {
        const result = [], len = promiseList.length;
        console.log(len);
        let i = 0;
        return new Promise((resolve, reject) => {
            for(let i = 0; i < len; i++) {
                let promise = promiseList[i];
                console.log('promise', promise);
                i++;
                if (i === len) {
                    resolve();
                }
                // if (promise.constructor !== Promise) {
                //     console.log('promise1', promise)
                //     result.push(promise);
                //     i++;
                //     if (i === len) {
                //         resolve(result);
                //     }
                // } else {
                //     console.log('promise2', promise)
                //     promise.then(res => {
                //         i++;
                //         result.push(res)
                //         if (i === len) {
                //             resolve(result);
                //         }
                //     }).catch(err => {
                //         i++;
                //         if (i === len) {
                //             reject(error);
                //         }
                //     })
                // }
            }
        })
    }
}

/**
 * [x] 第四步
 * - 增加finally、race、all、allSettled、any、resolve、reject、try
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