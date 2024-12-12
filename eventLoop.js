
// 1、第一题（必选）
// 请给出下面这段代码的执行结果， 并写出分析过程； 如果在 async1() 改为 await async1() ，执行结果会改变吗？为什么？

// 延时队列
setTimeout(function () {
  console.log('setTimeout 1');  //11
  new Promise(function (resolve) {
    console.log('promise 1'); //12
    resolve();
  }).then(function () {
    console.log('promise then') //13
  })
})
async function async1 () {
  console.log('async1 start') //2
  await async2();
  //后续代码等到当前宏任务队列完成后才能执行
  console.log('async1 end') //7
  await async3();
}

async function async2 () {
  console.log('async2')  //3
}

async function async3 () {
  console.log('async3')  //8
}

console.log('eventLoop');  //1
async1();

new Promise(function (resolve) {
  console.log('promise 2'); //4
  resolve();
}).then(function () {
  console.log('promise2 then')  //9
});

new Promise(function (resolve) {
  console.log('promise 4');//5
  resolve();
}).then(function () {
  console.log('promise4 then') //10
});

console.log('eventLoop end'); //6 同步执行完成

