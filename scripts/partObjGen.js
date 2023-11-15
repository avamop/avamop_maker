const fs = require("fs");
const path = require("path");

if (process.argv.length < 4) {
  console.error("Usage: node script.js inputDirectory outputFilePath");
  process.exit(1);
}

const inputDirectory = process.argv[2];
const outputFilePath = process.argv[3];

// カレントディレクトリをルートパスとする
const rootDirectoryPath = process.cwd();

// 型定義
const partObject = {};

// JSONオブジェクトを生成する関数
function generatePartObject(directoryPath, partChain) {
  const categories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let partOrder = 0;

  for (const category of categories) {
    partOrder++;
    const categoryPath = path.join(directoryPath, category);
    const categoryPartChain = partChain ? `${partChain}/${category}` : category;

    partObject[category] = {
      colorGroup: "none",
      partCount: 1,
      partChain: categoryPartChain,
      partOrder,
      items: {},
    };

    const items = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const item of items) {
      const itemPath = path.join(categoryPath, item);
      const faces = fs
        .readdirSync(itemPath, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".png"))
        .map((dirent) => dirent.name);
      partObject[category].items[item] = {
        bodyType: [0],
        color: true,
        faces: {},
      };

      for (const face of faces) {
        const faceName = path.basename(face, path.extname(face));
        const facePath = path.join(categoryPartChain, item, face);

        if (!partObject[category].items[item].faces) {
          partObject[category].items[item].faces = {};
        }

        partObject[category].items[item].faces[faceName] = {
          facePath: facePath,
        };
      }
    }
  }
}

// 指定されたディレクトリからJSONオブジェクトを生成
generatePartObject(inputDirectory, null);

// 生成したJSONオブジェクトをファイルに保存
const jsonOutput = JSON.stringify(partObject, null, 2);

fs.writeFileSync(outputFilePath, jsonOutput);

console.log(`File tree JSON data has been written to ${outputFilePath}`);
