Array.prototype.list2tree = function (config) {
    config = {
        id: 'id',
        pid: 'pid',
        children: 'children',
        ...config
    }
    const len = this.length
    const map = {}
    for(let i = 0; i < len; i++) {
        const item = this[i]
        map[item[config.id]] = item
    }
    for(let i = 0; i < len; i++) {
        const item = this[i]
        pItem = map[item[config.pid] || 'root']
        pItem[config.children] && pItem[config.children].length
            ? pItem[config.children].length.push(item)
            : pItem[config.children] = []
    }
    return map
}