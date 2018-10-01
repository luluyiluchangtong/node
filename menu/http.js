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

// http.Agent 类   

// http.Server 类  
// http.ServerResponse 类   
// http.IncomingMessage 类

// http.ClientRequest 类  
