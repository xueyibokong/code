Array.prototype.toTree = function (config, trans = []) {
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
        trans.length && trans.forEach(t => {
            item[t.target] = item[t.origin]
            t.untrans && delete item[t[0]]
        })
    }
    for(let i = 0; i < len; i++) {
        const item = list[i]
        pItem = map[item[config.pid] || 'root']
        pItem[config.children].push(item)
    }
    return config.hasRoot ? tree.children[0] : tree
}

const fs = require('fs')
const d = require('./d.json')
console.log(d.length)
fs.writeFileSync('./d1.json', JSON.stringify(d.toTree(
    {
        id: 'id',
        pid: 'parent_id',
        children: 'children',
    },
    [
        {
            origin: 'name',
            target: 'label'
        },
        {
            origin: 'id',
            target: 'value',
            untrans: false
        }
    ],

)))