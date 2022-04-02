const fs = require('fs')
const path = require('path')
const [, , allNum, seedNum, count] = process.argv;

const all = fs.createWriteStream(path.resolve(__dirname, './input/all.txt'))
const seed = fs.createWriteStream(path.resolve(__dirname, './input/seed.txt'))
const countFile = path.resolve(__dirname, './input/count.txt')

function writeLine () {
    return `ID${new Date().getTime()}-${parseInt(Math.random() * 1000000)},${(() => {
        let str = ''
        for(let j = 0; j < 129; j++){
            str += (Math.random() + ',')
        }
        for(let j = 0; j < 257; j++){
            str += ((Math.random() > 0.5 ? 1.0 : 0.0) + (j === 256 ? '' : ','))
        }
        return str
    })()}`
}
for(let i = 0; i < seedNum; i++) {
    seed.write(writeLine()+'\n')
}
seed.end()

for(let i = 0; i < allNum; i++) {
    all.write(writeLine()+'\n')
}
all.end()

fs.writeFileSync(countFile, count + '')

