Array.prototype.list2tree = function (config) {
    config = {
        id: 'id',
        pid: 'pid',
        children: 'children',
        hasRoot: false,
        ...config
    }
    const len = this.length
    const tree = {id: 'root', [config.children]: []}, map = {root: tree}
    for(let i = 0; i < len; i++) {
        const item = this[i]
        map[item[config.id]] = item
        !item[config.children] && (item[config.children] = [])
    }
    for(let i = 0; i < len; i++) {
        const item = this[i]
        pItem = map[item[config.pid] || 'root']
        pItem[config.children].push(item)
    }
    return tree
}