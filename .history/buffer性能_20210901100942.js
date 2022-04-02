const start = new Date().getTime();
let num = 100;
for(let i = 0; i < 10000; i++){
    num += num
}
console.log(num);
console.log('耗时', new Date().getTime() - start);