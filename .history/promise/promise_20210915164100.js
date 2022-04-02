class Promise {
    static status = 'pedding';
    static result;
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
    resolve (cb) {
        cb(result)
    }
    reject (cb) {
        cb(result)
    }
}

new Promise((reslove, reject) => {
    try {
        setTimeout(() => {
            reslove('aa');
        }, 1000);
    } catch (err) {
        reject(err);
    }
})