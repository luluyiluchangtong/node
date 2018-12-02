const http = require("http"); // 引入模块


http.createServer(function (request, response) {
    console.log(request.headers);
    console.log(request.url);
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("hel lo world");
    response.end()
}).listen(8000); // 服务器监听的 端口号，接收异步请求



// 笔记：
// 应用程序并不直接和HTTP协议打交道，而是操作http模块提供的request和response对象
// request  接收请求 response 响应请求，返回数据
// request对象封装了HTTP请求; response对象封装了HTTP响应
// 解析 url 需要 node提供的 url模块   url.parse()
// 处理本地文件目录 需要node提供的 path模块

// nodeJS 的模块机制， 采用 commonJS模块规范
// commonJS 是为了  在浏览器之外构建 javscript ，
// 模块的引入参数形式：node_modules / 相对路径 / 绝对路径
// 全局安装  supervisor 监视代码改变并自动重启 node, 解决开发中的调试问题