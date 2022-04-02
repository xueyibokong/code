Array.prototype.list2tree = function (config = {
    id: 'id',
    pid: 'pid',
    children: 'children'
}) {
    const len = this.length
    const map = {}
    for(let i = 0; i < len; i++) {
        const item = this[i]
        map[item[config.id]] = item
    }
    for(let i = 0; i < len; i++) {
        const item = this[i]
        pItem = map[item[config.pid]]
        pItem[config.children].length
            ? pItem[config.children].length.push(item)
            : pItem[config.children] = []
    }
    return map
}