// 提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程, 无需 require， 直接使用


// 以下是 process 对象 相关的 事件 属性 方法

// process 进程的事件   
// process 对象 是 EventEmitter 的实例
// 'beforeExit' 事件： 在 清空事件循环前 需要增加额外的工作时，调用该事件
process.on('beforeExit', function () {
    console.log('sss')
})

// 'exit' 事件，在 清空事件循环 或 调用 process.exit()退出进程时，调用该事件
process.on('exit', (code) => {
    console.log(`退出码: ${code}`); // 这里若是异步操作时不只执行的，因为已经退出了
    // 0 成功    大于 0 退出失败
});

// multipleResolves '事件'  
// resolve  reject 超过一次； resolve 后再reject； reject 后再resolve  会调用该事件
process.on('multipleResolves', (type, promise, reason) => {
    console.error(type, promise, reason);
    setImmediate(() => process.exit(1)); // 退出失败的输出
});

async function main() {
    try {
        return await new Promise((resolve, reject) => {
            resolve('第一次调用');
            resolve('调用 resolve');
            reject(new Error('调用 reject'));
        });
    } catch {
        throw new Error('出错');
    }
}

main().then(console.log);
// 只有在promise成功解析后（需要一个函数调用）
// 并且将 promise 的结果隐式传递给 console.log 函数，才会执行console.log

// 'rejectionHandled' 事件  'uncaughtException' 事件  'unhandledRejection' 事件

// 'warning' 事件
EventEmitter.defaultMaxListeners = 1;
process.on('foo', () => {});
process.on('foo', () => {});
// 监听器多于设置的数量，会有 警告信息

process.on('warning', (warning) => { // 打印出 error 对象
    console.warn(1 + warning.name); // 打印告警名称 MaxListenersExceededWarning
    console.warn(2 + warning.message); // 打印告警信息
    console.warn(3 + warning.stack); // 打印堆栈信息
});

// 默认Node.js 会打印进程告警到stderr，使用 node --no-warnings 命令 阻止打印出默认警告，但可以自己设置警告信息
process.on('warning', (warning) => {
    console.warn('Do not do that!')
});

// 信号事件 Node.js进程接收到一个信号时 SIGINT / SIGTERM，会触发信号事件
process.on('SIGINT', handle);
process.on('SIGTERM', handle);


// process 进程属性
console.log(`Version: ${process.version}`); // nodeJS 版本
console.log(process.versions) // nodeJS 及其依赖项的 版本信息
console.log(process.env)
// process.env属性返回一个包含 用户环境信息（系统环境） 的对象, 其中存储对运行在会话中所有进程的 公共信息
// nodeJS 进程的 环境变量及路径:  process.env.NODE_ENV   process.env.PATH  
// 程序能根据定义的不同的 运行环境 production / develop 来载入不同的配置文件 config.js
delete process.env.TEST; // 使用 delete 删除环境变量

console.log(process.config) // 用于编译 当前 Node.js 执行程序 时涉及的配置项信息

console.log(process.argv)
// [ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\Users\\luzhe\\Desktop\\node-note\\menu\\test.js' ]
// 返回一个数组，这个数组包含了 启动Node.js进程 时的命令行参数
// 第一个元素：字符串，路径，是 process.execPath 属性，启动Node.js进程的 可执行文件 所在的绝对路径
// 第二个元素: 字符串，路径，为当前执行的JavaScript文件路径
// 剩余的元素为其他 命令行参数 
const myArg = process.argv.slice(2)
console.log(myArg) // [a,b,c]
// 返回 node 和 test.js 之后的参数  node test.js a b c

console.log(process.execArgv) //  ['--harmony']
// 返回 node 和 test.js 之间的参数   node --harmony test.js

console.log(process.execPath) // nodejs进程 可执行文件的 绝对路径

console.log(process.pid) // 返回当前进程的 ID
console.log(process.ppid) // 返回当前父进程的 ID

console.log(process.platform) // win32  当前的操作系统

console.log(process.stdout) // 返回一个对象，表示标准输出
console.log(process.stdin) // 返回一个对象，表示标准输入
console.log(process.stderr) // 返回一个对象，

// 流的形式的通信   必须通过 pipe() 管道中介
fs.createReadStream('./abc.txt')
    .pipe(zlib.createGzip())
    .pipe(process.stdout);

// 由于stdin 和stdout 都部署了stream接口，所以可以使用 stream 接口的方法


// process 进程方法
// process.uptime()  进程运行的时间 秒
console.log(process.uptime())

// process.hrtime() 主要的作用是衡量间隔操作的性能
const time = process.hrtime() // 返回 毫秒 纳秒  [ 1321497, 377415104 ]
console.log(time)

setTimeout(() => {
    const diff = process.hrtime(time);
    console.log(diff) // 即返回与当次调用的差值  [ 4, 22143345 ]
}, 4000);

// process.exit()
if (someConditionNotMet()) {
    printUsageToStdout();
    process.exitCode = 1; // 自然结束进程 
    // process.exit(1)  强制结束进程，不推荐使用。
}

// process.cwd()  process.chdir()
console.log(process.cwd())
// 返回进程的当前目录，即 menu目录   current work dir
process.chdir('./aaa')
// 切换目录
console.log(process.cwd())
// 切换后的目录 aaa  此时目录是 aaa ，注意之后的命令行就是在 aaa 下咯

// process.abort()
// process.abort()方法会使Node.js进程立即结束，并生成一个core文件

// process.cpuUsage()
const startUsage = process.cpuUsage();
console.log(startUsage)
// { user: 93000, system: 78000 }  当前进程的用户 CPU时间和系统 CPU时间的对象
// 用户进程获得了CPU资源以后, 在用户态执行的时间 和 内核态执行的时间

// 用户CPU时间+系统CPU时间=运行时间
// 内核态：控制计算机的硬件资源，并提供上层应用程序运行的环境
// 用户态：上层应用程序的活动空间，应用程序的执行必须依托于内核提供的资源。
// 系统调用：为了使上层应用能够访问到这些资源，内核为上层应用提供访问的接口
// 用户态（上层应用程序）   系统调用（接口）   内核态（为上层应用程序提供运行环境）
const now = Date.now();
while (Date.now() - now < 500);
console.log(process.cpuUsage(startUsage)); // 得到的结果是与上一次的差值

// process.emitWarning() 定制特定的警告信息，生成 error对象并传递给 warning 事件
process.emitWarning('Something happened!', {
    code: 'MY_WARNING',
    detail: 'This is some additional information'
});

// process.kill()
process.kill(process.pid, 'SIGHUP'); // 将 '信号' 发送给相应的进程 ID，
process.on('SIGHUP', () => {
    console.log('Got SIGHUP signal.');
}); // 然后调用 '信号事件'

// process.memoryUsage()  返回Node.js进程的 内存使用 情况的对象
process.memoryUsage()
// {
//     rss: 4935680,     为进程分配的物理内存
//     heapTotal: 1826816,
//     heapUsed: 650472,
//     external: 49879
//   }                   heapTotal 和 heapUsed 代表V8的内存使用情况


process.nextTick()
// 将任务放到当前一轮事件循环（Event Loop）的尾部。setTimeout(f,0)是将任务放到下一轮事件循环的头部，因此nextTick会比它先执行
// ...


console.log(`Current gid: ${process.getegid()}`); // 返回 进程的 组身份  window Android 平台无效
console.log(`Current gid: ${process.geteuid()}`); // 返回 进程的 用户身份  window Android 平台无效
// process.getgid()    process.getuid()  process.getgroups()    window Android 平台无效
// process.setegid(id)  process.seteuid(id)  process.setgid(id)  process.setuid(id)  process.setgroups(groups)  window Android 平台无效



























// 线程 和 进程的 概念：
// cpu  是工厂 进程 是车间， 。任一时刻，CPU总是运行一个进程，其他进程处于非运行状态， 
// 线程 是工人。一个进程可以包括多个线程，每个线程都可以使用一个进程的内存空间，这些是共享内存。

// 通俗易懂的解释 ~~~~
// 开个QQ，开了一个进程；开了迅雷，开了一个进程。在QQ的这个进程里，传输文字开一个线程、传输语音开了一个线程、弹出对话框又开了一个线程。
// 所以运行某个软件，相当于开了一个进程。在这个软件运行的过程里（在这个进程里），多个工作支撑的完成QQ的运行，那么这“多个工作”分别有一个线程。
// 所以一个进程管着多个线程。通俗的讲：“进程是爹妈，管着众多的线程儿子”

// 一个线程使用某些共享内存时，其他线程必须等它结束，才能使用这一块内存
// "互斥锁"（Mutual exclusion，缩写 Mutex），防止多个 线程 同时读写某一块内存区域

// 某些内存区域，只能供给固定数目的线程使用， 
// "信号量"（Semaphore），用来保证多个线程不会互相冲突

// 操作系统的设计，因此可以归结为三点：

// （1）以多进程形式，允许多个任务同时运行；

// （2）以多线程形式，允许单个任务分成不同的部分运行；

// （3）提供协调机制，一方面防止进程之间和线程之间产生冲突，另一方面允许进程之间和线程之间共享资源。