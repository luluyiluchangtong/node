// fs里的所有操作都提供了 同步和异步操作
// 有文件字符编码，则返回的是：解析后的字符串; 没有则返回的是：二进制数据


'use strict';
var fs = require('fs');

// 异步读取文件 --- 文本文件  
fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
console.log('abc')
//  先后打印出 abc    sample.txt 文件内容

// 异步读取 二进制文件
fs.readFile('aa.img', function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        console.log(data.length + 'byte')
    }
})

// 同步读取的方式   try..catch捕获错误
var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data)


// 异步写入内容到文件 
// 默认 flag=w 是清空文件，再写。 追加 可以赋值为 a
fs.writeFile('aa.txt', 'data', {
    'flag': 'w'
}, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('ss')
    }
})
// 同步写入内容到文件
fs.writeFileSync('aa.txt', 'data', {
    'flag': 'w'
});

// 异步写入文件/内容
fs.appendFile('abc.txt', 'abc', {
    'flag': 'a'
}, function (err) {
    console.log(err)
})
// fs.appendFile() 只有是异步的方式， flag默认值是 a ，即默认是 追加内容
// 没有该文件则 创建该文件，有则直接追加内容

var data1 = fs.readFileSync('abc.txt', 'utf-8')
console.log(data1)

// 删除文件
fs.unlink('input.txt', function (err) {
    console.log(err)
})

// 打开文件 --- 读取文件/写入文件 --- 关闭文件
fs.open('input.txt', 'r', function (err, fd) { // 文件描述符
    if (err) {
        return;
    } else {
        var buffer = new Buffer(255);
        //每一个汉字utf8编码是3个字节，英文是1个字节
        fs.read(fd, buffer, 0, 9, 0, function (err, bytesRead, buffer) {
            // 0 向缓存区写入的初始位置   9 读取的文件长度   0 读取文件的初始位置
            if (err) {
                throw err;
            } else {
                console.log(bytesRead); // 9
                console.log(buffer.slice(0, bytesRead).toString()); // 423arewre
                //读取完后，再使用fd读取时，基点是基于上次读取位置计算 （9）；
                fs.read(fd, buffer, 0, 14, null, function (err, bytesRead, buffer) {
                    console.log(bytesRead);
                    console.log(buffer.slice(0, bytesRead).toString());
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
        fs.write(fd, buffer, 3, 9, 12, function (err, written, buffer) {
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
//  r 读取； r+ 读写； w 写入； w+读写； a 追加模式； a+ 读写追加模式 打开！！
// '0666' --- 文件权限
// fd --- 返回的文件描述符
// bytesRead:实际读取字节数，buffer:被读取的缓存区对象
// 打开文件 --- 读取文件/写入文件 --- 关闭文件

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
// 读取目录文件，返回数组
fs.readdir('./aaa', function (err, data) {
    if (err) return;
    console.log(data)
})


fs.link('abc.txt', './ccc.txt', function (err) {
    if (err) return;
}) // 复制文件 abc.txt 输出相同内容文件 ccc.txt
fs.unlink('./abc.txt', function (err) {
    if (err) console.log(err)
}) // 删除文件

fs.symlink('abc.txt', './qqq', function (err) {
    if (err) return;
}) // 创建文件 abc.txt 的 软链接 qqq
fs.readlink('./abc.txt', function (err, linkString) {
    // if (err) return;
    console.log(linkString)
}) // 读取 abc.txt 的软链接 qqq

fs.realpath('./abc.txt', function (err, resolvedPath) {
    // if (err) return;
    console.log(resolvedPath)
}) // 读取文件的绝对位置

// 监听文件修改的时间
fs.watchFile('./input.txt', function (curr, prev) {
    console.log('the current mtime is: ' + curr.mtime);
    console.log('the previous mtime was: ' + prev.mtime);
});
fs.writeFile('./input.txt', "123456", function (err) {
    if (err) throw err;
    console.log("file write complete");
});


// stat 异步获取文件大小，创建时间
fs.stat('aa.txt', function (err, stat) {
    if (err) {
        console.log(err)
    } else {
        console.log('isFile' + stat.isFile());
        console.log('isDerectory' + stat.isDirectory())
        if (stat.isFile()) {
            console.log('size' + stat.size);
            console.log('birthTime' + srat.birthtime);
            console.log('modifyTime' + srat.mtime);
        }
    }
})
// stat 同步获取 文件大小，创建时间
fs.stat('aa.txt', stat)

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