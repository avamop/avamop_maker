const fs = require('fs');
const path = require('path');

function readDirectoryRecursively(dir) {
  const files = fs.readdirSync(dir);
  const result = {};

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      result[file] = readDirectoryRecursively(filePath);
    } else {
      const fileNameWithoutExtension = path.parse(file).name;
      result[fileNameWithoutExtension] = path.relative(process.cwd(), filePath);
    }
  });

  return result;
}

const directoryPath = process.cwd(); // カレントワーキングディレクトリを取得
const jsonFilePath = './output.json'; // ここに出力するJSONファイルのパスを入力してください

const fileStructure = readDirectoryRecursively(directoryPath);
const jsonContent = JSON.stringify(fileStructure, null, 2);

fs.writeFileSync(jsonFilePath, jsonContent);
console.log('JSONファイルが出力されました。');
