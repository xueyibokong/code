// js的number类型有个最大值（安全值）。即2的53次方，为9007199254740992。如果超过这个值，那么js会出现不精确的问题。这个值为16位。
function bigSum (a, b) {
    const lenL = a.length, lenR = b.length;
    const diffLen = lenL - lenR
    let diffStr = ''
    for(let i = 0 ; i < Math.abs(diffLen); i++) {
        diffStr += '0'
    }

    lenL > lenR ? b = diffStr + b : a = diffStr + a

    const len = diffLen ? lenR : lenL

    const r = []
    let f = 0

    for(let i = len - 1; i >= -1; i--) {
        const s = Number(a[i]) + Number(b[i]) + f
        if (i === -1) {
            f > 0 && r.unshift(f)
            break
        }
		f = 0
		if(s >= 10) {
			f = 1
			r.unshift(s - 10)
		} else {
			r.unshift(s)
		}
    }
    return r.join('')
}


console.log(bigSum('2', '999'))

const a = '123456789012345678', b = '123456789012345678'
console.log(bigSum(a, b))