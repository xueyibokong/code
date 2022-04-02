const start = new Date().getTime();
let num = 100;
for(let i = 0; i < 100000000; i++){
    num = num ** 2
}
// console.log(num);
console.log('耗时', new Date().getTime() - start);