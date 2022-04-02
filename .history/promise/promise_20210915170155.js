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
            cb_res(result);
            return Promise.resolve(result);
        } else if (cb_rej instanceof Function) {
            catching = true;
            cb_rej(result);
            return Promise.reject(result);
        }
    }
    catch (cb) {
        catching = true
        cb(result)
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
p.then(res => {
    console.log(res);
})
console.log(p)