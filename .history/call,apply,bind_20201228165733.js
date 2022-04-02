/*
* function setName (name) { this.name = name }
* const me = {}; setName.mycall(me, 'ZJ') // me.name = 'ZJ'
*/
Function.prototype.mycall = function () {
    const args  = [...arguments]
    const context = args.length ? args.shift() : window
    const fn = `_fn_${new Date().getTime()}_${parseInt(Math.random() * 1000000)}`
    context[fn] = this;
    console.log(context, fn, this)
    const r = context[fn](...args)
    delete context[fn]
    return r
}
function setName (name) { this.name = name }
const me = {}; setName.mycall(me, 'ZJ')
console.log(me.name)

// apply
Function.prototype.myapply = function () {
    const args = [...arguments]
    const context = args.length ? args.shift() : window
    const inArgs = args.length >= 1 ? args[0] : []
    !inArgs instanceof Array && new Error('必须是数组')
    const fn = `_fn_${new Date().getTime()}_${parseInt(Math.random() * 1000000)}`
    context[fn] = this;
    const r = context[fn](...inArgs)
    delete context[fn]
    return r
}

function setName (name) { this.name = name }
const you = {}; setName.myapply(you, ['LS'])
console.log(you.name)


// bind
/*
* function setName (name) { this.name = name }
* let people = { setName (name) { this.name = name } }
* let WW = {}; people.setName.bind(WW); WW.setName('WW') // WW.name = 'WW'
*/
Function.prototype.mybind = function () {
    typeof this !== "function" && new Error("使用函数调用 mybind")
    const _this = this
    const args = [...arguments]
    const context = args.length ? args.shift() : window

    const fBound = function () {
        const args = [...arguments]
        return _this.mycall(this instanceof fBound ? this : context, ...args)
    }

    const fNOP = function () {}

    this.prototype && (fNOP.prototype = this.prototype)

    fBound.prototype = new fNOP()

    return fBound
}
let people = { setName (name) { console.log(this); this.name = name } }
let WW = {}; people.setName.mybind(WW)('WW') // WW.name = 'WW'
console.log(WW.name)



var toStr1 = Function.prototype.mycall.mybind(Object.prototype.toString);
  
console.log(toStr1({}));      // "[object Object]"
console.log(toStr1([]));      // "[object Array]"
console.log(toStr1(123));     // "[object Number]"
console.log(toStr1("abc"));   // "[object String]"
console.log(toStr1(new Date));// "[object Date]"