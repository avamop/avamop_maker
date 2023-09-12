const fs = require('fs');
const path = require('path');

// ディレクトリのパスを指定
const rootDirectoryPath = process.cwd();

const objectStructure = {};

// ルートディレクトリ内のサブディレクトリを取得
const subdirectories = fs.readdirSync(rootDirectoryPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// partOrderの初期値
let partOrder = 0;

// 各サブディレクトリを処理
for (const category of subdirectories) {
  const categoryPath = path.join(rootDirectoryPath, category);
  const items = fs.readdirSync(categoryPath);

  objectStructure[category] = {
    partCount: 1,
    partChain: category,
    partOrder,
    items: {},
  };

  // 各ファイルを処理
  // 各ファイルを処理
  for (const item of items) {
    const itemName = path.basename(item, path.extname(item)); // 拡張子を削除
    const relativePath = path.relative(rootDirectoryPath, path.join(categoryPath, item));
    objectStructure[category].items[itemName] = {
      partName: relativePath,
    };
  }
  partOrder++;
}

// JSONオブジェクトを出力
const jsonOutput = JSON.stringify(objectStructure, null, 2);
console.log(jsonOutput);

// ファイルに保存する場合
fs.writeFileSync('output.json', jsonOutput);
