const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const [, , inputfileDir, outputfile, useTimeFile, tempdir] = process.argv;

const all = fs.createWriteStream(path.resolve(__dirname, './input/all.txt'))
const seed = fs.createWriteStream(path.resolve(__dirname, './input/seed.txt'))
function writeLine () {
    return `${shortid.generate()},${(() => {
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
for(let i = 0; i < 1000; i++) {
    seed.write(writeLine()+'\n')
}

for(let i = 0; i < 100000; i++) {
    all.write(writeLine()+'\n')
}