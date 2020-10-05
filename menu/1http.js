// http.Agent
// http.ClientRequest
// http.Server
// http.ServerResponse
// http.IncomingMessage

// HTTP 协议也是基于 TCP连接的;主要解决如何包装数据。是 '短链接'
// 为了支持各种可能的 HTTP 应用，Node.js 的 HTTP API 是非常底层的。 它只涉及 流处理 与 消息解析
// php 需要搭载 Apache / Nignx 环境   jsp 需要Tomcat 服务器
// nodeJS 集成了 http，因此减少了一个抽象层，给性能带来了提升！
// nodeJS 的http提供的是底层的接口，如果要用它直接开发网站，则必须手动实现所有东西，需要使用框架！！
// 而 Express 框架为 http 模块提供了更高层的接口。


// ----套接字（socket）：即 IP地址 + 端口号, TCP 通信链接的两个端点 都称为 socket 
// TCP连接 ：：= {socket ，socket} = {IP1：port1} {IP2：port2}

// http链接 和 socket链接的不同:
// 1. 建立 Socket连接 至少需要一对套接字，其中一个运行于客户端，称为ClientSocket ，另一个运行于服务器端，称为ServerSocket 。
// 2. socket是对 'TCP/IP 协议' 的封装，Socket本身并不是协议，而是一个 '调用接口'（API），通过 Socket，我们才能使用 TCP/IP协议
// 3. HTTP 协议也是基于 TCP连接的; 主要解决如何包装数据。是 '短链接'。 基于TCP协议的 Socket连接是 '长连接'，
//    Socket连接一旦建立，除非一方主动断开，否则连接状态一直保持。keepAlive '长链接' 会被放入 连接池 中，除非服务器 或客户端关闭。
// 4. 'HTTP   连接中'，只有客户端发起请求后服务端才会响应，服务端是无法主动向客户端发消息的。
//    'Socket 连接中'，通信双方发送消息并没有先后的限制，通信双方中的任何一方可以随时向另一方发送消息


// 套接字之间 的连接过程分为三个步骤：服务器监听，客户端请求，连接确认。

// 用HTTP的情况：双方不需要时刻保持连接在线，比如客户端资源的获取、文件上传等。
// 用Socket的情况：大部分即时通讯应用(QQ、微信)、聊天室、苹果 APNs 等

// 三次握手完毕后，客户端与服务器才正式开始传送数据。
// http客户端与 http服务端 的通信均依赖于socket (net.socket)

// ----端口：  硬件端口（USB端口），网络协议端口
// 端口号：合法的端口号在 0-65535之间的一个数字。  1024 以下的是分配给系统的端口号（公认端口号）， 每个主机的端口总共有65535个，这个是固定的
// 当一台电脑启动了一个可以让远程其他电脑访问的 程序，那么它就要开启至少一个端口号来让外界访问，即端口号是用来识别哪个程序的。

// ----MAC地址：称为物理地址，也叫硬件地址，用来定义 网络设备 的位置，MAC地址是 网卡 出厂时设定的，是固定的，它被写在卡上的一块ROM中
// 在网络上的每一个计算机都必须拥有一个独一无二的MAC地址

// ----IP 地址： 常见的IP地址，分为 IPv4 与 IPv6 两大类，当前广泛应用的是IPv4，目前IPv4几乎耗尽，
// 下一阶段必然会进行版本升级到 IPv6；如无特别注明，一般我们讲的的IP地址所指的是 IPv4。 IP 地址是识别主机的。

// ----网卡：
// IPV4 / IPV6
// DHCP： 动态主机配置协议，是一个局域网的网络协议， 是一个不需要账号密码登录的、自动给内网机器分配IP地址等信息的协议

// ----域名查询：如果客户端准备访问百度网站，客户端首先会检查 本地缓存中 是否有之前的查询记录，如果有，直接读取结果即可，如果没有相关的缓存记录，则向本地 DNS服务器发送查询请求，
// 本地DNS服务器如果有答案，就会将答案直接返回给客户端，（如果通过路由器，则看到的 DNS 地址为路由器），当本地DNS服务器没有正确的答案时，它就需要向 根服务器（根域名服务器都在国外） 查询

// ----DNS 服务器： C:\Windows\System32\drivers\etc  hosts 文件是域名解析文件，可以 配置域名和 IP 的映射关系， 加快域名解析。 
// 本地 DNS：一般是指你电脑上网时 IPv4 或者 IPv6 设置中填写的那个 DNS。这个有可能是 手工指定的 或者是 DHCP 自动分配的


// 1. http.Agent 类
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

// 2. http.ClientRequest 类  
const req=http.request(options,(res)=>{})   // http.request()  返回http.ClientRequest 类 表示正在进行中的请求（请求头已进入队列
const req=http.get(options,(res)=>{})  // 这个方法与 http.request() 唯一的区别是，它将请求方法设置为 GET 并且会自动调用 req.end()
// http.get()  是 Node.js 提供的 http.request() 的简便方法

// req 事件， 方法, 属性
req.on("connect",callbackFunc)  // 相关事件 continue  information  response ....
req.setHeader('content-type', 'text/html')  // 相关方法 setHeader()  getHeader() ...
req.host   // 相关属性 host  protocol  method ...

// 3. http.Server 类
const server=http.creatServer((req,res)=>{})  // http.creatServer()  返回 http.Server 类

// server 事件， 方法, 属性
server.on("checkContinue", callbackFunc)   // 相关事件  checkContinue  close  connect ....
server.listen()    // 相关方法  close()  setTimeout()
server.listening   // 相关属性  listening  timeout

// 4. http.ServerResponse 类: 由 http.Server 内部创建,它作为第二个参数被传入 'request' 事件;  可写流
// 5. http.IncomingMessage 类 :IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，可读流
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
})

// respose.on('close', callbackFunc)
// response.writeHead()  response.end()
// response.socket

// request.on('close', callbackFunc)
// message.setTimeout()
// message.headers

// http.METHODS
// http.STATUS_CODES
// http.globalAgent
// http.maxHeaderSize