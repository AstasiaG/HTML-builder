const path = require("path");
const fs = require("node:fs");
const fsPromises = fs.promises;

const copyPath = path.join(__dirname, "files-copy");

fs.access(copyPath, fs.constants.F_OK, (err) => {
  if (err) {
    createFolder();
  } else {
    fsPromises.rm(copyPath,{ recursive: true})
      .then(function () {
        createFolder();
        copeFiles();
      })
      .catch(function(err) { console.log(err) })
  }
})

function createFolder() {
  fs.mkdir(copyPath, (err) => {
    if (err) { console.log(err) }
  });
}

function copeFiles() {
  fs.readdir(path.join(__dirname, "files"), (err, files) => {
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, "files", file), path.join(copyPath, file), (err) => {
        if (err) { console.log(err) }
      })
    });
  })
}