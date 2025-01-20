const path = require("path");
const fs = require("node:fs");

const testPath = path.join(__dirname, "text.txt");
const readStream = fs.createReadStream(testPath);

readStream.on("data", (chunk) => {
  console.log(chunk.toString());
});

readStream.on("end", () => {
  readStream.close();
});
