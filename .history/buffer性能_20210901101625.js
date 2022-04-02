// const start = new Date().getTime();
// let num = 100;
// for(let i = 0; i < 100000000; i++){
//     num = num ** 2
// }
// console.log('耗时', new Date().getTime() - start);


const start = new Date().getTime();
let num = Buffer.alloc(1);
num.write([100]);
console.log(num)
for(let i = 0; i < 100000000; i++){
    num = num ** 2
}
console.log('耗时', new Date().getTime() - start);