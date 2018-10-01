const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {
    console.log(req.url)
    console.log(req.headers)
    if (req.url === "/") {
        const html = fs.readFileSync("./test.html", "utf8")
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Set-Cookie": ["id=123; max-age=2", "abc=456; HttpOnly"]
        })
        res.end(html)
    }

}).listen(8888)

console.log('start')