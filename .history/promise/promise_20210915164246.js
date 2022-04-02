class Promise {
    status = 'pedding';
    result;
    static resloveFn = (argue) => {
        result = argue;
        this.status = 'resolve';
    };
    static rejectFn = (err) => {
        err = result;
        this.status = 'reject';
    };

    constructor(fn){
        return function () {
            fn(resloveFn, rejectFn)
        }
    }
    static resolve (cb) {
        cb(result)
    }
    static reject (cb) {
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