const http = require('http');
const fs = require('fs')
http.createServer(function (req, res) {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Test-Cors", // 自定义请求头
        "Access-Control-Allow-Methods": "PUT", // 
        "Access-Control-Max-Age": 1000 //  加上这个就不需要 预请求 了
    })
    // 允许 不同域 过来访问内容
    // res.write('hello')
    res.end("sdsadasf")
}).listen(8887)

console.log('start')