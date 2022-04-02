Array.prototype.list2tree = function (config = {
    id: 'id',
    pid: 'pid',
    children: 'children'
}) {
    const len = this.length
    const tree = [], map = {}
    for(let i = 0; i < len; i++) {
        const item = this[i]
        map[item[config.id]] = item
        const mapPItem = map[item[config.pid]]
        if (mapPItem) {
            mapPItem[config].children.push(item)
        }
    }
}