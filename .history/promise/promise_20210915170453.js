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
        return function () {
            fn(Promise.reslove, Promise.reslove)
        }
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