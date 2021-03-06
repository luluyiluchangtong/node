// 命令行界面 (CLI) = 使用文本命令进行交互的用户界面

// 终端 (Terminal) = TTY = 文本输入/输出环境  早期的终端是电传打印机 tty ，到后来支持 GUI图形界面的伪终端。 tty 是终端的统称

// 控制台 (Console) = 一种特殊的终端
// 文件主机的重要日志，比如开机关机的日志和记录，重要应用程序的日志，都会输出到控制台来

// Shell = 命令行解释器，执行用户输入的命令并返回结果
// 而 Shell 干的活儿是从 终端 那里拿到用户输入的命令，解析后交给 操作系统内核 去执行，并把执行结果返回给 终端。

// 一台主机有且只能有一个控制台， 可以有很多个终端

// tty.ReadStream 类
// tty.WriteStream 类