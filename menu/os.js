const os = require('os');
// os 模块提供了一些 操作系统 相关的实用方法

console.log(os.arch()); // x64  操作系统CPU架构
console.log(os.constants) // 操作系统的 错误常量 信号常量 及 系统特定的常量
console.log(os.cpus()) // 返回一个对象数组, 包含每个逻辑 CPU 内核的信息.
console.log(os.hostname()) // 以字符串的形式返回 操作系统 的主机名.
// ...