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
const PartsObject = {};

// JSONオブジェクトを生成する関数
function generatePartsObject(directoryPath, partChain) {
  const categories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let partOrder = 0;

  for (const category of categories) {
    partOrder++;
    const categoryPath = path.join(directoryPath, category);
    const categoryPartChain = partChain ? `${partChain}/${category}` : category;

    PartsObject[category] = {
      colorGroup: "none",
      partCount: 1,
      partChain: categoryPartChain,
      partOrder,
      ignoreTrigger: null,
      partFlip: false,
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
      PartsObject[category].items[item] = {
        bodyType: [0],
        color: true,
        faces: {},
      };

      for (const face of faces) {
        const faceName = path.basename(face, path.extname(face));
        const imagePath = path.join(categoryPartChain, item, face);

        if (!PartsObject[category].items[item].faces) {
          PartsObject[category].items[item].faces = {};
        }

        PartsObject[category].items[item].faces[faceName] = {
          imagePath: imagePath,
        };
      }
    }
  }
}

// 指定されたディレクトリからJSONオブジェクトを生成
generatePartsObject(inputDirectory, null);

// 生成したJSONオブジェクトをファイルに保存
const jsonOutput = JSON.stringify(PartsObject, null, 2);

fs.writeFileSync(outputFilePath, jsonOutput);

console.log(`File tree JSON data has been written to ${outputFilePath}`);
