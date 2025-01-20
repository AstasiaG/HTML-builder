const path = require("path");
const fs = require("node:fs");

const filePath = path.join(__dirname, "secret-folder");

fs.readdir(filePath,{withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {

      if (file.isFile()) {
        const fileExtname = path.extname(file.name);
        const fileName = file.name.slice(0, -fileExtname.length);
        fs.stat(path.join(filePath,file.name), (err, stats) => {
          if (err) {
            console.log(err);
            return;
          } 

          const size = (stats.size / 1024).toFixed(2);

          console.log(`${ fileName } - ${ fileExtname.slice(1) } - ${ size }kb`);
        })
      }
    })
  }
})