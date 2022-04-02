Array.prototype.list2tree = function (config) {
    config = {
        id: 'id',
        pid: 'pid',
        children: 'children',
        hasRoot: false,
        ...config
    }
    const list = JSON.parse(JSON.stringify(this))
    const len = list.length
    const tree = {id: 'root', [config.children]: []}, map = {root: tree}
    for(let i = 0; i < len; i++) {
        const item = list[i]
        map[item[config.id]] = item
        !item[config.children] && (item[config.children] = [])
    }
    for(let i = 0; i < len; i++) {
        const item = list[i]
        pItem = map[item[config.pid] || 'root']
        pItem[config.children].push(item)
    }
    return tree
}