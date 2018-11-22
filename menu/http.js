const http = require('http');
// nodeJS 把一个 消息 解析成 消息头和消息主体，但 不解析 具体的 消息头或消息主体
// WebSockets 是一个可以创建和服务器间进行双向会话的高级技术。
// 通过这个API你可以向服务器 发送消息 并 接受基于事件驱动的响应，这样就不用向服务器轮询获取数据了

http.createServer(function (request, response) { // 创建了 http.server的实例
    // createServer方法其实本质上也是为 http.Server对象 添加了一个request事件监听
    // 其中 req 是 http.IncomingMessage 的实例，res 是 http.ServerResponse 的实例。
    // request 请求对象    response 响应对象
    request.data / end / close
    response.writeHead(200, {
        "Content-Type": "text/plain" // 响应头
    });
    response.write("hello"); // 响应体
    response.end();
}).listen(8000) // 调用 listen 函数启动服务器并监听 8000端口


// php 需要搭载 Apache / Nignx 环境   jsp 需要Tomcat 服务器
// nodeJS 集成了 http，因此减少了一个抽象层，给性能带来了提升！
// nodeJS 的http提供的是底层的接口，如果要用它直接开发网站，则必须手动实现所有东西，需要使用框架！！
// 而 Express 框架为 http 模块提供了更高层的接口。

// nodejs 提供的 http.Agent 帮我们维护服务器端的 tcp 连接，管理这些可复用大的链接。

// HTTP协议也是基于TCP连接的;主要解决如何包装数据。
// socket是对TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口（API），通过Socket，我们才能使用TCP/IP协议
// 基于TCP协议的Socket连接是长连接， Socket连接一旦建立，除非一方主动断开，否则连接状态一直保持
// HTTP连接中，只有客户端发起请求后服务端才会响应，服务端是无法主动向客户端发消息的。
// 而Socket连接中，通信双方发送消息并没有先后的限制，通信双方中的任何一方可以随时向另一方发送消息

// 建立 Socket连接 至少需要一对套接字，其中一个运行于客户端，称为ClientSocket ，另一个运行于服务器端，称为ServerSocket 。
// 套接字之间的连接过程分为三个步骤：服务器监听，客户端请求，连接确认。

// 三次握手完毕后，客户端与服务器才正式开始传送数据。
// http.server 继承了 net.server
// http客户端与 http服务端的通信均依赖于socket (net.socket)

// http.Agent 类: Agent 负责为 HTTP 客户端管理连接的持续与复用 

// response 是 <http.ServerResponse> 的实例
// request 是 <http.IncomingMessage> 的实例; 

// http.Server 类: 该类继承自 net.Server 

// http.ServerResponse 类: 它作为第二个参数被传入 'request' 事件
// http.IncomingMessage 类 :IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，
//                          它作为第一个参数分别递给 'request' 和 'response' 事件

// http.ClientRequest 类: 该对象在 http.request() 内部被创建并返回
// http.request(): 返回一个 http.ClientRequest 类的实例, =>(它所有的属性和方法都在 http.ClientRequest 里找)
const querystring = require("querystring")
const http = require("http")
const postData = querystring.stringify({
    'msg': 'Hello World!'
});

const options = {
    hostname: 'www.baidu.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};
// const options = new URL('http://abc:xyz@example.com'); 或者是一个 url

const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {        // res 是一个 emitter 实例, 所有能触发事件的对象都是 EventEmitter 类的实例
        console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据。');
    });
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求主体
req.write(postData);
req.end();

// http.get():该方法与 http.request() 唯一的区别是它设置请求方法为 GET 且自动调用 req.end()

// http.createServer() =>(它所有的属性和方法都在 http.Server 里找)  返回一个新的 http.Server实例

// http.METHODS  http.STATUS_CODES