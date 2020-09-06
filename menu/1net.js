const net = require('net')
// 进程间通信(inter-process communication 或 interprocess communication，简写IPC)
// 是指两个或两个以上进程(或线程)之间进行 数据或信号交互 的技术方案，IPC一般包含客户端和服务器

// net.Server类
// 此类用于创建 TCP 或本地服务器，是一个 EventEmitter
const PORT = 8867;
const HOST = '127.0.0.1';

// server 实例的方法：address()  close()   getConnections(callback)  listen()  ref()  unref()
// server 实例的属性： listening  maxConnections
const clientHandle = function (socket) {
    console.log('服务端：收到来自客户端的请求');
    const {
        port,
        address
    } = socket.address();
    socket.on('data', function (data) {
        // 收到客户端数据，内容为 data
        console.log(address, port, 'on data');

        socket.write('server is inline'); // 给客户端返回数据
        server.getConnections(function (error, connections) {
            console.log(connections);
            socket.destroy();
            server.close(); // 关闭服务器，停止接收新的客户端请求
        })
    })
}

// const server = net.createServer(clientHandle); // 返回一个  net.Server 类
const server = net.Server(clientHandle); // 返回一个  net.Server 类

server.listen(PORT, HOST, function () {
    console.log('tcp server running', server.address());
    console.log(server.listening);
}); // 服务端：开始监听来自客户端的请求


// server 实例的事件  listening  connection  error  close
server.on('listening', function () {
    console.log('server is listening at ', server.address());
})

server.on('connection', function (socket) {
    console.log('server is connection ', socket);
})

server.on('error', function (err) {
    console.log('error', err);
})

server.on('close', function () {
    console.log('server is close');
})



// net.socket 类
// net.Socket 可以被用户创建并直接与 server 通信，在 server 中，当一个链接被接受时，
// 它可以通过监听 net.Server 上的 connection 事件触发而获得，可以使用它来与客户端通信
const PORT = 8867;
const HOST = '127.0.0.1';

const client = net.Socket();
client.setEncoding('utf-8');

client.connect(PORT, HOST, function () {
    console.log('connect success.');

    client.write('tcp client by node');
    client.pause();

    setTimeout(function () {
        client.resume();
    }, 1000)
})
console.log('connecting ', client.connecting); //true

client.on('data', function (data) { // 客户端：收到服务端数据
    console.log('received: ', data.toString());
})

client.on('connect', function () { // 客户端：已经与服务端建立连接
    console.log('address', client.address());
    console.log('connecting ', client.connecting); // false
    console.log('localAddress', client.localAddress);
    console.log('localPort', client.localPort);
    console.log('remoteAddress', client.remoteAddress);
    console.log('remoteFamily', client.remoteFamily);
    console.log('remotePort', client.remotePort);
})

client.on('error', function (err) {
    console.log('error', err);
    client.end('ssssss');
    client.destroy();
    console.log('destroyed', client.destroyed);
})

client.on('close', function (data) {
    console.log('客户端：连接断开');
});


const server = net.createServer() //  创建 net.server 
const client = net.createConnection() // 创建 net.socket    net.connect() 是 net.createConnection() 的别名

// net 模块提供了 异步网络接口
// net 模块主要包括两部分： 
// net.Server  服务端TCP 监听 来自客户端的请求，并使用TCP连接(socket)向客户端发送数据； 内部通过socket来实现与客户端的通信；
// net.Socket  客户端TCP 连接 到服务器，并与服务器交换数据； socket的node实现，实现了全双工的stream的接口
var PORT = 3000;
var HOST = '127.0.0.1';

// tcp服务端
var server = net.createServer({ // 返回一个  net.Server
    allowHalfOpen: false, // 是否允许一个半开的TCP连接
    pauseOnConnect: false // 一旦来了连接，是否暂停套接字
}, function (socket) {
    console.log('服务端：收到来自客户端的请求');
    console.log(server.address());

    socket.on('data', function (data) {
        console.log('服务端：收到客户端数据，内容为{' + data + '}');

        // 给客户端返回数据
        socket.write('你好，我是服务端');
    });

    socket.on('close', function () { // 关闭服务器，停止接收新的客户端请求
        console.log('服务端：客户端连接断开');
    });
});
server.listen(PORT, HOST, function () {
    console.log('服务端：开始监听来自客户端的请求');
});
// 为 connections 启动一个 server 监听. ,  net.Server 是一个 EventEmitter,
// 一个 net.Server 可以是一个 TCP 或者 一个 IPC server，这取决于它监听什么


// tcp客户端
var client = net.createConnection(PORT, HOST);

client.on('connect', function () {
    console.log('客户端：已经与服务端建立连接');
});

client.on('data', function (data) {
    console.log('客户端：收到服务端数据，内容为{' + data + '}');
});

client.on('close', function (data) {
    console.log('客户端：连接断开');
});

client.end('你好，我是客户端');

// 服务端：开始监听来自客户端的请求
// 客户端：已经与服务端建立连接
// 服务端：收到来自客户端的请求
// 服务端：收到客户端数据，内容为{你好，我是客户端}
// 客户端：收到服务端数据，内容为{你好，我是服务端}
// 服务端：客户端连接断开
// 客户端：连接断开


// socket 相关API：

// 连接相关： 
// socket.connect()：有3种不同的参数，用于不同的场景；
// socket.setTimeout()：用来进行连接超时设置。
// socket.setKeepAlive()：用来设置长连接。
// socket.destroy(）、socket.destroyed：当错误发生时，用来销毁socket，确保这个socket上不会再有其他的IO操作。

// 数据读写相关：
// socket.write()、socket.end()、socket.pause()、socket.resume()、socket.setEncoding()、socket.setNoDelay()

// 数据属性相关：
// socket.bufferSize、socket.bytesRead、socket.bytesWritten

// 事件循环相关
// socket.ref()、socket.unref()

// 地址相关
// socket.address()
// socket.remoteAddress、socket.remoteFamily、socket.remotePort
// socket.localAddress/socket.localPort

// 事件:
// data：当收到另一侧传来的数据时触发。
// connect：当连接建立时触发。
// close：连接断开时触发。如果是因为传输错误导致的连接断开，则参数为error。
// end：当连接另一侧发送了 FIN 包的时候触发（读者可以回顾下HTTP如何断开连接的）。默认情况下（allowHalfOpen == false），socket会完成自我销毁操作。但你也可以把 allowHalfOpen 设置为 true，这样就可以继续往socket里写数据。当然，最后你需要手动调用 socket.end()
// error：当有错误发生时，就会触发，参数为error。（官方文档基本一句话带过，不过考虑到出错的可能太多，也可以理解）
// timeout：提示用户，socket 已经超时，需要手动关闭连接。
// drain：当写缓存空了的时候触发。（不是很好描述，具体可以看下stream的介绍）
// lookup：域名解析完成时触发


// server 相关API

// 连接相关：
// server.getConnections(callback)  server.listen()  server.close([callback])

// 数据属性相关：
// socket.listening、 server.maxConnections

// 事件循环相关
// server.ref()  server.unref()