// const start = new Date().getTime();
// let num = 100;
// for(let i = 0; i < 100000000; i++){
//     num ** 2
// }
// console.log('耗时', new Date().getTime() - start);


// const start = new Date().getTime();
// let num = Buffer.alloc(1);
// num.writeInt8(100, 0);
// for(let i = 0; i < 100000000; i++){
//     num[0] ** 2
// }
// console.log('buffer耗时', new Date().getTime() - start);


// http body为字符串（socket io 会把数据转换为Buffer，以进行二进制数据传输）
// var http = require('http');
// var helloworld = "";
// for (var i = 0; i < 1024 * 10; i++) {
//     helloworld += "a";
// }
// helloworld = new Buffer.from(helloworld);
// http.createServer(function (req, res) {
//     res.writeHead(200);
//     res.end(helloworld);
// }).listen(8001);

const http = require('http');
http.createServer(function (req, res) {
    if(req.url === '/ajax') {
        res.writeHead(200);
        res.end(JSON.stringify({
            code: 0,
            msg: '成功',
            data: {
                req
            }
        }));
    }
    else {
        res.writeHead(200);
        res.end(JSON.stringify({
            code: 404,
            msg: '无效路由'
        }));
    }
}).listen(8001);

