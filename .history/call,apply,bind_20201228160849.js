/*
* function setName (name) { this.name = name }
* const me = {}; setName.mycall(me, 'ZJ') // me.name = 'ZJ'
*/
Function.prototype.mycall = function () {
    const args  = [...arguments];
    const context = args.length ? args.shift() : window
    const fn = new Symbol()
    const context[fn] = this;
    context[fn](args)
}
function setName (name) { this.name = name }
const me = {}; setName.mycall(me, 'ZJ')
console.log(me.name)
