var fs = require('fs');
// 异步操作文件时， 最后一个参数是  完成时的回调函数， 函数的第一个参数保留给异常，
// 异步的方法不能保证执行顺序   所以 fs.stat 需要放到 fs.rename 里面！！！

// fs里的所有 文件系统操作 都提供了 同步和异步操作, 同步会阻塞进程。建议 采用异步
// fs 接受的 路径格式有： 1.字符串(相对路径，绝对路径)     2.Buffer(相对路径，绝对路径)      3.File: 协议的 url 对象
// fs.open('file.txt', 'r', (err, fd) => {   字符串形式
// fs.open(Buffer.from('/open/some/file.txt'), 'r', (err, fd) => {  Buffer形式

// windows 中传入的 路径若是 File：协议， 则必须携带主机名 或 驱动器号，否则file: URL 在转换时会抛出错误。
// 主机名："我的电脑" --- "属性" --- "计算机全名" ---  DESKTOP-CADONJJ (主机名)
// 驱动器号： 就是硬盘的分区  C盘 D盘 等。。。。

// fs.readFileSync(new URL('file://DESKTOP-CADONJJ/desktop/node-note/menu/fs2.js'));  
// 携带 主机名 的 file: URL 会被转换为 UNC 路径(反斜杠路径)  \\DESKTOP-CADONJJ\desktop\node-note\menu\fs2.js

// fs.readFileSync(new URL('file:///C:/tmp/hello'));    
// 携带 驱动器号 的 file: URL 会被转换为 本地绝对路径(反斜杠路径)   C:\tmp\hello

// 既没有 主机名，也没有 驱动器号 的file: URL 在转换时会抛出错误

// POSIX，Portable Operating System Interface 可移植操作系统接口，是UNIX系统的一个设计标准，遵循这个标准的好处是软件可以跨平台


// 文件系统标志 flag： r 读取； r+ 读写； w 写入； w+读写； a 追加模式； a+ 读写追加模式 打开！！
// 常量： 由 fs.constants 输出  
// fs.access() 常量；  fs.copyFile() 常量； fs.open() 常量； fs.chmod() 常量;


//打开文件
// nodeJS 为所有打开的文件分配了 '文件描述符'
// fs.open() 方法用于分配一个新的 '文件描述符' --- fd   
// 一旦分配了，'文件描述符' 可用于 读取数据、写入数据、或 查看文件 信息
//  'r' --- 以读取模式打开文件； 'w' - 以写入模式打开文件； 'a' - 以追加模式打开文件
// 打开文件 --- 读取文件/写入文件 --- 关闭描述符（大多数操作系统会限制打开的文件描述符的数量，所以当操作完成时需关闭描述符）
fs.open('aa.txt', 'a', 0o666, (err, fd) => {
    if (err) throw err;
    console.log(fd)
})

// 读取文件
fs.read(fd, buffer, 0, 9, 0, function (err, bytesRead, buffer) {
    //  0，9，0  代表 offset  length  position
    // 0 向缓存区（buffer）写入的初始位置   9 读取的文件长度   0 读取文件的初始位置
    // bytesRead 从文件读取的字节数
    // 这一步的操作是 读取文件 字节数 bytesRead  再写入 缓存区 buffer
    if (err) {
        throw err
    }
    console.log(bytesRead)
    console.log(buffer)
})

// 读取文件   是对 fs.read() 更好的封装
fs.readFile('./0.png', {
    encoding: null,
    flag: 'r'
}, function (err, data) {
    if (err) throw err;
    console.log(data);
    console.log(data.length + 'byte');
}); // 当 path 是一个目录时，会返回错误
// fs.readFile() 函数会缓存整个文件。 为了最小化内存占用，尽可能优先使用 fs.createReadStream()

// 读取 '文件流'
var rs = fs.createReadStream('aa.txt', { // 返回 fs.ReadStream 类  是 可读流  实现了 stream.Readable 类定义的接口。  
    flags: 'r',
    encoding: null,
    fd: null, // 如果你指定了 fd start 则文件读取一定范围的字节而不是整个文件
    start: 0,
    end: Infinity,
    mode: 0o666,
    autoClose: true,
    highWaterMark: 64 * 1024 // 即默认为 64 kb

});
// 返回: <fs.ReadStream> 对象
var content = ""
rs.on('data', (chunk) => {
    console.log(chunk)
    content += chunk
});
rs.on('end', () => {
    console.log(`${content},结束了`) // aaaaa11,结束了
});
rs.on('close', () => {
    console.log('ssss')
})
// 可读流对象 的属性，方法； fs.ReadStream 类的 属性，方法




// 读取链接路径
fs.readlink('./aaa', 'utf-8', function (err, linkString) {
    if (err) throw err;
    console.log(linkString)
})

// 读取目录文件，返回数组，数组内容是目录下的文件名
fs.readdir('./aaa', {
    encoding: 'utf-8',
    withFileTypes: true // 默认是 false
}, function (err, data) {
    if (err) return;
    console.log(data) // 返回一个数组
    console.log(data[0].isFile()) // true   dirent.isFile() dirent对象是一个普通文件
})
// 如果 withFileTypes 设为true，则 files 数组中的是 fs.Dirent 对象,而不是 字符串 或 Buffer
// withFileTypes:false ---> ['a.txt', 'b.txt']
// withFileTypes:true --->  [ Dirent { name: 'a.txt', [Symbol(type)]: 1 }, Dirent { name: 'b.txt', [Symbol(type)]: 1 } ]
// 如果 fs.Dirent 对象
// 是一个块设备, dirent.isBlockDevice()
// 一个字符设备, dirent.isCharacterDevice()
// 一个文件系统目录, dirent.isDirectory()
// 是一个先进先出（FIFO）管道, dirent.isFIFO()
// 是一个普通文件, dirent.isFile()
// 是一个 socket, dirent.isSocket()
// 是一个符号链接, dirent.isSymbolicLink()
// 返回 true， 否则返回 false

// 获取文件的状态  还有  fs.fstat(fd,...)   区别于 fs.stat 的是传递的是文件路径还是文件句柄
fs.stat('aa.txt', {
    bigint: false // 对象返回的数值是否为长整数型, 若 bigint 为 true，则数值会是 bigint 型而不是 number 型
}, function (err, stats) { // stats 是一个 fs.Stats 对象
    if (err) {
        console.error(err)
    } else {
        console.log('isFile' + stats.isFile()); // isFiletrue
        console.log('isDerectory' + stats.isDirectory()) // isDerectoryfalse
        if (stats.isFile()) { //fs.Stats 对象是一个普通文件
            //    获取文件的大小；
            console.log(stats.size); // 21        bigint 型是 21n
            //    获取文件最后一次访问的时间；
            console.log(stats.atime.toLocaleString());
            //    文件创建的时间；
            console.log(stats.birthtime.toLocaleString());
            //    文件最后一次修改时间；
            console.log(stats.mtime.toLocaleString());
            //    状态发生变化的时间；
            console.log(stats.ctime.toLocaleString())
            // 还有很多 fs.Stats 对象 参数
            // 在不同的操作系统和设置下，atime/ctime/mtime的更新规则是不一样的
        }
    }
})
// 返回 fs.Stats() 对象
// 如果 fs.Stats 对象
// 是一个块设备, dirent.isBlockDevice()
// 一个字符设备, dirent.isCharacterDevice()
// 一个文件系统目录, dirent.isDirectory()
// 是一个先进先出（FIFO）管道, dirent.isFIFO()
// 是一个普通文件, dirent.isFile()
// 是一个 socket, dirent.isSocket()
// 是一个符号链接, dirent.isSymbolicLink()
// 返回 true， 否则返回 false

// 读取文件的可访问性 fs.access(path[, mode], callback)
// 通常，仅在文件 不会被直接使用时 才检查一个文件的可访问性，例如当它的可访问性是来自另一个进程的信号。
fs.access('fs1.js', fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? '不存在' : '存在'}`);
});
// 常量 可访F_OK  可读 R_OK   可写 W_OK  ， 由 fs.constants 提供


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
// 不建议在调用 fs.open() 、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查一个文件的可访问性
// 因为 其他进程 可能在两个调用之间改变该文件的状态，即如上处理。。

// 读取真实路径
fs.realpath('/etc/passwd', 'utf-8', function (err, resolvedPath) {
    if (err) throw err;
    console.log(resolvedPath);
});

// 读取文件截断内容
fs.truncate('inputee.txt', 2, function (err) { // fs.ftruncate(fd，。。。) 被弃用
    if (err) {
        throw err;
    }
    console.log('文件内容截断成功');
    fs.readFile('inputee.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
})



// 写入文件
fs.write(fd, buffer, 3, 9, 12, function (err, bytesWritten, buffer) {
    //  3, 9, 12  代表 offset  length  position
    //  buffer 中被写入的部分  3 被写入的部分  9 要写入的字节数  12 开始写入的位置
    // 这一步的操作是 读取文件 字节数 bytesWritten  再写入 缓存区 buffer
    if (err) throw err;
    console.log(bytesWritten)
    console.log(buffer)
})

// 写入文件 是对 fs.write 更好的封装
const data = new Uint8Array(Buffer.from('Node.js中文网'));
fs.writeFile('aa.txt', 'data', { // 一般用 writeFile， fs.write() 属于更细致的操作
    encoding: 'utf-8',
    mode: 0o666,
    flag: 'w'
}, function (err) {
    if (err) throw err;
    console.log('ss')
})


// 写入 '文件流'
const ws = fs.createWriteStream('aa.txt', {
    flags: 'w',
    encoding: 'utf-8',
    fd: null, // 如果你指定了 fd  start 则文件读取一定范围的字节而不是整个文件
    start: 0, // 用于写入数据到文件指定位置
    end: Infinity,
    mode: 0o666,
    autoClose: true,
})
// 返回: <fs.WriteStream> 类 是 可写流, 实现了 stream.Writable 类定义的接口
ws.write('aaaaa')
ws.on('open', function () {
    console.log('ss')
})
ws.end();


// 追加数据 到一个文件，如果文件不存在则创建文件
fs.appendFile('aa.txt', 'abc', { // 追加的数据 是字符串 或 buffer
    encoding: 'utf-8',
    mode: 0o666,
    flag: 'a'
}, function (err) {
    if (err) throw err;
})

// 修改文件
// 修改文件的权限 
fs.chmod('aa.txt', 0o200, function (err) {
    // 0o200 所有者可写。。以及更多的文件模式。 或 三位的八进制 0o765    chmod（更改文件属性）
    if (err) throw err
})
// fs.fchmod(fd....)  // 区别于  fs.chmod 的是传递的是文件句柄，不是文件路径

// 修改文件的所有者和群组
fs.chown('content.txt', uid, gid, function (err) { // uid 用户id   gid 群体身份
    if (err) {
        console.log(err);
    } else {
        console.log("change done");
    }
})
// fs.fchown(fd, uid,gid,function(err){....})  // // 区别于 chown 的是传递的是 文件路径 还是 文件句柄


// 修改文件时间戳
fs.utimes('125.txt', atime, mtime, function (err) {
    if (err) {
        throw err;
    }
    console.log('time update');
})
// atime 访问时间   mtime 修改时间 可以是 Date对象，数值字符串


// 修改文件名
fs.rename('旧文件.txt', '新文件.txt', (err) => {
    if (err) throw err;
    console.log('已完成重命名');
});


// 删除文件/目录
// 删除文件
fs.unlink('./abc.txt', function (err) {
    if (err) console.log(err)
})

// 删除目录
fs.rmdir('./aaa', function (err) {
    if (err) return;
    console.log('sfsf')
})

// 创建目录/链接
// 创建目录
fs.mkdir('./aaa', function (err) {
    if (err) return;
    console.log('sfsf')
})

// 创建文件硬链接
// 创建文件 abc.txt 的硬链接 ccc.txt
fs.link('abc.txt', './ccc.txt', function (err) {
    if (err) return;
})

// 创建文件软链接
// 创建了一个名为 "new-port" 且指向 "foo" 的符号链接
fs.symlink('./foo', './new-port', function (err) {
    if (err) throw err
});


// 复制文件
// 默认情况下，目标文件.txt 会被创建或覆盖。
const {
    COPYFILE_EXCL
} = fs.constants;
fs.copyFile('aa.txt', 'gg.txt', COPYFILE_EXCL, (err) => {
    if (err) throw err;
    console.log('来源文件.txt 已拷贝到 目标文件.txt');
});
// 常量  由 fs.constants 提供
// COPYFILE_EXCL 如果目标路径已存在，则拷贝操作会失败
// COPYFILE_FICLONE 拷贝操作会试图创建一个写时拷贝链接。 如果底层平台不支持写时拷贝，则使用备选的拷贝机制。
// COPYFILE_FICLONE_FORCE	拷贝操作会试图创建一个写时拷贝链接。 如果底层平台不支持写时拷贝，则拷贝操作会失败。


// 监听文件
// 监听文件修改的时间,  fs.watch() 是新的API 但似乎没试出来效果~
fs.watch('./input.txt', { // 如果 options 是一个字符串，则它指定字符编码
        persistent: true, // 文件正在被监视，进程是否继续运行
        recursive: false, // 监视全部子目录还是只有当前目录 recursive(递归)
        encoding: 'utf-8'
    },
    function (eventType, filename) { // filename 可以是一个文件或一个目录
        console.log('操作文件的事件类型' + eventType); // rename
        console.log('操作后文件的的名称' + filename); // inputee.txt
        // if (filename) {   若 encoding 设置为 buffer，则 filename 是一个 Buffer
        //     console.log(filename);
        //     // 打印: <Buffer ...>  
        //   }
    });
// 返回 <fs.FSWatcher>  所有 fs.FSWatcher 对象都是 EventEmitter 的实例
// 回调函数是 绑定在 由 fs.FSWatcher 触发的 'change' 事件上，跟 eventType 的 'change' 不是同一个东西

// 是 fs.watch() 更好的封装
fs.watchFile('./input.txt', function (curr, prev) {
    console.log('the current mtime is: ' + curr.mtime);
    console.log('the previous mtime was: ' + prev.mtime);
});

// 停止监听文件的变化
fs.unwatchFile('./foo', function (eventType, filename) {
    // eventType 可能是 'rename' 或 'change'
})



// 综合例子
// 创建文件
fs.open('input.txt', 'r', 0o666, function (err, fd) { // fd 是文件描述符
    if (err) {
        return;
    } else {
        var buffer = Buffer.alloc(255);
        //每一个汉字utf8编码是3个字节，英文是1个字节  
        fs.read(fd, buffer, 0, 9, 0, function (err, bytesRead, buffer) {
            // 0 向缓存区（buffer）写入的初始位置   9 读取的文件长度   0 读取文件的初始位置
            // bytesRead 从 缓存区（buffer）读取的字节数
            // 这一步的操作是 读取文件 字节数 bytesRead 再 写入 缓存区 buffer
            if (err) {
                throw err;
            } else {
                console.log(bytesRead); // 9
                console.log(buffer.slice(0, bytesRead).toString()); // 123456789
                //读取完后，再使用fd读取时，基点是基于上次读取位置计算 （9）；
                fs.read(fd, buffer, 0, 14, null, function (err, bytesRead, buffer) { // 从 fd 指定的文件中读取数据
                    //  如果 position 为 null，则数据从当前文件读取位置开始读取，且文件读取位置会被更新
                    console.log(bytesRead); // 14
                    console.log(buffer.slice(0, bytesRead).toString()); // 1234567890abcd
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
        // 写入文件
        fs.write(fd, buffer, 3, 9, 12, function (err, bytesWritten, buffer) { // fs.write() 写入 string 到 fd 指定的文件
            if (err) {
                console.log('写入文件失败');
                console.error(err);
                return;
            } else {
                console.log(buffer.toString());
                //写入'数据内'三个字
                fs.write(fd, buffer, 12, 9, null, function (err, bytesWritten, buffer) {
                    console.log(buffer.toString());
                })
            }
        });
    }
});
fs.close(fd, function (err) {
    if (err) throw err
})

fs.open('aa.txt', 'a', (err, fd) => { // path 也可以是使用 fs.open() 或者 fs.openSync() 打开的文件描述符
    if (err) throw err;
    fs.appendFile(fd, '追加的数据', 'utf8', (err) => {
        fs.close(fd, (err) => {
            if (err) throw err;
        });
        if (err) throw err;
    });
});

fs.fdatasync(fd, function () {}) // 缓冲区内容写到磁盘
fs.fsync(fd, callback) // 同步磁盘缓存