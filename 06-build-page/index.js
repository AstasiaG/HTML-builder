const path = require("path");
const fs = require("node:fs");
const fsPromises = fs.promises;

const projectPath = path.join(__dirname, "project-dist");
const stylesPath = path.join(__dirname, "styles");
const componentsPath = path.join(__dirname, "components");
const assetsPath = path.join(__dirname, "assets");

// initialization
(async () => {
  await fsPromises.rm(projectPath, { recursive: true }).catch((err) => {return});

  fs.mkdir(projectPath, {recursive: true}, (err) => {
    if (err) { console.log(err) }

    fs.mkdir(path.join(projectPath, "assets"), {recursive: true}, (err) => {
      if (err) { console.log(err) }
    });
  
    copyAssets(assetsPath, path.join(projectPath, "assets"));
    stylesBundle();
    createHtml();
  });
})();

function copyAssets(filePath, dirPath) {
  fs.readdir(filePath, (err, files) => {
    if (err) { console.log(err) }
    
    files.forEach(file => {
      if (path.extname(file) === '') {
        fs.mkdir(path.join(dirPath, file), {recursive: true}, (err) => {
          if (err) { console.log(err) }
        });

        copyAssets(path.join(filePath, file), path.join(dirPath, file));
        return;
      }
      fs.copyFile(path.join(filePath, file), path.join(dirPath, file), (err) => {
        if (err) { console.log(err) }
      })
    });
  })
}

function stylesBundle() {
  const writeStream = fs.createWriteStream(path.join(projectPath, "style.css"));

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
}

function createHtml() {
  const readStream = fs.createReadStream(path.join(__dirname, "template.html"), {
    encoding: 'UTF-8',
  });
  
  readStream.on("data", (chunk) => {
    updateHtml(chunk);
  });
}

async function updateHtml(data) {
  const writeStream = fs.createWriteStream(path.join(projectPath, "index.html"));
  let template = data;
  const files = await fsPromises.readdir(path.join(__dirname, "components"));

  for(const file of files) {
    const fileData = await fsPromises.readFile(path.join(componentsPath, file), "utf-8");

    const regex = new RegExp('{{' + path.basename(file, '.html') + '}}', 'g');
    template = template.replaceAll(regex, fileData);
  }

  writeStream.write(template);
}