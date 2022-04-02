class Promise {
    static reslove (argue) {
        result = argue;
        this.status = 'resolve';
    };
    static reject (err) {
        result = err;
        this.status = 'reject';
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
        } else if (cb_rej instanceof Function) {
            catching = true
            cb_rej(result)
        }
        return new Promise((res, rej) => {
            res()
        })
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