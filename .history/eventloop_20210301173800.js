// 题
console.log("start");
var intv = setInterval(() => {
  console.log("setInterval");
}, 0);

setTimeout(() => {
  console.log("setTimeout 1");

  Promise.resolve()
    .then(() => {
      console.log("promise 3");
    })
    .then(() => {
      console.log("promise 4");
    })
    .then(() => {
      setTimeout(() => {
        console.log("setTimeout 2");

        Promise.resolve()
          .then(() => {
            console.log("promise 5");
          })
          .then(() => {
            console.log("promise 6");
          })
          .then(() => {
            clearInterval(intv);
          });
      }, 0);
    });
}, 0);

new Promise((resolve, reject) => {
  console.log("promise"); // new Promise是同步代码
  resolve("promise next");
}).then((res) => {
  console.log(res);
});

Promise.resolve()
  .then(() => {
    console.log("promise 1");
  })
  .then(() => {
    console.log("promise 2");
  });

console.log("end");


/*
start
promise
end
promise next
promise 1
promise 2
setInterval
setTimeout 1
promise 3
promise 4
setInterval
setTimeout 2
promise 5
promise 6
*/