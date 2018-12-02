const dgram = require('dgram');
// UDP 传输层协议
// dgram模块提供了 UDP 数据包 socket 的实现。
// UDP协议的主要作用是将 网络数据流量 压缩成 数据包 的形式

const server = dgram.createSocket('udp4'); // 返回 dgram.Socket实例

// 事件 方法
server.on('message', (msg, rinfo) => {
    console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

socket.bind({
    address: 'localhost',
    port: 8000,
    exclusive: true
});