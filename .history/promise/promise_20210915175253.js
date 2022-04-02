/**
 * [x] 第一步
 * Promise 基本调用
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
    static reslove (argue) {
        this.result = argue;
        this.status = 'resolve';
        return new Promise((res, rej) => {
            res(this.result);
        })
    };
    static reject (err) {
        this.result = err;
        this.status = 'reject';
        return new Promise((res, rej) => {
            rej(this.result);
        })
    };

    constructor(fn){
        this.status = 'pedding';
        this.catching = false;
        this.result;
        fn(Promise.reslove, Promise.reslove)
    }
    then (cb_res, cb_rej) {
        if (this.status = 'resolve') {
            cb_res(this.status);
            return Promise.resolve(this.status);
        } else if (cb_rej instanceof Function) {
            this.catching = true;
            cb_rej(this.status);
            return Promise.reject(this.status);
        }
    }
    catch (cb) {
        this.catching = true;
        cb(this.status);
    }
}

var p = new Promise((reslove, reject) => {
    try {
        setTimeout(() => {
            reslove('aa');
        }, 1000);
    } catch (err) {
        reject(err);
    }
})
// p.then(res => {
//     console.log(res);
// })
console.log(p)