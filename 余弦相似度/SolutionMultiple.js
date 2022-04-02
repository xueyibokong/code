const fs = require('fs');
const path = require('path');
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { fork } = require('child_process');
const os = require('os');
const cpuslen = os.cpus().length

class Solution {
	/**
	 * 处理输入文件
	 * 
     * 主体逻辑实现，实现代码时请注意逻辑严谨性，涉及到操作文件时，保证文件有开有闭等。
     *
     * @param seedFile 种子集文件
     * @param allFile 候选集文件
     * @param outputCount 需要输出的结果数量
     * @param tempdir 临时目录
     * 
     * @params addSet() cb:输出一行结果
     */
	async process(seedFile, allFile, outputCount, tempdir, addSet) {

        try{
            fs.writeFileSync(path.resolve(tempdir, 'subProcess.js'), `
const { once } = require('events');
const { createReadStream, fstat } = require('fs');
const { createInterface } = require('readline');

function getVectors (lines) {
    let sum = 0;
    for (let i = 1, il = 129; i < il; i++) {
        sum += lines[i] ** 2
    }
    for (let i = 129, il = lines.length; i < il; i++) {
        sum += lines[i]
    }
    return Math.sqrt(sum);
}
function getSim (s, t) {
    let sum = 0;
    let i = s.length
    for (let i = 1, il = s.length; i < il; i++) {
        sum +=  s[i] * t[i];
    }
    return sum / (s.vector * t.vector)
}

process.on('message',async function(opts){
    const {index, count, allFile, seedFile} = opts
    let seeds = []
    // 处理seed
    try {
        const rl = createInterface({
            input: createReadStream(seedFile),
            crlfDelay: Infinity
        });
        rl.on('line', (seed) => {
            let seedarr = seed.split(',')
            let seedArr = new Float32Array(seedarr)
            seedArr.id = seedarr[0]
            seedArr.vector = getVectors(seedArr)
            seeds.push(seedArr)
        });
        await once(rl, 'close');
    } catch (err) {
        console.error(err);
    }
    try{
        let similarity = []
        
        const rl = createInterface({
            input: createReadStream(allFile),
            crlfDelay: Infinity
        });
        rl.on('line', (line) => {
            let linearr = line.split(',')
            let lineArr = new Float32Array(linearr);
            lineArr.id = linearr[0]
            let maxsim = -1;
            lineArr.vector = getVectors(lineArr)
            for (let i = 0, il = seeds.length; i < il; i++) {
                let sim = getSim(seeds[i],  lineArr)
                if (sim > maxsim) {
                    maxsim = sim
                }
            }
            similarity.push({
                sim: maxsim,
                all: lineArr.id
            })
        });
        await once(rl, 'close');
        similarity.sort(function (a, b) {return b.sim - a.sim})
        process.send(similarity.slice(0, count))
    } catch (err) {
        console.error(err);
    }
})
            `)
        } catch (err) {
            console.error(err);
        }

        let similarity = [];
        let count = 20

        const workerPath = path.resolve(tempdir, 'subProcess.js')
        const s = []
        const f = []
        for(let i = 0; i < cpuslen; i++) {
            s.push(fork(workerPath))
            f.push(fs.createWriteStream(path.resolve(tempdir, `all${i}.js`)))
        }
        
        await (async () => {
            
            // 处理count
            try {
                fs.readFile(outputCount, 'utf-8', function (err, data) {
                    count = Number(data)
                })
            } catch (err) {
                console.error(err);
            }
            

            // splitAll
            try {
                let i = 0
                const rl = createInterface({
                    input: createReadStream(allFile),
                    crlfDelay: Infinity
                });
                rl.on('line', (line) => {
                    f[i].write(line+'\n')
                    i++
                    if (i > 3) {
                        i = 0
                    }
                });
                await once(rl, 'close');
                f.forEach((f1, index) => {
                    f1.end();
                    f1.on('finish', function () {
                        console.log(`all${index}.js已经写入！`)
                        s[index].send({
                            index,
                            count,
                            allFile: path.resolve(tempdir, `all${index}.js`),
                            seedFile
                        })
                    })
                })
                
                
            } catch (err) {
                console.error(err);
            }
            
        })();

        return new Promise((resolve, reject) => {
            let j = 0
            s.forEach((worker) => {
                worker.on('message', (arr) => {
                    similarity = similarity.concat(arr)
                    if (j >= 3) {
                        similarity.sort(function (a, b) {return b.sim - a.sim})
                        console.log(`【解析完成，开始写入结果，总是为${count}】`)
                        for(let i = 0; i < count; i++) {
                            addSet(similarity[i].all)
                        }
                        resolve('【结果已出】')
                    }
                    j++
                })
                
                // worker.kill('SIGHUP')
            })
        })
        
	}
}

module.exports = Solution;