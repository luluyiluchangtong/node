const http = require('http');
// nodeJS 把一个 消息 解析成 消息头和消息主体，但 不解析 具体的 消息头或消息主体
// WebSockets 是一个可以创建和服务器间进行双向会话的高级技术。
// 通过这个API你可以向服务器 发送消息 并 接受基于事件驱动的响应，这样就不用向服务器轮询获取数据了
http.createServer(function (request, response) { // 创建了 http.server的实例
    // request 请求对象    response 响应对象
    response.writeHead(200, {
        "Content-Type": "text/plain" // 响应头
    });
    response.write("hello"); // 响应体
    response.end();
}).listen(8000) // 调用 listen 函数启动服务器并监听 8000端口
// php 需要搭载 Apache / Nignx 环境   jsp 需要Tomcat 服务器
// nodeJS 集成了 http，因此减少了一个抽象层，给性能带来了提升！
// nodeJS 的http提供的是底层的接口，如果要用它直接开发网站，则必须手动实现所有东西
// 而 Express 框架为 http 模块提供了更高层的接口。