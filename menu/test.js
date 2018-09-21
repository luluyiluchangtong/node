const { sep, delimiter, win32, posix } = require('path');
const filePath = '/usr/local/bin/exe.js'

console.log("sep", sep)
console.log("PATH", process.env.PATH)
console.log("delimiter", delimiter)
console.log("win32 delimiter", win32.delimiter)
console.log("win32 sep", win32.sep)