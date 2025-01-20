const path = require("path");
const fs = require("node:fs");
const readline = require('node:readline');
const { stdout, stdin } = process;

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, "utf-8");
const rl = readline.createInterface({ input: stdin, output: stdout });
rl.setPrompt("Hello, write something!\n");
rl.prompt();
rl.on("line", (data) => {
  if (data === 'exit') {
    process.exit();
  }

  writeStream.write(`${data}\n`);
})

process.on('SIGINT', () => { process.exit(); });

process.on("exit", (code) => {
  if (code === 0) {
    stdout.write("Information successfully write");
  } else {
    stdout.write(`Oops! Something wrong, code: ${code}`);
  }
  writeStream.close();
  rl.close();
});
