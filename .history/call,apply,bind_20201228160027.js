/*
* function setName (name) { this.name = name }
* const me = {}; setName.mycall(me, 'ZJ') // me.name = 'ZJ'
*/
Function.prototype.mycall = function () {
    const fn = this;
    console.log(fn)
    const args  = [...arguments];
    const context = args.shift()
    context.fn(args)
}
function setName (name) { this.name = name }
const me = {}; setName.mycall(me, 'ZJ')
console.log(me.name)
