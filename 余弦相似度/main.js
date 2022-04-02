const fs = require('fs');
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const Solution = require('./SolutionMultiple.js');

async function main() {
    const [, , inputfileDir, outputfile, useTimeFile, tempdir] = process.argv; // 输入文件目录，包含3个文件，seed.txt, all.txt, count.txt
    let totalTime;
    let success;
    const seedFile = inputfileDir + "/seed.txt";
    const allFile = inputfileDir + "/all.txt";
    const countFile = inputfileDir + "/count.txt";
    // inputfileDir: 输入文件目录，包含3个文件，seed.txt, all.txt, count.txt
    // outputfile: 输出结果集文件
    // useTimeFile: 执行用时文件，计时单位ms
    // tempdir: 计算用临时目录
	if (!inputfileDir || !outputfile || !useTimeFile || !tempdir) {
		console.warn(`usage : inputfileDir outputfile useTimeFile tempdir`);
		process.exit();
    }

	//创建输出流
	const result = fs.createWriteStream(outputfile);

	result.on('error', (err) => {
		console.error(err);
	});

	try {
        const r = []
		//创建solution
        const solution = new Solution();

		const startTime = new Date().getTime();
        //执行主体
		await solution.process(seedFile, allFile, countFile, tempdir, (data) => {
            r.push(data)
			return result.write(data + '\n');
        });
        const endTime = new Date().getTime();
		const totalTime = String(endTime - startTime);
        fs.writeFileSync(useTimeFile, totalTime);
        //写入结束
        result.end();

        result.on('finish', async function () {
            const _r = []
            const rl = createInterface({
                input: createReadStream('./out/_result.txt'),
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                _r.push(line)
            });
            await once(rl, 'close');

            let c = 0
            _r.forEach(item => {
                for(let i = 0; i < r.length; i++){
                    if(item === r[i]) {
                        c += 1
                        break;
                    }
                }
            })
            
            console.log("用时：", totalTime)
            console.log("准确率：", (c / Number(r.length) * 100) + '%')
            process.exit();
        });

	} catch (error) {
		console.error(error);
		process.exit();
	}
}

main();