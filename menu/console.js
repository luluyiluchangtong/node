// const console = require('console');
// 全局的 console 使用时无需调用 require('console')。
// 都是  MDN 中的内容
// stdout 标准输出流   console.log()
// stdin 标准输入流   
// stderr 标准错误流   console.error()
console.log('a')
console.error(new Error('错误信息'))
let name = "信息"
console.warn(`错误${name}`)

// 使用 console 类
// Console 类可用于创建一个具有可配置的输出流的 "简单记录器",
const {
    Console
} = require('console');

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 自定义的简单记录器
const logger = new Console(output, errorOutput);
// 像 console 一样使用,这里 new Console 取得 logger类
const count = 5;
logger.log('count: %d', count);
// stdout.log 中打印: count 5

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