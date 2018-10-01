// fs里的所有 文件系统操作 都提供了 同步和异步操作, 同步会阻塞进程。建议 采用异步
// fs 接受的 路径格式有： 字符串，Buffer, File: 协议的 url 对象

'use strict';
var fs = require('fs');
// fs里的所有 文件系统操作 都提供了 同步和异步操作, 同步会阻塞进程。建议 采用异步
// fs 接受的 路径格式有： 字符串(可以是相对路径 或 绝对路径)，Buffer, File: 协议的 url 对象, 

// windows 中传入的 路径若是 File：协议， 则必须携带主机名 或 驱动器号，否则file: URL 在转换时会抛出错误。
// fs.readFileSync(new URL('file://DESKTOP-CADONJJ/desktop/node-note/menu/fs2.js'));  // 携带主机名
// fs.readFileSync(new URL('file:///C:/tmp/hello'));    // 携带驱动器号

// 创建文件
// nodeJS 为所有打开的文件分配了 文件描述符
// fs.open() 方法用于分配一个新的 文件描述符 fd， 
// 一旦分配了，文件描述符 可用于 读取数据、写入数据、或 查看文件 信息
//  'r' --- 以读取模式打开文件； 'w' - 以写入模式打开文件； 'a' - 以追加模式打开文件
// 打开文件 --- 读取文件/写入文件 --- 关闭描述符（大多数操作系统会限制打开的文件描述符的数量，所以当操作完成时需关闭描述符）
fs.open('input.txt', 'r', function (err, fd) { // fd 是文件描述符
    if (err) {
        return;
    } else {
        var buffer = Buffer.alloc(255);
        //每一个汉字utf8编码是3个字节，英文是1个字节
        fs.read(fd, buffer, 0, 9, 0, function (err, bytesRead, buffer) {
            // 0 向缓存区写入的初始位置   9 读取的文件长度   0 读取文件的初始位置
            // 这一步的操作是 读取文件 再 写入缓存区
            if (err) {
                throw err;
            } else {
                console.log(bytesRead); // 9
                console.log(buffer.slice(0, bytesRead).toString()); // 123456789
                //读取完后，再使用fd读取时，基点是基于上次读取位置计算 （9）；
                fs.read(fd, buffer, 0, 14, null, function (err, bytesRead, buffer) {   // 从 fd 指定的文件中读取数据
                    //  如果 position 为 null，则数据从当前文件读取位置开始读取，且文件读取位置会被更新
                    console.log(bytesRead);  // 14
                    console.log(buffer.slice(0, bytesRead).toString());  // 1234567890abcd
                });
            }
        });
    }
});

fs.open('input.txt', 'a', function (err, fd) {
    if (err) {
        console.error(err);
        return;
    } else {
        var buffer = new Buffer('写入文件数据内容');
        //写入'入文件'三个字
        fs.write(fd, buffer, 3, 9, 12, function (err, written, buffer) {   // fs.write() 写入 string 到 fd 指定的文件
            // 3 被写入的部分  9 要写入的字节数  12 开始写入的位置
            if (err) {
                console.log('写入文件失败');
                console.error(err);
                return;
            } else {
                console.log(buffer.toString());
                //写入'数据内'三个字
                fs.write(fd, buffer, 12, 9, null, function (err, written, buffer) {
                    console.log(buffer.toString());
                })
            }
        });
    }
});
fs.close(fd, callback)
// 文件系统 flag： r 读取； r+ 读写； w 写入； w+读写； a 追加模式； a+ 读写追加模式 打开！！
// '0666' --- 文件权限
// fd --- 返回的文件描述符
// bytesRead:实际读取字节数，buffer:被读取的缓存区对象
// 打开文件 --- 读取文件/写入文件 --- 关闭文件


// 异步读取文件 --- 文本文件  
fs.readFile('./0.png', { encoding: null, flag: 'r' }, function (err, data) {
    if (err) throw err;
    console.log(data);
    console.log(data.length);
});  // 当 path 是一个目录时，会返回错误

// 异步读取 二进制文件
fs.readFile('aa.img', function (err, data) {
    if (err) throw err;
    console.log(data)
    console.log(data.length + 'byte')
})    //文本文件 相对于 二进制文件 


// 异步地 写入数据 到文件  fs.writeFile(file, data[, options], callback)
// 默认 flag=w 是清空文件，再写。 追加 可以赋值为 a
fs.writeFile('aa.txt', 'data', function (err) {
    if (err) throw err;
    console.log('ss')
})

// 异步地追加数据到一个文件，如果文件不存在则创建文件  fs.appendFile(path, data[, options], callback)
fs.appendFile('aa.txt', 'abc', function (err) {
    if (err) throw err;
})

// 复制文件 abc.txt 输出相同内容文件 ccc.txt
fs.link('abc.txt', './ccc.txt', function (err) {
    if (err) return;
})
// 删除文件
fs.unlink('./abc.txt', function (err) {
    if (err) console.log(err)
})

// 创建目录
fs.mkdir('./aaa', function (err) {
    if (err) return;
    console.log('sfsf')
})
// 删除目录
fs.rmdir('./aaa', function (err) {
    if (err) return;
    console.log('sfsf')
})
// 读取目录文件，返回数组，数组内容是目录下的文件名
fs.readdir('./aaa', function (err, data) {
    if (err) return;
    console.log(data)
})


// 监听文件修改的时间,  fs.watch() 是新的API 但似乎没试出来效果~
fs.watchFile('./input.txt', function (curr, prev) {
    console.log('the current mtime is: ' + curr.mtime);
    console.log('the previous mtime was: ' + prev.mtime);
});

// 获取文件的状态  还有一个  fstat
fs.stat('aa.txt', function (err, stats) {
    if (err) {
        console.error(err)
    } else {
        console.log('isFile' + stats.isFile());
        console.log('isDerectory' + stats.isDirectory())
        if (stats.isFile()) {
            //    获取文件的大小；
            console.log(stats.size);
            //    获取文件最后一次访问的时间；
            console.log(stats.atime.toLocaleString());
            //    文件创建的时间；
            console.log(stats.birthtime.toLocaleString());
            //    文件最后一次修改时间；
            console.log(stats.mtime.toLocaleString());
            //    状态发生变化的时间；
            console.log(stats.ctime.toLocaleString())
            // 。。。。
        }
    }
})
//  这里的 stats 是 fs.Stats() 对象

// 检查文件的可访问性 fs.access(path[, mode], callback)
// 通常，仅在文件 不会被直接使用时 才检查一个文件的可访问性，例如当它的可访问性是来自另一个进程的信号。
// 检查文件是否存在于当前目录。
fs.access('fs1.js', fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? '不存在' : '存在'}`);
});

// 若文件已经有被使用时，推荐如下检查方式：
fs.open('myfile', 'wx', (err, fd) => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.error('文件已存在');
            return;
        }

        throw err;
    }

    writeMyData(fd);
});







// stream 
// 向 '文件流' 中依次写入数据
// 从 '文件流' 中依次读取数据
// 流 也是一个对象：
// data 事件 --- 表示 流 的数据已经可以读取了
// end事件 --- 表示这个 流 已经到末尾了,没有数据可以读取了
// error事件 --- 表示出错了

// 读取 '文件流'
var rs = fs.createReadStream('aa.txt', 'utf-8');
rs.on(data, callback);
rs.on(end, callback);
rs.on(error, callback);

// 写入 '文件流'
var ws = fs.createWriteStream('aa.txt', 'utf-8')
ws.write("abvmsk");
ws.write("abvmsk");
ws.end();

rs.pipe(ws); // pipe() 方法将 读取流 和 写入流 连通起来。。

fs.readeFile()
fs.writeFile()
fs.stat()
fs.createReadStream()
fs.createWriteStream()



