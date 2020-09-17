const dgram = require('dgram');
// UDP 传输层协议
// dgram 模块提供了 UDP 数据包 socket 的实现。即通过 socket 实现了 UDP 数据包的发送
// UDP 协议的主要作用是将 网络数据流量 压缩成 数据包 的形式

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`服务器异常：\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器接收到来自 ${rinfo.address}:${rinfo.port} 的 ${msg}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});

server.bind(41234);
// 服务器监听 0.0.0.0:41234

// 事件 方法
server.on('message', (msg, rinfo) => {
    console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

socket.bind({
    address: 'localhost',
    port: 8000,
    exclusive: true
});