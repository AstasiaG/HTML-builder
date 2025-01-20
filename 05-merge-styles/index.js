const path = require("path");
const fs = require("node:fs");

const stylesPath = path.join(__dirname, "styles");
const writeStream = fs.createWriteStream(path.join(__dirname, "project-dist", "bundle.css"));

fs.readdir(stylesPath, (err, files) => {
  files.forEach(file => {
    if (path.extname(file) === '.css') {
      fs.readFile(path.join(stylesPath, file), "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        writeStream.write(data);
      })
    }
  });
})