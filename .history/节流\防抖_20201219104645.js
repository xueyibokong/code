// 防抖 重置timeout，节流 不重置timeout


/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate = false) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 立即执行，false 表非立即执行
 */
export function throttle (func, wait ,immediate = false) {
    let previous = 0
    let timeout
    return function() {
        let context = this
        let args = arguments
        if (immediate) {
            let now = Date.now()

            if (now - previous > wait) {
                func.apply(context, args)
                previous = now
            }
        } else {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}