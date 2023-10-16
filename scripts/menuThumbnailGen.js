const fs = require('fs');
const path = require('path');

// ファイルツリーを作成する再帰関数
function createTree(directoryPath) {
  const tree = {};

  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const newName = 'pathUrl'; // プロパティ名を変更する
    if (fs.statSync(itemPath).isDirectory()) {
      tree[item] = createTree(itemPath, newName);
    } else {
      const relativePath = path.relative(rootDirectory, itemPath);
      tree[newName] = relativePath;
    }
  }

  return tree;
}

// 現在の作業ディレクトリを取得
const rootDirectory = process.cwd();
const fileTree = createTree(rootDirectory);

// JSONに変換
const jsonTree = JSON.stringify(fileTree, null, 2);

// JSONをファイルに書き出す
const outputFilePath = path.join(rootDirectory, 'menuThumbnail.json');
fs.writeFileSync(outputFilePath, jsonTree);

console.log(`File tree JSON data has been written to ${outputFilePath}`);
