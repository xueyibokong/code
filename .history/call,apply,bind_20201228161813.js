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

Function.prototype.myapply = function () {
    const args = [...arguments]
    const context = args.length ? args.shift() : window
    const inArgs = args.length >= 1 ? args[0] : []
    console.log(args, inArgs)
    !inArgs instanceof Array && new Error('必须是数组')
    const fn = Symbol()
    context[fn] = this;
    context[fn](...inArgs)
}

function setName (name) { this.name = name }
const you = {}; setName.myapply(you, ['LS'])
console.log(you.name)
