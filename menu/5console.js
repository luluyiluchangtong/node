// 使用 console 类
// Console 类可用于创建一个具有可配置的输出流的 "简单记录器", 即将 logger 的 输出信息 打印到 可写流(文件 aa.txt) 中, 
// 其输出会被送往 process.stdout 和 process.stderr
const fs = require('fs')
const {
    Console
} = require('console');

const output = fs.createWriteStream('./aa.txt');
const errorOutput = fs.createWriteStream('./aa.txt'); // 自定义的简单记录器
const logger = new Console({
    stdout: output,
    stderr: errorOutput
});
// 像 console 一样使用,这里 new Console 取得 console 类的实例 logger
const count = 5;

// Console类有以下方法:
logger.time('time')
logger.log('count: %d', count);
logger.error(new Error('错误信息!'))
logger.warn('警告') // console.warn() 函数是 console.error() 的一个别名
logger.count('count')
logger.table([{
    a: 1,
    b: 'Y'
}, {
    a: 'Z',
    b: 2
}]);
logger.timeEnd('time')
// ....


// 使用全局的 console 实例
console.assert() // 测试 value为是否真， 为假 打印出  AssertionError
console.count([label]) // 维护一个指定 label 调用 console.count() 的次数
console.count('abc') // 1
console.count('abc') // 2  label 'abc' 调用了 console.count() 两次
console.count()
console.countReset() // 重置指定 label 的内部计数器

console.clear()
// 当 stdout 是一个 TTY 时，调用 console.clear() 将尝试清除 TTY。 
// 当 stdout 不是一个TTY时，该方法什么都不做。

let data = 23
console.error('abc', 32) // abc 32 打印出错误并带上换行符

console.group(a)
// 将后续行的缩进增加两个空格。

console.groupEnd()
// 将后续行的缩进减少两个空格。

console.time();
console.timeEnd();
console.warn()