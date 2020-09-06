const readline = require('readline');
// require('readline') 模块提供了一个接口，用于从可读流（如 process.stdin）以逐行的方式读取数据

const rl = readline.createInterface({ // 返回 readline.Interface 类的实例
    input: fs.createReadStream('aa.txt'), //  input 可读流
    output: process.stdout // output 可写流
});
rl.on('line', (input) => { // 按 Enter 键 触发  line 事件
    console.log(`接收到：${input}`);
});
rl.question('你最喜欢的食物是什么？ ', (answer) => {
    console.log(`你最喜欢的食物是 ${answer}`);
});
rl.close()

readline.clearLine(stream, dir) // 清除给定的 TTY 流的 当前行
// stream: <stream.Writable>   dir: 光标所在位置

readline.clearScreenDown(stream) // 从光标位置向下清除
readline.cursorTo(stream, x, y) // 移动光标到指定的位置
// ...

// npm install inquirer