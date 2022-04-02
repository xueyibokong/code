/*
* function setName (name) { this.name = name }
* const me = {}; setName.mycall(me, 'ZJ') // me.name = 'ZJ'
*/
Function.prototype.mycall = function () {
    const args  = [...arguments]
    const context = args.length ? args.shift() : window
    const fn = Symbol()
    context[fn] = this;
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
    const fn = Symbol()
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
    typeof this !== "function" && new Error("请使用函数对象调用我，谢谢！")
    const args = [...arguments]
    const context = args.length ? args.shift() : window
    const fn = Symbol()
    context[fn] = this
}
let people = { setName (name) { this.name = name } }
let WW = {}; people.setName.bind(WW); WW.setName('WW') // WW.name = 'WW'
console.log(WW.name)