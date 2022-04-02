const start = new Date().getTime();
var num = 100;
for(let i = 0; i < 10000; i++){
    num += num * i
}
console.log(num);
console.log('耗时', new Date().getTime() - start);