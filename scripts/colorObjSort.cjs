const fs = require("fs");

// 引数から入力ファイル名と出力ファイル名を取得
const [inputFile, outputFile] = process.argv.slice(2);

// ファイルを読み込む
const data = fs.readFileSync(inputFile, "utf8");

// JSONに変換
const colors = JSON.parse(data);

// オブジェクトのエントリを配列に変換
let entries = Object.entries(colors);

// エントリをソート
entries.sort((a, b) => {
  // groupで比較
  if (a[1].group < b[1].group) return -1;
  if (a[1].group > b[1].group) return 1;

  // groupが同じ場合はhexで比較
  if (a[1].hex < b[1].hex) return -1;
  if (a[1].hex > b[1].hex) return 1;

  return 0;
});

// ソートされたエントリから新しいオブジェクトを作成
let sortedColors = Object.fromEntries(entries);

// JSONに変換
const sortedData = JSON.stringify(sortedColors, null, 2);

// ファイルに書き出す
fs.writeFileSync(outputFile, sortedData);
