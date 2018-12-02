const http = requestuire('http');

// HTTP 协议也是基于 TCP连接的;主要解决如何包装数据。是 '短链接'
// 为了支持各种可能的 HTTP 应用，Node.js 的 HTTP API 是非常底层的。 它只涉及 流处理 与 消息解析
// php 需要搭载 Apache / Nignx 环境   jsp 需要Tomcat 服务器
// nodeJS 集成了 http，因此减少了一个抽象层，给性能带来了提升！
// nodeJS 的http提供的是底层的接口，如果要用它直接开发网站，则必须手动实现所有东西，需要使用框架！！
// 而 Express 框架为 http 模块提供了更高层的接口。

// http.Agent 类
// 客户端：  Agent 负责着客户端链接的持续和复用；
// 服务器端：Agent 负责着特定服务器端的请求队列，当单一的socket链接请求队列为空时，socket被销毁，
//          或被放入连接池中，等待着相同的主机和端口的请求再次使用
// nodejs 提供的 http.Agent 帮我们维护服务器端的 tcp 连接，管理这些可复用大的链接。

// 创建一个使用代理的请求：
const AgentObj = new http.Agent({
    keepAlive: true // maxSockets  maxFreeSockets  timeout  keepAliveMsecs（数据包的初始延迟）
    // ...
});
AgentObj.createConnection() // 默认情况下，该函数类似于 net.createConnection()
AgentObj.destroy()
// ...

options.agent = AgentObj;
http.request(options, responseCallback);

// Agent 的全局实例，作为所有 HTTP 客户端请求的默认 Agent。



// http.ServerResponse 类: 由 http.Server 内部创建,它作为第二个参数被传入 'request' 事件;  可写流
// http.IncomingMessage 类 :IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，可读流
//                          它作为第一个参数分别递给 'request' 和 'response' 事件
// 即 作为 request  response 事件的 回调函数 的 参数 传入
// 其中回调函数的参数  request / response 是 http.IncomingMessage 的实例，response 是 http.ServerResponse 的实例。
const PORT = 8867;
const HOST = '10.15.32.51';

const server = http.createServer( /* option 指定默认要使用的类 */ function (request, response) {
    // 返回一个新建的 http.Server 实例， http.server类 继承自 net.Server
    // createServer方法其实本质上也是为 http.Server对象 添加了一个 request事件 监听
    // request 是 http.IncomingMessage 的实例
    // response 是 http.ServerResponse 的实例。

    // http.IncomingMessage 具有的属性 方法
    console.log(request.headers);
    console.log(request.method);
    request.on('close', function () {
        console.log('close');
    })
    // ...

    // http.ServerResponse 具有的属性和方法
    response.end('xxx');
    response.on('close', function () {
        console.log('close');
    })

    response.on('finish', function () {
        console.log('finish');
    })
    response.setHeader('TEST', ['test1', 'test2']);
    console.log(response.hasHeader('TEST'));
    console.log(response.getHeaderNames());
    console.log(response.getHeaders());
    console.log(response.getHeader('TEST'));
    console.log(response.headersSent);

    response.removeHeader('TEST');
    console.log('remove', response.hasHeader('TEST'));
    response.writeHead(222, 'write head statue message', {
        'TEST2': 'this is test header'
    });

    response.statusCode = 200;
    response.statusMessage = 'test status message';
    response.setTimeout(10000);

    fs.readFile('./package.json', function (err, data) {
        response.write(data, function () {
            console.log('data write success');
            response.end('xnxnxn');

            console.log(response.finished);
        })
    })
})

server.listen(PORT, HOST, function () {
    console.log('listen http ', PORT, HOST);
    console.log('server.listening', server.listening);
})

server.on('connect', function (request, socket, head) {
    console.log(request);
})

server.on('connection', function (socket) {
    console.log('http connect ');
})

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad request\r\n\r\n');
});

server.on('request', function (request, response) {
    console.log('on request', response);
})


server.setTimeout(12000);
console.log(server.timeout);

server.on('timeout', function () {
    console.log('timeout');
})


// http.request()     该函数允许显式地发出请求
const postData = querystring.stringify({
    'msg': 'Hello World!'
});

const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const request = http.request(options, (response) => { // 返回一个 http.ClientRequest 类的实例
    // response 是 http.IncomingMessage 的实例
    console.log(`状态码: ${response.statusCode}`);
    console.log(`响应头: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
        console.log(`响应主体: ${chunk}`);
    });
    response.on('end', () => {
        console.log('响应中已无数据。');
    });
});

request.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求主体
request.write(postData);
request.end();


// http.get()  是 Node.js 提供的 http.request() 的简便方法



// http链接 和 socket链接的不同
// HTTP 协议也是基于 TCP连接的;主要解决如何包装数据。是 '短链接'
// socket是对 TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口（API），通过Socket，我们才能使用TCP/IP协议
// 基于TCP协议的 Socket连接是 '长连接'， Socket连接一旦建立，除非一方主动断开，否则连接状态一直保持
// keepAlive '长链接' 会被放入 连接池 中，除非服务器 或客户端关闭。
//    'HTTP连接中'，只有客户端发起请求后服务端才会响应，服务端是无法主动向客户端发消息的。
// 而 'Socket连接中'，通信双方发送消息并没有先后的限制，通信双方中的任何一方可以随时向另一方发送消息

// 建立 Socket连接 至少需要一对套接字，其中一个运行于客户端，称为ClientSocket ，另一个运行于服务器端，称为ServerSocket 。
// 套接字之间的连接过程分为三个步骤：服务器监听，客户端请求，连接确认。

// 用HTTP的情况：双方不需要时刻保持连接在线，比如客户端资源的获取、文件上传等。
// 用Socket的情况：大部分即时通讯应用(QQ、微信)、聊天室、苹果 APNs 等

// 三次握手完毕后，客户端与服务器才正式开始传送数据。
// http客户端与 http服务端 的通信均依赖于socket (net.socket)