
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
            