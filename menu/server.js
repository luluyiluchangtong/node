const fs = require('fs');

const watch=fs.watch('./abc.js', (eventType, filename) => {
    console.log(`事件类型是: ${eventType}`);
    if (filename) {
      console.log(`提供的文件名: ${filename}`);
    } else {
      console.log('文件名未提供');
    }
  });

setTimeout(()=>{
    watch.close()
},2000)