// vm 模块提供了一系列 API 用于在 V8 虚拟机环境中 编译和运行 代码。
// JavaScript 代码可以被编译并立即运行，或编译、保存然后再运行。
// 常见的用法是在沙盒中运行代码。沙盒代码使用不同的V8上下文

const vm = require('vm');

const x = 1;

const context = { x: 2 };
vm.createContext(context); // 上下文隔离化对象。

const code = 'x += 40; var y = 17;';
// `x` and `y` 是上下文中的全局变量。
// 最初，x 的值为 2，因为这是 context.x 的值。
vm.runInContext(code, context);

console.log(context.x); // 42
console.log(context.y); // 17

console.log(x); // 1; y 没有定义