const dns = require('dns');
// DNS（domain name system） --- 计算机域名系统（由 域名解析器 和 域名服务器组成）
// dns 模块 用于 '启用名称解析'。 例如，使用它来查找主机名的 IP 地址。

// 两类函数： 
// 1.使用底层操作系统工具进行域名解析 
dns.lookup('google.com', (err, address, family) => {
    console.log('IP 地址: %j 地址族: IPv%s', address, family);
});

// 2.联网进行域名解析
dns.resolve4('google.com', (err, addresses) => {
    if (err) throw err;

    console.log(`IP 地址: ${JSON.stringify(addresses)}`);
    // IP 地址: ["216.58.220.206"]

    addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
            if (err) {
                throw err;
            }
            console.log(a)
            // 216.58.220.206
            console.log(hostnames)
            // [ 'del01s08-in-f206.1e100.net', 'hkg12s16-in-f14.1e100.net' ]
            console.log(`IP 地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`);
            // IP 地址 216.58.220.206 逆向解析到域名: ["del01s08-in-f206.1e100.net","hkg12s16-in-f14.1e100.net"]
        });
    });
});