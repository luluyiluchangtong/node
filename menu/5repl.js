const repl = require('repl'); // 导出了 repl.REPLServer 类
//（交互式解释器） read eval print loop 读取-求值-输出 循环（REPL）的实现 

// repl 模块提供了一种“读取-求值-输出”循环（REPL）的实现，它可作为 一个独立的程序 或 嵌入到其他应用中
// REPL为运行 JavaScript脚本与查看运行结果提供了一种交互方式，通常REPL交互方式可以用于调试、测试以及试验某种想法

// 使用方式： 引入， 创建 repl 实例
repl.start('> ') // repl.REPLServer 实例 （本质是 使用了一个 解释函数，可传入一个 解释函数 替换它）

// 特殊命令
// .editor  .help  .break  .exit ...

// 组合键
// ctrl+C  终止继续输入(同 .break)     ctrl+D  关闭输入输出流，退出 REPL(同 .exit)   tab 补全 / 显示全局和本地作用域的变量

// 将 全局变量 绑定到每个实例的 context对象的 局部变量上
const msg = 34
const r = repl.start('> ')
r.context.m = msg // 可修改

Object.defineProperty(r.context, 'm', { // 不可修改
    configurable: false,
    enumerable: true,
    value: msg
});


// 默认的下划线  _  是被赋值 最近一次表达式的结果， 可显示的设置 _ 为某个值来禁用该特性


repl.start({
    prompt: '> ',
    eval: myEval, // 可自定义 '解释函数'
    writer: myWriter // 自定义 '输出'
});

function myEval(cmd, context, filename, callback) { // 自定义解释函数
    callback(null, cmd);
}

function myWriter(output) { // 自定义输出
    return output.toUpperCase();
}


// exit 事件；当按下 组合键 或 .exit 命令时触发 exit 事件
r.on('exit', () => {
    console.log('从 REPL 接收到 "exit" 事件！');
});

// reset 事件； .clear命令触发 reset 事件,  REPL 的上下文被重置


r.displayPrompt([preserveCursor])
// 命令行中 游标位置(> ) 显示的默认行为  preserveCursor <boolean>


repl.start({
    prompt: '> ',
    eval: myEval, // 可自定义 '解释函数'
    writer: myWriter // 自定义 '输出'
    // options...
})
// repl.start() 方法创建并启动一个 repl.REPLServer 实例


// REPL 的 历史记录 默认保存用户目录下的 .node_repl_history 文件
// 可改变历史记录保存方式：
// NODE_REPL_HISTORY="一个有效的路径" 
// NODE_REPL_HISTORY=""  禁用历史纪录
// NODE_REPL_HISTORY_SIZE=999  最大保存记录数，默认 1000

// repl 下代码的运行模式
// NODE_REPL_MODE="sloppy / strict" 
















// 使用方式： 终端输入 node 回车，即进入了 repl 交互式场景