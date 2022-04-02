// 'BD' [A-Z] <==> [1-9]
function _26to10 (str_26) {
    let n = 0, index = 0
    for(let i = (str_26.length - 1); i >= 0; i--) {
        n += ( (str_26[i].charCodeAt() - 64) * Math.pow(26,index) )
        index++
    }
    return n
}

console.log(_26to10('BD'))
console.log(_26to10('BZ'))
console.log(_26to10('DX'))

console.log('O', _26to10('O'))
console.log('AN', _26to10('AN'))
console.log('AD', _26to10('AD'))

console.log('DB', _26to10('DB'))
console.log('AV', _26to10('AV'))