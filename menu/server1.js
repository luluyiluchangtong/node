const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {
    if (req.url === "www.baidu.com") {
        const html = fs.readFileSync("./test.html", "utf8")
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.end(html)
    }

}).listen(8888)
console.log(http.STATUS_CODES)
console.log('start')

// var http = require("http");
// var server = new http.Server();
// server.on("request", function (req, res) {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.write("hello nodejs"); res.end();
// });
// server.listen(3000);

