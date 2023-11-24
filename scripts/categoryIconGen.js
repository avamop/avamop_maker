const fs = require('fs');
const path = require('path');

// ファイルツリーを作成する再帰関数
function createTree(directoryPath, newName) {
  const tree = {};

  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const name = newName || item; // プロパティ名を変更する
      tree[name] = createTree(itemPath, newName);
    } else {
      const relativePath = path.relative(rootDirectory, itemPath);
      tree[newName || item] = relativePath;
    }
  }

  return tree;
}

// コマンドライン引数からディレクトリパスとアウトプットファイルパスを取得
if (process.argv.length < 4) {
  console.error('Usage: node script.js directoryPath outputFilePath');
  process.exit(1);
}

const directoryPath = process.argv[2];
const outputFilePath = process.argv[3];

if (!fs.existsSync(directoryPath) || !fs.statSync(directoryPath).isDirectory()) {
  console.error('Invalid directory path');
  process.exit(1);
}

// 現在の作業ディレクトリを取得
const rootDirectory = process.cwd();
const fileTree = createTree(directoryPath);

// JSONに変換
const jsonTree = JSON.stringify(fileTree, null, 2);

// JSONを指定されたアウトプットファイルに書き出す
fs.writeFileSync(outputFilePath, jsonTree);

console.log(`File tree JSON data has been written to ${outputFilePath}`);
