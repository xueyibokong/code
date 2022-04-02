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
        trans.length && trans.forEach(t => {
            item[t.target] = item[t.origin]
            !t.untrans && delete item[t.origin]
        })
    }
    for(let i = 0; i < len; i++) {
        const item = list[i]
        const pItem = map[item[config.pid] || 'root']
        pItem[config.children] 
            ? pItem[config.children].push(item) 
            : pItem[config.children] = [item]
    }
    return config.hasRoot ? tree.children[0] : tree
}

const fs = require('fs')
const path = require('path')
const d = require('./list.json')
fs.writeFileSync(path.resolve(__dirname, './tree.json'), JSON.stringify(d.toTree(
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
            untrans: true
        }
    ],

)))