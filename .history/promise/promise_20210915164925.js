class Promise {
    status = 'pedding';
    catching = false;
    result;
    static resloveFn = (argue) => {
        result = argue;
        this.status = 'resolve';
    };
    static rejectFn = (err) => {
        result = err;
        this.status = 'reject';
    };

    constructor(fn){
        return function () {
            fn(resloveFn, rejectFn)
        }
    }
    then (cb_res, cb_rej) {
        cb_res(result);
        if (cb_rej) {
            catching = true
            cb_rej(result)
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